<?php

namespace App\Services;

use App\Models\Flock;
use App\Models\FlockControl;
use Illuminate\Http\Request;

class MortalityService
{
    public $flock;
    public $request;


    public function __construct(Request $request)
    {
        $this->flock = Flock::where('id', $request->flock_name);

        $this->request = $request;
        if (Self::getTotalMortality() == $this->flock->firstOrFail()->opening_birds) {
            throw \Illuminate\Validation\ValidationException::withMessages(
                ['flock_name' =>  $this->flock->firstorFail()->flock_identification_name . 'has no living birds' ]
            );
        }
    }

    public function getTotalMortality()
    {
        $flock = $this->flock->firstOrFail();
        $totalMortality = $flock->dead + $flock->culled + $flock->missing;
        return $totalMortality;
    }

    public function handleDeadMortality()
    {
        if (isset($this->request->dead)) {
            if ((Self::getTotalMortality() + $this->request->dead) > $this->flock->firstOrFail()->opening_birds) {
                throw \Illuminate\Validation\ValidationException::withMessages(
                    ['dead' => 'Current mortality exceeds all living birds in  ' . $this->flock->firstorFail()->flock_identification_name]
                );
            } else {
                $this->flock->increment('dead', $this->request->dead);
                return $this->request->dead;
            }
        }
    }
    public function handleMissingMortality()
    {
        if (isset($this->request->missing)) {
            if ((Self::getTotalMortality() + $this->request->missing) > $this->flock->firstOrFail()->opening_birds) {
                throw \Illuminate\Validation\ValidationException::withMessages(
                    ['missing' => 'Current mortality exceeds all living birds in  ' . $this->flock->firstorFail()->flock_identification_name]
                );
            } else {
                $this->flock->increment('missing', $this->request->missing);
                return $this->request->missing;
            }
        }
    }
    public function handleCulledMortality()
    {
        if (isset($this->request->culled)) {
            if ((Self::getTotalMortality() + $this->request->culled) > $this->flock->firstOrFail()->opening_birds) {
                throw \Illuminate\Validation\ValidationException::withMessages(
                    ['culled' => 'Current mortality exceeds all living birds in  ' . $this->flock->firstorFail()->flock_identification_name]
                );
            } else {
                $this->flock->increment('culled', $this->request->culled);
                return $this->request->culled;
            }
        }
    }
}
