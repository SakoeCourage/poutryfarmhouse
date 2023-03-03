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
        Schema::create('productsdefinitions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('product_id');
            $table->bigInteger('unit_price');
            $table->bigInteger('price_per_crate')->nullable()->default(0);
            $table->bigInteger('units_per_crate')->nullable()->default(0);
            $table->bigInteger('quantity_in_stock')->nullable()->default(0);
            $table->boolean('automated_stocking')->nullable()->default(false);
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
        Schema::dropIfExists('productsdefinitions');
    }
};
