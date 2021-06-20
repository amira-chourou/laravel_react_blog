<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //Return the post's author
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Return the post's comments
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id')->with('user', 'post');
    }
}
