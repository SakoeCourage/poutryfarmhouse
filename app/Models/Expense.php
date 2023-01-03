<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Expense extends Model
{
    use HasFactory;

    
    protected $guarded = [];

    public function stock(){
        return $this->belongsTo(Stock::class);
    }

    public function total(): Attribute {
        return Attribute::make(
            get: fn ($amount) => $amount / 100,
            set: fn ($amount) => $amount * 100,
        );
    }

    public function expenseitems (){
        return $this->hasMany(Expenseitem::class);
    }

    public function author(){
        return $this->belongsTo(User::class,'user_id');
    }
    
    public function scopeFilter($query, array $filters){
        $query->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
    })->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'status_asc'){
                $query->orderBy('status','asc');
            }else if($sort === 'status_desc'){
                $query->orderBy('status','desc') ;
            }
    });
    }
    
}
