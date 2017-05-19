<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');
<<<<<<< 2526bf54417d0fbad51cbb88fd1c2dd9e4f1f1f3
=======
            $table->string('title',150);
            $table->string('slug',150);
            $table->string('images',100)->nullable();
            $table->longText('description')->nullable();
            $table->char('status',1)->default(1);
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
>>>>>>> update part1 25/05/2017 refs #part1
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }
}
