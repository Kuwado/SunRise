<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StyleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('styles')->insert([
            ['name' => '開放的な空間'],
            ['name' => '現代的な空間'],
            ['name' => 'レトロな空間'],
            ['name' => '落ち着いた空間'],
            ['name' => '高級な空間'],
            ['name' => '共有スペース'],
        ]);
    }
}
