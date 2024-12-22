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
            // Validate the request parameter
            $request->validate([
                'id' => 'required|integer|exists:collections,id'
            ]);

            // Find the collection with the given ID from query parameter
            $collection = Collection::findOrFail($request->query('id'));

            // Get the restaurants through favorites relationship with pagination
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
}
