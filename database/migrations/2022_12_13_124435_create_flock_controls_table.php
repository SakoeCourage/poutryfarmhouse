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
        Schema::create('flock_controls', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->dateTime('record_date');
            $table->string('flock_name');
            $table->foreignId('shed_id');
            $table->integer('eggs_produced')->nullable();
            $table->integer('feeds_consumed')->nullable();
            $table->integer('dead')->nullable();
            $table->integer('missing')->nullable();
            $table->integer('culled')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flock_controls');
    }
};
