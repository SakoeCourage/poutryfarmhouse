<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
class Saleitem extends Model
{
    use HasFactory;
    protected $guarded = [];

    
    public function definitions(){
        return $this->belongsTo(Productsdefinition::class,'productsdefinition_id');
    }
    
    public function price(): Attribute {
        return Attribute::make(
            get: fn ($amount) => $amount / 100,
            set: fn ($amount) => $amount * 100,
        );
    }

  

    public function sale(){
        return $this->belongsTo(Sale::class,'sale_id');
    }
    public function amount(): Attribute {
        return Attribute::make(
            get: fn ($amount) => $amount / 100,
            set: fn ($amount) => $amount * 100,
        );
    }
}
