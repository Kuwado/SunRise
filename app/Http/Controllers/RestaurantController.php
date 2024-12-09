<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    //
    public function createRestaurant(Request $request) {
        
    }

    public function updateRestaurant(Request $request) {

    }

    public function getRestaurant(Request $request) {
        $id = $request->query('id');
        $restaurant = Restaurant::where('id', $id)->get();

        if (!$restaurant) {
            return response()->json([
                'message' => 'Cửa hàng không tồn tại'
            ], 404);
        }

        return response()->json([
            'message' => 'Lấy thành công cửa hàng',
            'restaurant' => $restaurant,
        ], 200);
    }

    public function sortRestaurantsByType($restaurants, $type) {
        switch ($type) {
            case 1:
                $restaurants = $restaurants->orWhereRaw('(CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 <= ?', [50]);
                break;
            case 2:
                $restaurants = $restaurants->orWhereRaw('
                    (CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 > ? AND 
                    (CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 <= ?', 
                    [50, 100]
                );                    
                break;
            case 3:
                $restaurants = $restaurants->orWhereRaw('
                    (CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 > ? AND 
                    (CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 <= ?', 
                    [100, 200]
                );                     
                break;
            case 4:
                $restaurants = $restaurants->orWhereRaw('(CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 > ?', [200]);
                break;
            default:
                break;
        }
        return $restaurants;
    }

    public function getRestaurants(Request $request) {
        $styleId = $request->query('style_id') ?? null;
        $styleIds = $request->query('style_ids') ?? null;
        $rating = $request->query('rating') ?? null;
        $ratings = $request->query('ratings') ?? null;
        $name = $request->query('name') ?? null;
        $start = $request->query('start') ?? null;
        $end = $request->query('end') ?? null;

        $perPage = $request->query('per_page') ?? 10;

        $restaurants = Restaurant::withAvg('reviews', 'rating');

        // Style
        if ($styleId) {
            $restaurants = $restaurants->whereHas('styles', function ($query) use ($styleId) {
                $query->where('style_id', $styleId);
            });
        } else if ($styleIds) {
            $styleIdsArray = explode(',', $styleIds);
            $restaurants = Restaurant::whereHas('styles', function ($query) use ($styleIdsArray) {
                $query->whereIn('style_id', $styleIdsArray);
            });
        }

        //Rating
        if ($rating) {
            $minRating = $rating - 0.5;
            $maxRating = $rating + 0.5;
            $restaurants = $restaurants->havingRaw('reviews_avg_rating > ? AND reviews_avg_rating <= ?', [$minRating, $maxRating]);     
        } else if ($ratings) {
            $ratingsArray = explode(',', $ratings);
            $restaurants->where(function ($query) use ($ratingsArray) {
                foreach ($ratingsArray as $rating) {
                    $minRating = $rating - 0.5;
                    $maxRating = $rating + 0.5;
                    $query->orHavingRaw('reviews_avg_rating > ? AND reviews_avg_rating <= ?', [$minRating, $maxRating]);
                }
            });
        }

        // Price
        if ($start && $end) {
            $restaurants = $restaurants->whereRaw('(price_start < ? AND price_end > ?) OR (price_end < ? AND price_end > ?)', [$end, $end, $end, $start]);
        } else if ($start) {
            $restaurants = $restaurants->where('price_end', '>=', $start);
        } else if ($end) {
            $restaurants = $restaurants->where('price_start', '<=', $end);
        }

        // Name
        if ($name) {
            $restaurants = $restaurants->where('name', 'like', "%{$name}%");
            if ($restaurants->count() == 0) {
                return response()->json([
                    'message' => 'Không tìm thấy nhà hàng nào',
                    'restaurants' => [],
                ], 200);
            }
        }

        //Distance

        $restaurants = $restaurants->paginate($perPage);

        return response()->json([
            'message' => 'Lấy thành công danh sách cửa hàng',
            'restaurants' => [
                'data' => RestaurantResource::collection($restaurants),
                'meta' => [
                    'current_page' => $restaurants->currentPage(),
                    'last_page' => $restaurants->lastPage(),
                    'total' => $restaurants->total(),
                    'per_page' => $restaurants->perPage(),
                ]
            ],
        ], 200);
    }
}
