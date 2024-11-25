<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Style extends Model
{
    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class, 'restaurants_styles');
    }
}
