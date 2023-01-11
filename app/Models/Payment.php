<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function method(){
        return $this->belongsTo(Paymentmethods::class,'paymentmethod_id');
    }

    public function sale(){
        return $this->belongsTo(Sale::class,'sale_id');
    }

    public function scopeFilter($query, array $filters){
        $query->when($filters['day'] ?? false, function($query,$day){
            $day = date('Y-m-d', strtotime($day));
            $query->whereDate('created_at',$day);
        })->when($filters['sort']??false, function($query,$sort){ 
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
    });
    }



}
