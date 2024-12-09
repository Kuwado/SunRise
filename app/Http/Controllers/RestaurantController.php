<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

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

    public function getRestaurants(Request $request) {
        $styleId = $request->query('style_id') ?? null;
        $styleIds = $request->query('style_ids') ?? null;
        $rating = $request->query('rating') ?? null;
        $ratings = $request->query('ratings') ?? null;
        $name = $request->query('name') ?? null;
        $start = $request->query('start') ?? null;
        $end = $request->query('end') ?? null;
        $sort_rating = $request->query('sort_rating') ?? null;
        $sort_price = $request->query('sort_price') ?? null;

        $perPage = $request->query('per_page') ?? 10;

        $restaurants = Restaurant::withAvg('reviews', 'rating');

        // Style filter
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

        // Rating filter
        if ($rating) {
            $minRating = $rating - 0.5;
            $maxRating = $rating + 0.5;
            $restaurants = $restaurants->havingRaw('reviews_avg_rating > ? AND reviews_avg_rating <= ?', [$minRating, $maxRating]);     
        } else if ($ratings) {
            $ratingsArray = explode(',', $ratings);
            $restaurants->having(function ($query) use ($ratingsArray) {
                foreach ($ratingsArray as $rate) {
                    $rate = intval($rate);
                    $minRating = $rate - 0.5;
                    $maxRating = $rate + 0.5;
                    $query->orHavingRaw('reviews_avg_rating > ? AND reviews_avg_rating <= ?', [$minRating, $maxRating]);
                }
            });
        }

        // Price filter
        if ($start && $end) {
            $restaurants = $restaurants->whereRaw('(price_start < ? AND price_end > ?) OR (price_end < ? AND price_end > ?)', [$end, $end, $end, $start]);
        } else if ($start) {
            $restaurants = $restaurants->where('price_end', '>=', $start);
        } else if ($end) {
            $restaurants = $restaurants->where('price_start', '<=', $end);
        }

        // Name filter
        if ($name) {
            $restaurants = $restaurants->where('name', 'like', "%{$name}%");
            if ($restaurants->count() == 0) {
                return response()->json([
                    'message' => 'Không tìm thấy nhà hàng nào',
                    'restaurants' => [],
                ], 200);
            }
        }

        // Distance

        // Price sort
        if ($sort_price === "asc") {
            $restaurants = $restaurants->select('*', DB::raw('((price_start + price_end) / 2) as avg_price'))
            ->orderBy('avg_price', 'asc');
        } else if ($sort_price === "desc") {
            $restaurants = $restaurants->select('*', DB::raw('((price_start + price_end) / 2) as avg_price'))
            ->orderBy('avg_price', 'desc');
        }

        // Rating sort
        if ($sort_rating === "asc") {
            $restaurants = $restaurants->orderBy('reviews_avg_rating', 'asc');
        } else if ($sort_rating === "desc") {
            $restaurants = $restaurants->orderBy('reviews_avg_rating', 'desc');
        }

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
            // Tạo request mới cho avatar
            $avatarRequest = new Request();
            $avatarRequest->files->set('image', $request->file('avatar'));
            $avatarResponse = (new UploadController)->uploadImage($avatarRequest);
            $avatarPath = json_decode($avatarResponse->getContent())->image;
        }

        $mediaPaths = [];
        if ($request->hasFile('media')) {
            // Tạo request mới cho media
            $mediaRequest = new Request();
            $mediaRequest->files->set('images', $request->file('media'));
            $mediaResponse = (new UploadController)->uploadImages($mediaRequest);
            $mediaPaths = json_decode($mediaResponse->getContent())->images;
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
        try {
            $restaurant = Restaurant::findOrFail($id);

            // Xóa avatar nếu có
            if ($restaurant->avatar) {
                UploadController::deleteImage($restaurant->avatar);
            }

            // Xóa media nếu có
            if ($restaurant->media) {
                $mediaImages = json_decode($restaurant->media, true);
                if (is_array($mediaImages)) {
                    foreach ($mediaImages as $mediaImage) {
                        UploadController::deleteImage($mediaImage);
                    }
                }
            }

            // Xóa nhà hàng
            $restaurant->delete();

            return response()->json([
                'message' => 'Nhà hàng đã được xóa thành công!',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy nhà hàng!',
            ], 404);
        }
    }
}
