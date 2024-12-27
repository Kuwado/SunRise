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
use Illuminate\Validation\Rule;

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
                'media.*' => [
                    'nullable',
                    function ($attribute, $value, $fail) {
                        if (is_string($value)) {
                            // Nếu là chuỗi, kiểm tra độ dài tối đa (nếu cần)
                            if (strlen($value) > 255) {
                                $fail("The $attribute must not exceed 255 characters.");
                            }
                        } elseif ($value instanceof \Illuminate\Http\UploadedFile) {
                            // Nếu là file, kiểm tra mime types và size
                            $allowedMimeTypes = ['jpg', 'jpeg', 'png', 'mp4', 'avi', 'mkv'];
                            if (!in_array($value->getClientOriginalExtension(), $allowedMimeTypes)) {
                                $fail("The $attribute must be a file of type: " . implode(', ', $allowedMimeTypes) . ".");
                            }

                            if ($value->getSize() > 204800000) {
                                $fail("The $attribute may not be greater than 20480 KB.");
                            }
                        } else {
                            $fail("The $attribute must be a valid file or string.");
                        }
                    },
                ],
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
            'restaurant' => new RestaurantResource($restaurant, $userId),
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
                'data' => RestaurantResource::collection($restaurants->map(function ($restaurant) use ($userId) {
                    return new RestaurantResource($restaurant, $userId);
                })),
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

    public function restaurantStyleCreate(Request $request)
    {
        try {
            $request->validate([
                'restaurant_id' => 'required|exists:restaurants,id',
                'style_id' => 'required|exists:styles,id'
            ]);

            $restaurant = Restaurant::find($request->restaurant_id);

            // Kiểm tra xem style đã tồn tại chưa
            if ($restaurant->styles()->where('style_id', $request->style_id)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Style đã tồn tại cho nhà hàng này'
                ], 400);
            }

            // Thêm style mới
            $restaurant->styles()->attach($request->style_id);

            return response()->json([
                'success' => true,
                'message' => 'Thêm style thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm style',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getStylesOfRestaurant(Request $request)
    {
        try {
            $request->validate([
                'restaurant_id' => 'required|exists:restaurants,id'
            ]);

            $styles = DB::table('restaurants_styles')
                ->join('styles', 'restaurants_styles.style_id', '=', 'styles.id')
                ->where('restaurant_id', $request->restaurant_id)
                ->select(
                    'styles.id as style_id',
                    'styles.name',
                    'restaurants_styles.id as restaurants_styles_id'
                )
                ->get();

            return response()->json([
                'success' => true,
                'data' => $styles
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy styles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStyleOfRestaurant(Request $request, $id)
    {
        try {
            $request->validate([
                'restaurant_id' => 'required|exists:restaurants,id',
                'new_style_id' => 'required|exists:styles,id'
            ]);

            // Kiểm tra xem bản ghi restaurants_styles có tồn tại không
            $restaurantStyle = DB::table('restaurants_styles')
                ->where('id', $id)
                ->where('restaurant_id', $request->restaurant_id)
                ->first();

            if (!$restaurantStyle) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy style của nhà hàng'
                ], 404);
            }

            // Kiểm tra xem style mới đã tồn tại cho nhà hàng chưa
            $existingStyle = DB::table('restaurants_styles')
                ->where('restaurant_id', $request->restaurant_id)
                ->where('style_id', $request->new_style_id)
                ->first();

            if ($existingStyle) {
                return response()->json([
                    'success' => false,
                    'message' => 'Style mới đã tồn tại cho nhà hàng này'
                ], 400);
            }

            DB::table('restaurants_styles')
                ->where('id', $id)
                ->update(['style_id' => $request->new_style_id]);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật style thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật style',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function deleteStyleOfRestaurant($id)
    {
        try {
            $deleted = DB::table('restaurants_styles')->where('id', $id)->delete();

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy style của nhà hàng'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Xóa style thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa style',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function deleteRestaurantStyle($id)
    {
        try {
            $deleted = DB::table('restaurants_styles')->where('id', $id)->delete();
            return $deleted;
        } catch (\Exception $e) {
            return false;
        }
    }

    private function createRestaurantStyle($restaurant_id, $style_id)
    {
        try {
            return DB::table('restaurants_styles')->insertGetId([
                'restaurant_id' => $restaurant_id,
                'style_id' => $style_id
            ]);
        } catch (\Exception $e) {
            return false;
        }
    }

    private function updateRestaurantStyle($id, $style_id)
    {
        try {
            return DB::table('restaurants_styles')
                ->where('id', $id)
                ->update(['style_id' => $style_id]);
        } catch (\Exception $e) {
            return false;
        }
    }

    public function batchUpdateRestaurantStyles(Request $request)
    {
        try {
            $request->validate([
                'data' => 'required|array',
                'data.*.0' => 'required', // id
                'data.*.1' => 'required|exists:restaurants,id', // restaurant_id 
                'data.*.2' => 'required|exists:styles,id' // style_id
            ]);

            $requestData = $request->data;

            // Kiểm tra restaurant_id giống nhau
            $restaurantIds = array_unique(array_column($requestData, 1));
            if (count($restaurantIds) > 1) {
                return response()->json([
                    'success' => false,
                    'message' => 'Restaurant ID phải giống nhau'
                ], 400);
            }

            // Kiểm tra style_id không trùng nhau
            $styleIds = array_column($requestData, 2);
            if (count($styleIds) !== count(array_unique($styleIds))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Style ID không được trùng nhau'
                ], 400);
            }

            // Lấy dữ liệu từ database
            $dbData = DB::table('restaurants_styles')
                ->where('restaurant_id', $restaurantIds[0])
                ->get()
                ->map(function ($item) {
                    return [$item->id, $item->restaurant_id, $item->style_id];
                })
                ->toArray();

            // Tìm các phần tử trùng nhau giữa 2 mảng
            $commonElements = array_filter($requestData, function ($item1) use ($dbData) {
                return in_array($item1, $dbData);
            });

            // Loại bỏ phần tử trùng khỏi cả 2 mảng
            $requestData = array_diff_key($requestData, $commonElements);
            $dbData = array_diff_key($dbData, $commonElements);

            // Tách id thành mảng riêng
            $requestIds = array_column($requestData, 0);
            $dbIds = array_column($dbData, 0);

            // Tìm các id cần xóa
            $idsToDelete = array_diff($dbIds, $requestIds);

            // Tìm các id trùng nhau để update
            $idsToUpdate = array_intersect($dbIds, $requestIds);

            // Tìm các id mới để create
            $newElements = array_filter($requestData, function ($item) use ($dbIds) {
                return !in_array($item[0], $dbIds);
            });

            // Thực hiện xóa
            foreach ($idsToDelete as $id) {
                $this->deleteRestaurantStyle($id);
            }

            // Thực hiện update
            foreach ($idsToUpdate as $id) {
                $requestItem = array_filter($requestData, function ($item) use ($id) {
                    return $item[0] == $id;
                });
                $requestItem = reset($requestItem);
                $this->updateRestaurantStyle($id, $requestItem[2]);
            }

            // Thực hiện create
            foreach ($newElements as $item) {
                $this->createRestaurantStyle($item[1], $item[2]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
