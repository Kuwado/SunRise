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


    protected ?int $userId;

    public function __construct($resource, ?int $userId = null)
    {
        // Gọi parent constructor
        parent::__construct($resource);
        $this->userId = $userId;
    }


    public function toArray(Request $request): array
    {
        $isFavorited = $this->favorites()->where('user_id', $this->userId)->exists();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'avatar' => $this->avatar,
            'media' => json_decode($this->media, true),
            'description' => $this->description,
            'price_start' => $this->price_start,
            'price_end' => $this->price_end,
            'price_avg' => round($this->price_avg, 2) ?? ($this->price_start + $this->price_end) / 2,
            'open_time' => $this->open_time,
            'close_time' => $this->close_time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'styles' => $this->styles->pluck('name'),
            'rating' => round($this->reviews->avg('rating'), 2),
            'distance' => round($this->distance, 2) ?? null,
            'number' => $this->reviews->count(),
            'isFavorited' => $isFavorited,
        ];
    }
}
