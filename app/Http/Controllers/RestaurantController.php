<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    //

    public function updateRestaurant(Request $request) {}

    public function getRestaurant(Request $request)
    {
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

    public function sortRestaurantsByType($restaurants, $type)
    {
        switch ($type) {
            case 1:
                $restaurants = $restaurants->orWhereRaw('(CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 <= ?', [50]);
                break;
            case 2:
                $restaurants = $restaurants->orWhereRaw(
                    '
                    (CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 > ? AND 
                    (CAST(price_start AS DECIMAL) + CAST(price_end AS DECIMAL)) / 2 <= ?',
                    [50, 100]
                );
                break;
            case 3:
                $restaurants = $restaurants->orWhereRaw(
                    '
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

    public function sortRestaurantsByRating($restaurants, $rating)
    {
        $restaurants = $restaurants->orWhereRaw('reviews_avg_rating > ? AND reviews_avg_rating <= ?', [$rating - 1, $rating]);
        return $restaurants;
    }

    public function getRestaurants(Request $request)
    {
        $styleId = $request->query('style_id') ?? null;
        $styleIds = $request->query('style_ids') ?? null;
        $type = $request->query('type') ?? null;
        $types = $request->query('types') ?? null;
        $rating = $request->query('rating') ?? null;
        $ratings = $request->query('ratings') ?? null;
        $name = $request->query('name') ?? null;

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

        // Type
        if ($type) {
            $restaurants = $this->sortRestaurantsByType($restaurants, $type);
        } else if ($types) {
            $typeArray = explode(',', $types);
            foreach ($typeArray as $t) {
                $restaurants = $this->sortRestaurantsByType($restaurants, $t);
            }
        }

        //Rating
        if ($rating) {
            $minRating = $rating - 1;
            $maxRating = $rating;
            $restaurants = $restaurants->having('reviews_avg_rating', '>', $minRating)
                ->having('reviews_avg_rating', '<=', $maxRating);
        } else if ($ratings) {
            $ratingsArray = explode(',', $ratings);
            $restaurants->where(function ($query) use ($ratingsArray) {
                foreach ($ratingsArray as $rating) {
                    $minRating = $rating - 1;
                    $maxRating = $rating;
                    $query->orHavingRaw('reviews_avg_rating > ? AND reviews_avg_rating <= ?', [$minRating, $maxRating]);
                }
            });
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

    public function createRestaurant(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:restaurants,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'media.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
            'price_start' => 'required|numeric',
            'price_end' => 'required|numeric',
            'open_time' => 'required|string',
            'close_time' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $validator->errors()
            ], 422);
        }

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarName = time() . '_avatar_' . uniqid() . '.' . $avatar->extension();
            $avatar->storeAs('images', $avatarName, 'public');
            $avatarPath = "/storage/images/$avatarName";
        }

        $mediaPaths = [];
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $mediaFile) {
                $mediaName = time() . '_media_' . uniqid() . '.' . $mediaFile->extension();
                $mediaFile->storeAs('images', $mediaName, 'public');
                $mediaPaths[] = "/storage/images/$mediaName";
            }
        }

        $restaurant = Restaurant::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'avatar' => $avatarPath,
            'media' => json_encode($mediaPaths),
            'description' => $request->input('description'),
            'price_start' => $request->input('price_start'),
            'price_end' => $request->input('price_end'),
            'open_time' => $request->input('open_time'),
            'close_time' => $request->input('close_time'),
        ]);

        return response()->json([
            'message' => 'Nhà hàng đã được tạo thành công!',
            'restaurant' => $restaurant,
        ], 200);
    }
    public function deleteRestaurant($id)
    {
        $restaurant = Restaurant::findOrFail($id);

        if ($restaurant->avatar) {
            $avatarPath = str_replace('/storage/', '', $restaurant->avatar);
            Storage::disk('public')->delete('images/' . basename($avatarPath));
        }

        if ($restaurant->media) {
            $mediaImages = json_decode($restaurant->media, true);
            if (is_array($mediaImages)) {
                foreach ($mediaImages as $mediaImage) {
                    $imagePath = str_replace('/storage/', '', $mediaImage);
                    Storage::disk('public')->delete('images/' . basename($imagePath));
                }
            }
        }

        $restaurant->delete();

        return response()->json([
            'message' => 'Nhà hàng đã được xóa thành công!',
        ], 200);
    }
}
