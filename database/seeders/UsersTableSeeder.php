<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $users = [
            [
                'name' => 'Luu Viet Hoan',
                'email' => 'Hoan.LV@sun-asterisk.com',
                'password' => Hash::make('hoanluu57'),
                'phone' => '+84372689718',
                'address' => 'Trung Van, Nam Tu Liem, Ha Noi',
                'latitude' => $faker->latitude(20.8, 21.2),  // Tọa độ vĩ độ trong phạm vi Hà Nội
                'longitude' => $faker->longitude(105.7, 106.0),  // Tọa độ kinh độ trong phạm vi Hà Nội
                'birth' => '2003-07-05',
                'avatar' => 'avt1.jpg',
                'workplace' => 'Hanoi University of Science and Technology, Hanoi, Vietnam',
                'nationality' => 'Vietnam',
                'city' => 'Hanoi',
                'remember_token' => Str::random(10),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ha Dinh Nam',
                'email' => 'Nam.HD@sun-asterisk.com',
                'password' => Hash::make('southriver1809'),
                'phone' => '+84398626045',
                'address' => 'Bach Khoa, Hai Ba Trung, Ha Noi',
                'latitude' => $faker->latitude(20.8, 21.2),  // Tọa độ vĩ độ trong phạm vi Hà Nội
                'longitude' => $faker->longitude(105.7, 106.0),  // Tọa độ kinh độ trong phạm vi Hà Nội
                'birth' => '2003-09-18',
                'avatar' => 'avt2.jpg',
                'workplace' => 'Hanoi University of Science and Technology, Hanoi, Vietnam',
                'nationality' => 'Vietnam',
                'city' => 'Hanoi',
                'remember_token' => Str::random(10),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vu Minh Quan',
                'email' => 'Quan.VM@sun-asterisk.com',
                'password' => Hash::make('quan1402'),
                'phone' => '+84352650269',
                'address' => 'Hoang Liet, Hoang Mai, Ha Noi',
                'latitude' => $faker->latitude(20.8, 21.2),  // Tọa độ vĩ độ trong phạm vi Hà Nội
                'longitude' => $faker->longitude(105.7, 106.0),  // Tọa độ kinh độ trong phạm vi Hà Nội
                'birth' => '2003-02-14',
                'avatar' => 'avt3.jpg',
                'workplace' => 'Hanoi University of Science and Technology, Hanoi, Vietnam',
                'nationality' => 'Vietnam',
                'city' => 'Hanoi',
                'remember_token' => Str::random(10),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];
        for ($i = 0; $i < 7; $i++) {
            $users[] =
            [
                'name' => $faker->name,
                'email' => $faker->unique()->username . '@sun-asterisk.com',
                'password' => Hash::make('password'),
                'phone' => $faker->numerify('+###########'),
                'nationality' => $country = $faker->country,
                'city' => $city = $faker->city,
                'address' => $faker->streetAddress . ', ' . $city . ', ' . $country,
                'latitude' => $faker->latitude(20.8, 21.2),  // Tọa độ vĩ độ trong phạm vi Hà Nội
                'longitude' => $faker->longitude(105.7, 106.0),  // Tọa độ kinh độ trong phạm vi Hà Nội
                'birth' => $faker->date,
                'avatar' => 'avt' . $i + 4 . '.jpg',
                'workplace' => $faker->company,
                'remember_token' => Str::random(10),
                'role' => 'user',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        DB::table('users')->insert($users);
    }
}
