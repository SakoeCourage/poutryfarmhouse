<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Productsdefinition extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function unitPrice(): Attribute {
        return Attribute::make(
            get: fn ($unit_price) => $unit_price / 100,
            set: fn ($unit_price) => $unit_price * 100,
        );
    }
}
