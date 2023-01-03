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
        Schema::create('flocks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('flock_identification_name');
            $table->string('age_of_flocks')->nullable();
            $table->bigInteger('opening_birds')->nullable();
            $table->foreignId('breed_id');
            $table->foreignId('shed_id');
            $table->dateTime('start_date')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flocks');
    }
};
