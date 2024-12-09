<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    //
    private $apiKey = "cd3be7e9ecbd49bc891a1fb4ddf82897";

    public function getCoordinate($address){
        $url = "https://api.opencagedata.com/geocode/v1/json";

        $response = Http::get($url, [
            'q' => $address,
            'key' => $this->apiKey,
            'language' => 'vi',  // Đặt ngôn ngữ tìm kiếm (nếu cần)
        ]);

        if ($response->successful()) {
            $data = $response->json();
            if (!empty($data['results'])) {
                // Trả về tọa độ (vĩ độ, kinh độ)
                return $data['results'][0]['geometry'];
            } else {
                return "helo";  // Không tìm thấy kết quả
            }
        }

        return "helo";  // Lỗi khi gọi API
    }
    public function getCoordinates(Request $request)
    {
        $address = $request->query('address') ?? "hrlo"; 

        $coordinates = $this->getCoordinate($address);

        // if ($coordinates === "helo") {
        //     return response()->json([
        //         'message' => 'Không tìm thấy tọa độ cho địa chỉ này.',
        //         'coordinates' => null
        //     ], 404);
        // }

        return response()->json([
            'message' => 'Lấy tọa độ thành công',
            'coordinates' => $coordinates
        ], 200);
    }
}
