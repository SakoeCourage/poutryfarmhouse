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
        Schema::create('gradinghistories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('grading_id')->constrained()->cascadeOnDelete();
            $table->foreignId('productsdefinition_id');
            $table->string('description');
            $table->integer('quantity');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gradinghistories');
    }
};
