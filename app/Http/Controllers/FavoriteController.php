<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    /**
     * Tạo mục yêu thích.
     */
    public function createFavorite(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'restaurant_id' => 'required|exists:restaurants,id',
        ]);

        // Tạo mục yêu thích
        $favorite = Favorite::create([
            'user_id' => $validatedData['user_id'],
            'restaurant_id' => $validatedData['restaurant_id'],
        ]);

        return response()->json([
            'message' => 'Favorite created successfully',
            'favorite' => $favorite,
        ], 200);
    }

    public function deleteFavorite($id)
    {
        // Tìm mục yêu thích theo id
        $favorite = Favorite::find($id);

        // Kiểm tra xem mục yêu thích có tồn tại không
        if (!$favorite) {
            return response()->json([
                'message' => 'Favorite not found'
            ], 404);
        }

        // Xóa mục yêu thích
        $favorite->delete();

        // Trả về phản hồi thành công
        return response()->json([
            'message' => 'Favorite deleted successfully!'
        ], 200);
    }
}

