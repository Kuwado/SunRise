<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Favorite extends Model
{

    use HasFactory;

    protected $fillable = ['user_id', 'restaurant_id'];


    public function collections()
    {
        return $this->belongsToMany(Collection::class, 'collections_favorites');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
