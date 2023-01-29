<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shed extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function flocks(){
        return $this->hasMany(Flock::class,'shed_id');
    }
}
