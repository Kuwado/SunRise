<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 30) as $index) {
            DB::table('restaurants')->insert([
                'name' => $faker->unique()->company,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->unique()->phoneNumber,
                'address' => $faker->address,
                'latitude' => $faker->latitude(20.8, 21.2),  // Tọa độ vĩ độ trong phạm vi Hà Nội
                'longitude' => $faker->longitude(105.7, 106.0),  // Tọa độ kinh độ trong phạm vi Hà Nội
                'description' => $faker->sentence,
                'price_start' => $faker->numberBetween(10, 50),
                'price_end' => $faker->numberBetween(60, 200),
                'open_time' => $faker->time('H:i:s', '08:00:00'),
                'close_time' => $faker->time('H:i:s', '22:00:00'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
