<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flock extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function shed(){
        return $this->belongsTo(Shed::class);
    }
    
    public function breed(){
        return $this->belongsTo(Breed::class,'breed_id');
    }

    public function scopeFilter($query, array $filters){
        $query->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
            else if($sort === 'start_desc'){
                $query->orderBy('start_date','desc') ;
            }
            else if($sort === 'start_asc'){
                $query->orderBy('start_date','asc') ;
            }
    });
    }
}
