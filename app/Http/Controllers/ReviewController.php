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
        $limit = $request->query('limit', 20); // Mặc định trả về 10 kết quả

        // Truy vấn bảng reviews với quan hệ tới user và restaurant
        $query = Review::with(['user', 'restaurant']);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        if ($restaurantId) {
            $query->where('restaurant_id', $restaurantId);
        }

        $reviews = $query->orderBy('created_at', 'desc');
        $reviews = $reviews->limit($limit)->get();

        return response()->json([
            'message' => "レビューの取得に成功しました。",
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
                'comment' => 'nullable|string|max:1000',
                // 'image' => 'nullable',
            ]);

            // $existingReview = Review::where('user_id', $validatedData['user_id'])
            //     ->where('restaurant_id', $validatedData['restaurant_id'])
            //     ->first();

            // if ($existingReview) {
            //     return response()->json([
            //         'success' => false,
            //         'message' => 'You have already reviewed this restaurant'
            //     ], 400);
            // }
                    // Xử lý avatar (nếu có)
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = "hh";
                $image = $request->file('image');
                $imageName = time() . '_image_' . uniqid() . '.' . $image->extension();
                $image->storeAs('images', $imageName, 'public');
                $imagePath = "/storage/images/$imageName";
            }

            $review = Review::create([
                'user_id' => $validatedData['user_id'],
                'restaurant_id' => $validatedData['restaurant_id'],
                'rating' => $validatedData['rating'],
                'comment' => $validatedData['comment'] ?? null,
                'image' => $imagePath
            ]);

            $review->load(['user:id,name', 'restaurant:id,name']);

            return response()->json([
                'success' => true,
                'message' => 'レビューが正常に作成されました。',
                'image' =>  $imagePath,
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
                'message' => 'レビューの作成中にエラーが発生しました。',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
