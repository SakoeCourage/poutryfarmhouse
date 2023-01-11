<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Sale extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function salerepresentative(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function totalAmount(): Attribute {
        return Attribute::make(
            get: fn ($amount) => $amount / 100,
            set: fn ($amount) => $amount * 100,
        );
    }
    public function saleitems(){
        return $this->hasMany(Saleitem::class,'sale_id');
    } 

    public function invoice(){
        return $this->hasOne(Invoice::class,'sale_id');
    }

    public function scopeFilter($query, array $filters){
        $query->when($filters['search'] ?? false, function($query, $search){
            $query->where('customer_name', 'Like', '%' . $search . '%');
        })->when($filters['day'] ?? false, function($query,$day){
                $day = date('Y-m-d', strtotime($day));
                $query->whereDate('created_at',$day);
    });
    }
}
