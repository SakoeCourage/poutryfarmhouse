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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->biginteger('opening_stock');
            $table->biginteger('closing_stock');
            $table->biginteger('birds_sold')->nullable(); 
            $table->biginteger('eggs_sold')->nullable(); 
            $table->biginteger('broken')->nullable();
            $table->biginteger('other_defects')->nullable();
            $table->biginteger('daily_production')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stocks');
    }
};
