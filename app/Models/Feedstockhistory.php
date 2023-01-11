<?php

namespace App\Models;

use App\Enums\StockActionEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Feedstockhistory extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    protected $casts = [
        'action_type' => StockActionEnum::class
    ];

    public function quantity(): Attribute {
        return Attribute::make(
            get: fn ($amount) => $amount / 100,
            set: fn ($amount) => $amount * 100,
        );
    }

    public function netQuantity(): Attribute {
        return Attribute::make(
            get: fn ($amount) => $amount / 100,
            set: fn ($amount) => $amount * 100,
        );
    }

    public function scopeFilter($query, array $filters){
        $query->when($filters['date'] ?? false, function($query, $date){
            $query->whereDate('created_at', $date );
        })->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
    });
    }
}
