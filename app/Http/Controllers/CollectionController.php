<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collection;
use App\Models\Favorite;

use App\Http\Resources\RestaurantResource;

class CollectionController extends Controller
{
    // add favorite to Collection
    public function addFavoriteToCollection(Request $request)
    {
        try {
            // Validate input
            $validatedData = $request->validate([
                'collection_id' => 'required|integer|exists:collections,id',
                'favorite_id' => 'required|integer|exists:favorites,id',
            ]);

            // Find the collection
            $collection = Collection::findOrFail($validatedData['collection_id']);

            // Check if the favorite is already in the collection
            if ($collection->favorites()->where('favorites.id', $validatedData['favorite_id'])->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'The favorite is already in the collection'
                ], 409);
            }

            // Attach favorite to the collection
            $collection->favorites()->attach($validatedData['favorite_id']);

            return response()->json([
                'success' => true,
                'message' => 'Favorite added to collection successfully',
                'collection_favorite' => [
                    'collection_id' => $collection->id,
                    'favorite_id' => $validatedData['favorite_id']
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error adding favorite to collection',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function getCollection(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|integer|exists:collections,id'
            ]);

            $collection = Collection::findOrFail($request->query('id'));

            $now = now();

            // Lọc giá
            $start = $request->query('start') ?? null;
            $end = $request->query('end') ?? null;

            // Sắp xếp theo giá
            $sort_price = $request->query('sort_price') ?? null;

            // Lấy các yêu thích của bộ sưu tập với nhà hàng và đánh giá
            $favorites = $collection->favorites()->with('restaurant.reviews');

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
            $favorites = $favorites->paginate(2);

            $formattedData = $favorites->through(function ($favorite) use ($now) {
                return [
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
                    'now' => $now,
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
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'collection' => [
                        'id' => $collection->id,
                        'name' => $collection->name,
                        'restaurants' => $formattedData
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Collection not found or error occurred',
                'error' => $e->getMessage()
            ], 404);
        }
    }



    public function createCollection(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'name' => 'required|string|max:255'
            ]);

            $collection = Collection::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Collection created successfully',
                'data' => [
                    'id' => $collection->id,
                    'name' => $collection->name,
                    'user_id' => $collection->user_id,
                    'created_at' => $collection->created_at
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating collection',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Update an existing collection
     */
    public function updateCollection(Request $request, $id)
    {
        try {
            // Thay đổi validation để không cần 'id' trong body
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                // 'user_id' không bắt buộc
                'user_id' => 'nullable|integer|exists:users,id',
            ]);

            // Tìm collection bằng ID từ URL
            $collection = Collection::findOrFail($id);

            // Kiểm tra xem collection có thuộc về user không nếu user_id có trong request
            if (isset($validatedData['user_id']) && $collection->user_id != $validatedData['user_id']) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to update this collection'
                ], 403);
            }

            // Cập nhật collection
            $collection->update([
                'name' => $validatedData['name']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Collection updated successfully',
                'data' => [
                    'id' => $collection->id,
                    'name' => $collection->name,
                    'user_id' => $collection->user_id,
                    'updated_at' => $collection->updated_at
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating collection',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function getCollections(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|integer|exists:users,id'
            ]);

            $collections = Collection::select('id', 'name')
                ->where('user_id', $request->query('user_id'))
                ->withCount('favorites as restaurant_count')
                ->get();

            // Tính tổng số nhà hàng yêu thích không trùng lặp
            $totalRestaurantCount = Favorite::where('user_id', $request->query('user_id'))
                ->distinct('restaurant_id')
                ->count('restaurant_id');

            return response()->json([
                'success' => true,
                'data' => $collections,
                'total_restaurant_count' => $totalRestaurantCount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching collections',
                'error' => $e->getMessage()
            ], 400);
        }
    }



    /**
     * Delete a collection
     */
    public function deleteCollection($id)
    {
        try {
            // Lấy collection từ DB theo ID
            $collection = Collection::findOrFail($id);

            // Xóa collection
            $collection->delete();

            return response()->json([
                'success' => true,
                'message' => 'Collection deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting collection',
                'error' => $e->getMessage()
            ], 400);
        }
    }
    public function getCollectionsFromFavorite(Request $request)
    {
        try {
            // Validate the favorite_id
            $request->validate([
                'favorite_id' => 'required|integer|exists:favorites,id'
            ]);

            $favoriteId = $request->query('favorite_id');

            // Fetch collections containing the given favorite
            $collections = Collection::whereHas('favorites', function ($query) use ($favoriteId) {
                $query->where('favorites.id', $favoriteId);
            })->select('id', 'name')->get();

            return response()->json([
                'success' => true,
                'data' => $collections
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching collections for the favorite',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
