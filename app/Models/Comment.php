<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //

     // Return the comment's post

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }


    //Return the comment's author

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
