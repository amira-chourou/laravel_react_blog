<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Comment Attributes
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->mediumText('comment');
            $table->bigInteger('user_id')->unsigned(); // the author of the comment
            $table->bigInteger('post_id')->unsigned();
            // add foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
