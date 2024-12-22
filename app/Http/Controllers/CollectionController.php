<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collection;
use App\Http\Resources\RestaurantResource;

class CollectionController extends Controller
{
    public function getCollection(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|integer|exists:collections,id'
            ]);

            $collection = Collection::findOrFail($request->query('id'));

            $restaurants = $collection->favorites()
                ->with('restaurant')
                ->paginate(2)
                ->through(function ($favorite) {
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
                        'media' => $favorite->restaurant->media,
                        'avatar' => $favorite->restaurant->avatar,
                        'location' => [
                            'latitude' => $favorite->restaurant->latitude,
                            'longitude' => $favorite->restaurant->longitude
                        ]
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'collection' => [
                        'id' => $collection->id,
                        'name' => $collection->name,
                        'restaurants' => $restaurants
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

            return response()->json([
                'success' => true,
                'data' => $collections
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching collections',
                'error' => $e->getMessage()
            ], 400);
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
}
