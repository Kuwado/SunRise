<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Models\Style;
use App\Models\User;
use App\Services\LocationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    //
    private $locationService;
    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    public function updateRestaurant(Request $request, $id)
    {
        try {
            // Tìm cửa hàng theo ID
            $restaurant = Restaurant::find($id);

            if (!$restaurant) {
                return response()->json(['message' => 'Restaurant not found'], 404);
            }

            // Định nghĩa các quy tắc validate
            $rules = [
                'name' => 'required|string|max:255,',
                'email' => 'required|email|max:255,',
                'phone' => 'required|string|max:20,',
                'address' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price_start' => 'required|numeric',
                'price_end' => 'required|numeric',
                'open_time' => 'required|date_format:H:i:s',
                'close_time' => 'required|date_format:H:i:s',
                'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
                'media.*' => 'nullable|mimes:jpg,jpeg,png,mp4,avi,mkv|max:20480000',
            ];

            // Tùy chỉnh thông báo lỗi (nếu cần)
            $messages = [
                'name.required' => 'Tên cửa hàng là bắt buộc.',
                'email.required' => 'Email là bắt buộc.',
                'price_start.required' => 'Giá bắt đầu là bắt buộc.',
                'price_start.numeric' => 'Giá bắt đầu phải là số.',
                'price_end.required' => 'Giá kết thúc là bắt buộc.',
                'price_end.numeric' => 'Giá kết thúc phải là số.',
            ];

            // Thực hiện validate
            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Dữ liệu không hợp lệ',
                    'errors' => $validator->errors(),
                ], 422); // HTTP 422: Unprocessable Entity
            }

            $validatedData = $validator->validated();

            // Kiểm tra điều kiện giá bắt đầu < giá kết thúc
            if ($validatedData['price_start'] >= $validatedData['price_end']) {
                return response()->json([
                    'message' => 'Giá bắt đầu phải nhỏ hơn giá kết thúc.',
                ], 422);
            }

            // Kiểm tra điều kiện thời gian mở < thời gian đóng
            if ($validatedData['open_time'] >= $validatedData['close_time']) {
                return response()->json([
                    'message' => 'Thời gian mở phải nhỏ hơn thời gian đóng.',
                ], 422);
            }

            if ($request->filled('address')) {
                $locations = $this->locationService->getCoordinates($request->input('address'));
                if (!$locations) {
                    return response()->json([
                        'message' => 'Địa chỉ không hợp lệ',
                    ], 422);
                }

                $restaurant->longitude = $locations['lng'];
                $restaurant->latitude = $locations['lat'];
            }

            // Xử lý ảnh avatar (nếu có)
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $avatarName = time() . '_avatar_' . uniqid() . '.' . $avatar->extension();
                $avatar->storeAs('images', $avatarName, 'public');
                $validatedData['avatar'] = "/storage/images/$avatarName";

                // Xóa ảnh avatar cũ (nếu cần)
                if ($restaurant->avatar && file_exists(public_path($restaurant->avatar))) {
                    unlink(public_path($restaurant->avatar));
                }
            }

            if ($request->input('media') === null) {
                // Xóa old media
                $oldMedia = json_decode($restaurant->media, true);
                if (is_array($oldMedia)) {
                    foreach ($oldMedia as $oldMediaPath) {
                        if (file_exists(public_path($oldMediaPath))) {
                            unlink(public_path($oldMediaPath));
                        }
                    }
                }
                $validatedData['media'] = null;
            }

            // Xử lý media (nếu có)
            if ($request->hasFile('media')) {
                $oldMedia = [];
                if ($restaurant->media) {
                    $oldMedia = json_decode($restaurant->media, true);
                    if ($request->has('media')) {
                        $mediaStrings = $request->input('media');
                        // Ensure $mediaStrings is an array
                        if (!is_array($mediaStrings)) {
                            $mediaStrings = [$mediaStrings];
                        }
                        // Delete old media that are not in the new media strings
                        foreach ($oldMedia as $oldMediaPath) {
                            if (!in_array($oldMediaPath, $mediaStrings) && file_exists(public_path($oldMediaPath))) {
                                unlink(public_path($oldMediaPath));
                            }
                        }
                        $oldMedia = array_merge([], $mediaStrings);
                    }
                }
                $mediaPaths = [];
                foreach ($request->file('media') as $media) {
                    $mediaName = time() . '_media_' . uniqid() . '.' . $media->extension();
                    $media->storeAs('images', $mediaName, 'public');
                    $mediaPaths[] = "/storage/images/$mediaName";
                }

                $mediaPaths = array_merge($mediaPaths, $oldMedia);

                // Lưu các đường dẫn media mới vào cơ sở dữ liệu
                $validatedData['media'] = json_encode($mediaPaths);
            } else if ($request->has('media')) {
                $mediaStrings = $request->input('media');
                // Ensure $mediaStrings is an array
                if (!is_array($mediaStrings)) {
                    $mediaStrings = [$mediaStrings];
                }
                $oldMedia = json_decode($restaurant->media, true);
                foreach ($oldMedia as $oldMediaPath) {
                    if (!in_array($oldMediaPath, $mediaStrings) && file_exists(public_path($oldMediaPath))) {
                        unlink(public_path($oldMediaPath));
                    }
                }
                $validatedData['media'] = json_encode($mediaStrings);
            }

            // Cập nhật thông tin cửa hàng
            $restaurant->update($validatedData);

            return response()->json([
                'message' => 'Cập nhật nhà hàng thành công',
                'restaurant' => $restaurant,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the restaurant.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getRestaurant(Request $request)
    {
        $id = $request->query('id');
        $userId = $request->query('user_id') ?? null;

        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json([
                'message' => 'Cửa hàng không tồn tại'
            ], 404);
        }

        if ($userId) {
            $user = User::find($userId);
            $lat = 21.0170210;
            $lng = 105.7834800;
            if ($user) {
                $lat = $user->latitude;
                $lng = $user->longitude;
            }
            $distance = $this->locationService->calculateDistance($lat, $lng, $restaurant->latitude, $restaurant->longitude);
            $restaurant->distance = round($distance, 2);
        }


        return response()->json([
            'message' => 'Lấy thành công cửa hàng',
            'restaurant' => new RestaurantResource($restaurant),
        ], 200);
    }

    private function getDistance($restaurants, $type)
    {
        switch ($type) {
            case 1:
                $restaurants = $restaurants->orHavingRaw('distance <= ?', [10]);
                break;
            case 2:
                $restaurants = $restaurants->orHavingRaw('distance > ? AND distance <= ?', [10, 20]);
                break;
            case 3:
                $restaurants = $restaurants->orHavingRaw('distance > ? AND distance <= ?', [20, 30]);
                break;
            case 4:
                $restaurants = $restaurants->orHavingRaw('distance > ? AND distance <= ?', [30, 40]);
                break;
            case 5:
                $restaurants = $restaurants->orHavingRaw('distance > ?', [40]);
                break;
            default:
                break;
        }
        return $restaurants;
    }

    public function getRestaurants(Request $request)
    {
        // Style filter
        $styleId = $request->query('style_id') ?? null;
        $styleIds = $request->query('style_ids') ?? null;
        // Rating filter
        $rating = $request->query('rating') ?? null;
        $ratings = $request->query('ratings') ?? null;
        // Distance filter
        $distanceType = $request->query('distance_type') ?? null;
        $distanceTypes = $request->query('distance_types') ?? null;
        // Name filter
        $name = $request->query('name') ?? null;
        // Price filter
        $start = $request->query('start') ?? null;
        $end = $request->query('end') ?? null;
        // Sort
        $sort_rating = $request->query('sort_rating') ?? null;
        $sort_price = $request->query('sort_price') ?? null;
        $sort_distance = $request->query('sort_distance') ?? null;
        $sort_time = $request->query('sort_time') ?? null;
        $userId = $request->query('user_id') ?? null;

        $perPage = $request->query('per_page') ?? 10;

        $restaurants = Restaurant::withAvg('reviews', 'rating');
        $restaurants = $restaurants->addSelect(DB::raw("(price_start + price_end) / 2 AS price_avg"));

        // Add distance
        if ($userId) {
            $user = User::find($userId);
            $lat = 21.0170210;
            $lng = 105.7834800;
            if ($user) {
                $lat = $user->latitude;
                $lng = $user->longitude;
            }
            $restaurants = $restaurants->addSelect(DB::raw("
                (6371 * acos(
                    cos(radians($lat)) * cos(radians(latitude)) * 
                    cos(radians(longitude) - radians($lng)) + 
                    sin(radians($lat)) * sin(radians(latitude))
                )) AS distance
            "));
        }

        // Style filter
        if ($styleId) {
            $restaurants = $restaurants->whereHas('styles', function ($query) use ($styleId) {
                $query->where('style_id', $styleId);
            });
        } else if ($styleIds) {
            $styleIdsArray = explode(',', $styleIds);
            $restaurants = $restaurants->whereHas('styles', function ($query) use ($styleIdsArray) {
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
            $restaurants = $restaurants->having(function ($query) use ($ratingsArray) {
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

        // Distance filter
        if ($distanceType) {
            $restaurants = $this->getDistance($restaurants, $distanceType);
        } else if ($distanceTypes) {
            $typeArray = explode(',', $distanceTypes);
            foreach ($typeArray as $t) {
                $restaurants = $this->getDistance($restaurants, $t);
            }
        }

        // Name filter
        if ($name) {
            $restaurants = $restaurants->where('name', 'like', "%{$name}%");
            if ($restaurants->count() == 0) {
                return response()->json([
                    'message' => 'Không tìm thấy nhà hàng nào',
                    'restaurants' => [
                        'data' => [],
                        // 'data' => $restaurants,
                        'meta' => [
                            'current_page' => 1,
                            'last_page' => 1,
                            'total' => 1,
                            'per_page' => 1,
                        ]
                    ],
                ], 200);
            }
        }

        if ($sort_price === "asc") {
            $restaurants = $restaurants->orderBy('price_avg', 'asc');
        } else if ($sort_price === "desc") {
            $restaurants = $restaurants->orderBy('price_avg', 'desc');
        }

        // Rating sort
        if ($sort_rating === "asc") {
            $restaurants = $restaurants->orderBy('reviews_avg_rating', 'asc');
        } else if ($sort_rating === "desc") {
            $restaurants = $restaurants->orderBy('reviews_avg_rating', 'desc');
        }

        // Distance sort
        if ($sort_distance === "asc") {
            $restaurants = $restaurants->orderBy('distance', 'asc');
        } else if ($sort_distance === "desc") {
            $restaurants = $restaurants->orderBy('distance', 'desc');
        }

        // Time sort 
        if ($sort_time === "asc") {
            $restaurants = $restaurants->orderBy('created_at', 'asc');
        } else if ($sort_time === "desc") {
            $restaurants = $restaurants->orderBy('created_at', 'desc');
        }

        $restaurants = $restaurants->paginate($perPage);

        return response()->json([
            'message' => 'Lấy thành công danh sách cửa hàng',
            'restaurants' => [
                'data' => RestaurantResource::collection($restaurants),
                // 'data' => $restaurants,
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
            'price_start' => 'nullable|numeric',
            'price_end' => 'nullable|numeric',
            'open_time' => 'nullable|date_format:H:i:s',
            'close_time' => 'nullable|date_format:H:i:s',
        ]);

        if ($request->input('price_start') >= $request->input('price_end')) {
            return response()->json(['message' => 'Giá bắt đầu phải nhỏ hơn giá kết thúc.',], 422);
        } // Kiểm tra điều kiện thời gian mở < thời gian đóng 
        if ($request->input('open_time') >= $request->input('close_time')) {
            return response()->json(['message' => 'Thời gian mở phải nhỏ hơn thời gian đóng.',], 422);
        }


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $validator->errors()
            ], 422);
        }

        // Location
        $address = $request->input('address');
        $locations = $this->locationService->getCoordinates($address);
        if (!$locations) {
            return response()->json([
                'message' => 'Địa chỉ không hợp lệ',
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
            'longitude' => $locations['lng'],
            'latitude' => $locations['lat'],
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

    public function getCounts(Request $request)
    {
        $userId = $request->query('user_id');
        $start = $request->query('start') ?? 40;
        $end = $request->query('end') ?? 90;

        $distances = [];
        if ($userId) {
            $user = User::find($userId);
            $lat = 21.0170210;
            $lng = 105.7834800;
            if ($user) {
                $lat = $user->latitude;
                $lng = $user->longitude;
            }
            $restaurantsQuery = Restaurant::addSelect(DB::raw("
                (6371 * acos(
                    cos(radians($lat)) * cos(radians(latitude)) * 
                    cos(radians(longitude) - radians($lng)) + 
                    sin(radians($lat)) * sin(radians(latitude))
                )) AS distance
            "));

            $distances = [
                "1" => (clone $restaurantsQuery)->havingRaw('distance <= ?', [10])->count(),
                "2" => (clone $restaurantsQuery)->havingRaw('distance > ? AND distance <= ?', [10, 20])->count(),
                "3" => (clone $restaurantsQuery)->havingRaw('distance > ? AND distance <= ?', [20, 30])->count(),
                "4" => (clone $restaurantsQuery)->havingRaw('distance > ? AND distance <= ?', [30, 40])->count(),
                "5" => (clone $restaurantsQuery)->havingRaw('distance > ?', [40])->count(),
            ];
        }

        // Styles
        $styleIds = Style::pluck('id');
        $styles = [];
        foreach ($styleIds as $styleId) {
            $styles[$styleId] = Restaurant::whereHas('styles', function ($query) use ($styleId) {
                $query->where('style_id', $styleId);
            })->count();
        }

        // Rating
        $ratingArray = [1, 2, 3, 4, 5];
        $ratings = [];
        foreach ($ratingArray as $rating) {
            $startRate = $rating - 0.5;
            $endRate = $rating + 0.5;
            $ratings[$rating] = Restaurant::withAvg('reviews', 'rating')
                ->havingRaw('reviews_avg_rating <= ? AND reviews_avg_rating > ?', [$endRate, $startRate])
                ->count();
        }

        // Price
        $prices = [];
        $prices["1"] = Restaurant::where('price_start', '<=', $start)->count();
        $prices["2"] = Restaurant::whereRaw(
            '(price_start < ? AND price_end > ?) OR (price_end < ? AND price_end > ?)',
            [$end, $end, $end, $start]
        )->count();
        $prices["3"] = Restaurant::where('price_end', '>=', $end)->count();
        $prices["4"] = Restaurant::count();


        return response()->json([
            'styles' => $styles,
            'ratings' => $ratings,
            'prices' => $prices,
            'distances' => $distances,
        ], 200);
    }

    public function createRestaurantV(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:restaurants,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'media.*' => 'nullable|mimes:jpg,jpeg,png,mp4,avi,mkv|max:20480000',
            'description' => 'nullable|string',
            'price_start' => 'nullable|numeric',
            'price_end' => 'nullable|numeric',
            'open_time' => 'nullable|date_format:H:i:s',
            'close_time' => 'nullable|date_format:H:i:s',
        ]);

        // Kiểm tra điều kiện giá
        if ($request->input('price_start') >= $request->input('price_end')) {
            return response()->json(['message' => 'Giá bắt đầu phải nhỏ hơn giá kết thúc.'], 422);
        }

        // Kiểm tra điều kiện thời gian mở và đóng
        if ($request->input('open_time') >= $request->input('close_time')) {
            return response()->json(['message' => 'Thời gian mở phải nhỏ hơn thời gian đóng.'], 422);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $validator->errors()
            ], 422);
        }

        // Lấy tọa độ từ địa chỉ
        $address = $request->input('address');
        $locations = $this->locationService->getCoordinates($address);
        if (!$locations) {
            return response()->json([
                'message' => 'Địa chỉ không hợp lệ',
            ], 422);
        }

        // Xử lý avatar (nếu có)
        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarName = time() . '_avatar_' . uniqid() . '.' . $avatar->extension();
            $avatar->storeAs('images', $avatarName, 'public');
            $avatarPath = "/storage/images/$avatarName";
        }

        // Xử lý media (ảnh và video)
        $mediaPaths = [];
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $mediaFile) {
                $mediaName = time() . '_media_' . uniqid() . '.' . $mediaFile->extension();
                $mediaFile->storeAs('media', $mediaName, 'public'); // Lưu video và ảnh vào thư mục 'media'
                $mediaPaths[] = "/storage/media/$mediaName";
            }
        }

        // Tạo nhà hàng mới
        $restaurant = Restaurant::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'longitude' => $locations['lng'],
            'latitude' => $locations['lat'],
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
}
