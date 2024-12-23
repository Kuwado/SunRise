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
    public function createReview(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'restaurant_id' => 'required|integer|exists:restaurants,id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string|max:1000'
            ]);

            $existingReview = Review::where('user_id', $validatedData['user_id'])
                ->where('restaurant_id', $validatedData['restaurant_id'])
                ->first();

            if ($existingReview) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already reviewed this restaurant'
                ], 400);
            }

            $review = Review::create($validatedData);

            $review->load(['user:id,name', 'restaurant:id,name']);

            return response()->json([
                'success' => true,
                'message' => 'Review created successfully',
                'data' => [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'user' => [
                        'id' => $review->user->id,
                        'name' => $review->user->name
                    ],
                    'restaurant' => [
                        'id' => $review->restaurant->id,
                        'name' => $review->restaurant->name
                    ],
                    'created_at' => $review->created_at
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating review',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
