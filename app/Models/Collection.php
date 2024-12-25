<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collection extends Model
{
    protected $fillable = ['user_id', 'name'];

    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function favorites()
    {
        return $this->belongsToMany(Favorite::class, 'collections_favorites')
            ->withPivot('id'); // Thêm 'id' để truy vấn pivot_id
    }
}
