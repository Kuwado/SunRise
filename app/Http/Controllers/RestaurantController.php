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
    
    public function updateRestaurant(Request $request, $id)
    {
        try {
            // Tìm cửa hàng theo ID
            $restaurant = Restaurant::find($id);
    
            if (!$restaurant) {
                return response()->json(['message' => 'Restaurant not found'], 404);
            }
    
            // Validate dữ liệu đầu vào
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:restaurants,name,' . $id,
                'email' => 'required|email|max:255|unique:restaurants,email,' . $id,
                'phone' => 'required|string|max:20|unique:restaurants,phone,' . $id,
                'address' => 'required|string',
                'description' => 'nullable|string',
                'price_start' => 'required|numeric',
                'price_end' => 'required|numeric',
                'open_time' => 'required|date_format:H:i',
                'close_time' => 'required|date_format:H:i',
                'avatar' => 'nullable|string',
                'media' => 'nullable|string',
            ]);
    
            // Kiểm tra điều kiện giá bắt đầu < giá kết thúc
            if ($validatedData['price_start'] >= $validatedData['price_end']) {
                return response()->json([
                    'message' => 'Giá bắt đầu phải nhỏ hơn giá kết thúc.',
                ], 422); // HTTP 422: Unprocessable Entity
            }
    
            // Kiểm tra điều kiện thời gian mở < thời gian đóng
            if ($validatedData['open_time'] >= $validatedData['close_time']) {
                return response()->json([
                    'message' => 'Thời gian mở phải nhỏ hơn thời gian đóng.',
                ], 422); // HTTP 422: Unprocessable Entity
            }
    
            // Cập nhật thông tin cửa hàng
            $restaurant->update($validatedData);
    
            // Trả về kết quả thành công
            return response()->json([
                'message' => 'Restaurant updated successfully',
                'restaurant' => $restaurant,
            ], 200);
    
        } catch (\Exception $e) {
            // Xử lý lỗi không mong muốn
            return response()->json([
                'message' => 'An error occurred while updating the restaurant.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
