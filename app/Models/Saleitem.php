<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
class Saleitem extends Model
{
    use HasFactory;
    protected $guarded = [];

    
    public function product(){
        return $this->belongsTo(Productsdefinition::class,'productsdefinition_id');
    }
    public function sale(){
        return $this->belongsTo(sale::class,'sale_id');
    }
    public function amount(): Attribute {
        return Attribute::make(
            get: fn ($amount) => $amount / 100,
            set: fn ($amount) => $amount * 100,
        );
    }
}
