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
}
