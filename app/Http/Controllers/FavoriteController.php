<?php

namespace App\Http\Controllers;

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
            'message' => 'Favorite created successfully',
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
                'message' => 'Favorite not found'
            ], 404);
        }

        // Xóa mục yêu thích
        $favorite->delete();

        // Trả về phản hồi thành công
        return response()->json([
            'message' => 'Favorite deleted successfully!',
            'favorite' => $favorite,
        ], 200);
    }
    public function getFavorites(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|integer|exists:users,id'
            ]);

            $perPage = 2;
            $now = now();

            $favorites = Favorite::with(['restaurant.reviews'])
                ->where('user_id', $request->user_id)
                ->paginate($perPage);

            $formattedData = [];
            foreach ($favorites->items() as $favorite) {
                $formattedData[] = [
                    'id' => $favorite->restaurant->id,
                    'name' => $favorite->restaurant->name,
                    'address' => $favorite->restaurant->address,
                    'description' => $favorite->restaurant->description,
                    'price_range' => [
                        'start' => $favorite->restaurant->price_start,
                        'end' => $favorite->restaurant->price_end
                    ],
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
                    'num_of_days_favorited' => abs(round($now->diffInDays($favorite->created_at))),
                    'days_favorited' => $favorite->created_at,
                    'now' => now(),
                    'time_ago' => (function () use ($favorite, $now) {
                        $minutes = round(abs($now->diffInMinutes($favorite->created_at)));
                        $hours = round(abs($now->diffInHours($favorite->created_at)));
                        $days = round(abs($now->diffInDays($favorite->created_at)));
                        $months = round(abs($now->diffInMonths($favorite->created_at)));

                        if ($minutes < 1) {
                            return 'dưới 1 phút trước';
                        } elseif ($minutes < 60) {
                            return $minutes . ' phút trước';
                        } elseif ($hours < 24) {
                            return $hours . ' giờ trước';
                        } elseif ($days < 30) {
                            return $days . ' ngày trước';
                        } elseif ($months < 12) {
                            return $months . ' tháng trước';
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
                'message' => 'Error fetching favorites',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
