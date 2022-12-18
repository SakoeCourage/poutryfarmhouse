<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function expenses(){
       return $this->hasMany(Expense::class);
    }

    public function scopeFilter($query, array $filters){
        $query->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
            else if($sort === 'prod_desc'){
                $query->orderBy('daily_production','desc') ;
            }
            else if($sort === 'prod_asc'){
                $query->orderBy('daily_production','asc') ;
            }
    });



    }
}
