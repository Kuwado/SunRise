<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'avatar' => $this->avatar,
            'media' => $this->media,
            'description' => $this->description,
            'price_start' => $this->price_start,
            'price_end' => $this->price_end,
            'price_avg' => ($this->price_start + $this->price_end) / 2,
            'open_time' => $this->open_time,
            'close_time' => $this->close_time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'styles' => $this->styles->pluck('name'),
            'rating' => round($this->reviews->avg('rating'), 2),
        ];
    }
}
