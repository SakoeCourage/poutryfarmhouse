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
        Schema::create('discountproducts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('discountdefinition_id')->constrained()->cascadeOnDelete();
            $table->foreignId('productsdefinition_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discountproducts');
    }
};
