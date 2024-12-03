<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'avatar',
        'media',
        'description',
        'price_start',
        'price_end',
        'open_time',
        'close_time',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function styles()
    {
        return $this->belongsToMany(Style::class, 'restaurants_styles');
    }
}

