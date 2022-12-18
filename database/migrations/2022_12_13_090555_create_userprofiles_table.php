<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userprofiles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->onstrained()->cascadeOnDelete(); 
            $table->string('firstname');
            $table->string('lastname');
            $table->bigInteger('contact')->nullable();
            $table->string('location')->nullable();
            $table->string('identification_number')->nullable();
            $table->string('jobposition')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('userprofiles');
    }
};
