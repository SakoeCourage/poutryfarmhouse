<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grading extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function flockcontroldata(){
        return $this->belongsTo(FlockControl::class,'flock_control_id');
    }
    
    public function history(){
        return $this->hasOne(Gradinghistory::class,'grading_id','id');
    }
    public function scopeFilter($query, array $filters){
        $query->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
    })
    ->when($filters['filter'] ?? false, function($query,$filter){
            if($filter==='ungraded'){
                $query->where('is_graded','=',0);
            }else if($filter==='graded'){
                $query->where('is_graded','=',1);
            } else if($filter==='a;;'){
                $query->whereIn('is_graded',[1,0]);
            }
    });
    }


    
}
