<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Restaurant;

class RestaurantsStylesTableSeeder extends Seeder
{
    public function run()
    {
        // Lấy danh sách các nhà hàng
        $restaurants = Restaurant::all();

        foreach ($restaurants as $restaurant) {
            // Random từ 1 đến 3 style IDs
            $styleIds = collect(range(1, 6))->random(rand(1, 3));

            foreach ($styleIds as $styleId) {
                DB::table('restaurants_styles')->insert([
                    'restaurant_id' => $restaurant->id,
                    'style_id' => $styleId,
                ]);
            }
        }
    }
}
