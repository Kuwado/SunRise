<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewsSeeder extends Seeder
{
    public function run()
    {
        $restaurants = Restaurant::all();
        $users = User::pluck('id')->toArray(); // Lấy danh sách user_id

        foreach ($restaurants as $restaurant) {
            // Tạo từ 5 đến 7 review cho mỗi nhà hàng
            $reviewsCount = rand(5, 7);

            for ($i = 0; $i < $reviewsCount; $i++) {
                Review::create([
                    'user_id' => $users[array_rand($users)], // Chọn ngẫu nhiên user_id
                    'restaurant_id' => $restaurant->id,
                    'rating' => rand(1, 5), // Random rating từ 1 đến 5
                    'comment' => fake()->sentence(), // Tạo comment ngẫu nhiên
                ]);
            }
        }
    }
}
