<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    public $guarded = [];

    public function sale(){
        return $this->belongsTo(Sale::class,'sale_id');
    }

    public function paymentmethod(){
        return $this->belongsTo(Paymentmethods::class,'paymentmethod');
    }
  
    public function scopeFilter($query, array $filters){
        $query->when($filters['search'] ?? false, function($query, $search){
            $sale = Sale::where('customer_name', 'Like', '%' . $search . '%')->get()->pluck("id");
            $query->where('invoice_number', 'Like', '%' . $search . '%')
            ->orwhereIn('sale_id',$sale);
        })->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
    })->when($filters['filter']?? false,function($query,$filter){
            if($filter === 'all'){
            $query->whereIn('payment_verified',[0,1]);
            }else if($filter === 'paid'){
                $query->where('payment_verified',1);
            }else if($filter === 'unpaid'){
                $query->where('payment_verified',0);
            }

    });
    }

}
