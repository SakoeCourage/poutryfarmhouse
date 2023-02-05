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

    public function mortality(){
        $flock = Self::flocks()->get();
        $dead = Self::flocks()->get()->sum('dead');
        $culled = Self::flocks()->get()->sum('culled');
        $missing = Self::flocks()->get()->sum('missing');
        return $dead+$culled+$missing;
    }
    public function currentNumberOfBirds(){
        $numberofBirds =  Self::flocks()->get()->sum('opening_birds');
        return $numberofBirds - Self::mortality();
       }
}
