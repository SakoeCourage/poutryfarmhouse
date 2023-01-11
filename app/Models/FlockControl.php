<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlockControl extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function relatedshed(){
        return $this->belongsTo(Shed::class,'shed_id');
    }

    public function feeds():Attribute{
        return Attribute::make(
            get: fn ($value) => json_decode($value, true),
            set: fn ($value) => json_encode($value),
        );
    }
    public function production():Attribute{
        return Attribute::make(
            get: fn ($value) => json_decode($value, true),
            set: fn ($value) => json_encode($value),
        );
    } 

    public function scopeFilter($query, array $filters){
        $query->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
            else if($sort === 'recdate_desc'){
                $query->orderBy('record_date','desc') ;
            }
            else if($sort === 'recdate_asc'){
                $query->orderBy('record_date','asc') ;
            }
    });
}
}
