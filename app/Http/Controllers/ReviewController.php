<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function getReviews(Request $request)
    {
        $userId = $request->query('user_id') ?? null;
        $restaurantId = $request->query('restaurant_id') ?? null;
        $limit = $request->query('limit', 10); // Mặc định trả về 10 kết quả

        // Truy vấn bảng reviews với quan hệ tới user và restaurant
        $query = Review::with(['user', 'restaurant']);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        if ($restaurantId) {
            $query->where('restaurant_id', $restaurantId);
        }

        $reviews = $query->limit($limit)->get();

        return response()->json([
            'message' => "Lấy thành công reviews",
            'reviews' => $reviews
        ], 200);
    }
}
