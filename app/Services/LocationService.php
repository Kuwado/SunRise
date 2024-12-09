<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class LocationService
{
    private $apiKey = "cd3be7e9ecbd49bc891a1fb4ddf82897";

    public function getCoordinates($address){
        $url = "https://api.opencagedata.com/geocode/v1/json";

        $response = Http::get($url, [
            'q' => $address,
            'key' => $this->apiKey,
            'language' => 'vi', 
        ]);

        if ($response->successful()) {
            $data = $response->json();
            if (!empty($data['results'])) {
                // Trả về tọa độ (vĩ độ, kinh độ)
                return $data['results'][0]['geometry'];
            } else {
                return null;  
            }
        }

        return null;
    }

    public function calculateDistance($lat1, $lng1, $lat2, $lng2) {
        $R = 6371; // Bán kính trái đất tính bằng km

        // Chuyển độ sang radian
        $lat1 = deg2rad($lat1);
        $lng1 = deg2rad($lng1);
        $lat2 = deg2rad($lat2);
        $lng2 = deg2rad($lng2);

        // Sự khác biệt giữa các vĩ độ và kinh độ
        $dLat = $lat2 - $lat1;
        $dLng = $lng2 - $lng1;

        // Áp dụng công thức Haversine
        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos($lat1) * cos($lat2) * 
             sin($dLng / 2) * sin($dLng / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        // Tính khoảng cách
        $distance = $R * $c;

        return $distance; // Khoảng cách tính bằng km
    }
}
