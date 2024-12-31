<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    /**
     * Tạo mục yêu thích.
     */
    public function createFavorite(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'restaurant_id' => 'required|exists:restaurants,id',
        ]);

        // Tạo mục yêu thích
        $favorite = Favorite::create([
            'user_id' => $validatedData['user_id'],
            'restaurant_id' => $validatedData['restaurant_id'],
        ]);

        return response()->json([
            'message' => 'お気に入りが正常に作成されました。',
            'favorite' => $favorite,
        ], 200);
    }

    public function deleteFavorite(Request $request)
    {
        //ĐĐầu vào
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'restaurant_id' => 'required|exists:restaurants,id',
        ]);

        // Tìm mục muốn xóa theo user_id và restaurant_id
        $favorite = Favorite::where('user_id', $validatedData['user_id'])
            ->where('restaurant_id', $validatedData['restaurant_id'])
            ->first();

        // Kiểm tra xem mục yêu thích có tồn tại không
        if (!$favorite) {
            return response()->json([
                'message' => 'お気に入りが見つかりませんでした。'
            ], 404);
        }

        // Xóa mục yêu thích
        $favorite->delete();

        // Trả về phản hồi thành công
        return response()->json([
            'message' => 'お気に入りが正常に削除されました！',
        ], 200);
    }
    public function getFavorites(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|integer|exists:users,id'
            ]);

            // Lọc giá
            $start = $request->query('start') ?? null;
            $end = $request->query('end') ?? null;

            // Sắp xếp theo giá
            $sort_price = $request->query('sort_price') ?? null;

            $perPage = $request->query('per_page') ?? 10;
            $now = now();

            $favorites = Favorite::with(['restaurant.reviews'])
                ->where('user_id', $request->user_id);

            // $favorites = Favorite::all()->get();

            // Logic lọc giá
            if ($start && $end) {
                $favorites = $favorites->whereHas('restaurant', function ($query) use ($start, $end) {
                    $query->where(function ($query) use ($start, $end) {
                        $query->where('price_start', '<=', $end)
                            ->where('price_end', '>=', $start);
                    });
                });
            } elseif ($start) {
                $favorites = $favorites->whereHas('restaurant', function ($query) use ($start) {
                    $query->where('price_end', '>=', $start);
                });
            } elseif ($end) {
                $favorites = $favorites->whereHas('restaurant', function ($query) use ($end) {
                    $query->where('price_start', '<=', $end);
                });
            }

            // Logic sắp xếp giá
            if ($sort_price === "asc") {
                $favorites = $favorites->join('restaurants', 'favorites.restaurant_id', '=', 'restaurants.id')
                    ->orderByRaw('(restaurants.price_start + restaurants.price_end) / 2 ASC')
                    ->select('favorites.*');
            } elseif ($sort_price === "desc") {
                $favorites = $favorites->join('restaurants', 'favorites.restaurant_id', '=', 'restaurants.id')
                    ->orderByRaw('(restaurants.price_start + restaurants.price_end) / 2 DESC')
                    ->select('favorites.*');
            }

            // Phân trang
            $favorites = $favorites->paginate($perPage);

            $formattedData = [];
            foreach ($favorites->items() as $favorite) {
                $priceAvg = ($favorite->restaurant->price_start + $favorite->restaurant->price_end) / 2;
                $formattedData[] = [
                    'id' => $favorite->restaurant->id,
                    'fav_id' => $favorite->id,
                    'name' => $favorite->restaurant->name,
                    'address' => $favorite->restaurant->address,
                    'description' => $favorite->restaurant->description,
                    'price_range' => [
                        'start' => $favorite->restaurant->price_start,
                        'end' => $favorite->restaurant->price_end
                    ],
                    'price_avg' => $priceAvg,
                    'operation_hours' => [
                        'open' => $favorite->restaurant->open_time,
                        'close' => $favorite->restaurant->close_time
                    ],
                    'media' => json_decode($favorite->restaurant->media, true),
                    'avatar' => $favorite->restaurant->avatar,
                    'location' => [
                        'latitude' => $favorite->restaurant->latitude,
                        'longitude' => $favorite->restaurant->longitude
                    ],
                    'rating' => round($favorite->restaurant->reviews->avg('rating'), 2),
                    'num_of_review' => $favorite->restaurant->reviews->count(),
                    'num_of_days_favorited' => abs(round($now->diffInDays($favorite->created_at))),
                    'days_favorited' => $favorite->created_at,
                    'now' => $now,
                    'time_ago' => (function () use ($favorite, $now) {
                        $minutes = round(abs($now->diffInMinutes($favorite->created_at)));
                        $hours = round(abs($now->diffInHours($favorite->created_at)));
                        $days = round(abs($now->diffInDays($favorite->created_at)));
                        $months = round(abs($now->diffInMonths($favorite->created_at)));

                        if ($minutes < 1) {
                            return '1 分前に保存';
                        } elseif ($minutes < 60) {
                            return $minutes . ' 分前に保存';
                        } elseif ($hours < 24) {
                            return $hours . ' 時間前に保存';
                        } elseif ($days < 30) {
                            return $days . ' 日前に保存';
                        } elseif ($months < 12) {
                            return $months . ' 月前に保存';
                        } else {
                            return $favorite->created_at;
                        }
                    })()
                ];
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'current_page' => $favorites->currentPage(),
                    'data' => $formattedData,
                    'first_page_url' => $favorites->url(1),
                    'from' => $favorites->firstItem(),
                    'last_page' => $favorites->lastPage(),
                    'last_page_url' => $favorites->url($favorites->lastPage()),
                    'next_page_url' => $favorites->nextPageUrl(),
                    'path' => $favorites->path(),
                    'per_page' => $perPage,
                    'prev_page_url' => $favorites->previousPageUrl(),
                    'to' => $favorites->lastItem(),
                    'total' => $favorites->total()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'お気に入りの取得中にエラーが発生しました。',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getFavoritesInHome(Request $request) {
        $userId = $request->query('user_id') ?? null;
        if (!$userId) {
            return response()->json([
                'restaurants' => [],
                'message' => 'ユーザーIDが指定されていません。',
            ], 400);
        }
    
        $favorites = Favorite::where('user_id', $userId)
            ->with('restaurant') 
            ->limit(5)
            ->get();
    
        $restaurants = $favorites->map(function ($fav) {
            return $fav->restaurant; 
        });
    
        return response()->json([
            'restaurants' => [
                'data' => RestaurantResource::collection($restaurants->map(function ($restaurant) use ($userId) {
                    return new RestaurantResource($restaurant, $userId);
                }))
            ],
            'message' => 'お気に入りのリストを取得しました。',
        ], 200);
    }
    
}
