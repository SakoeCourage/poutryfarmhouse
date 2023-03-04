<?php

namespace App\Jobs;

use App\Mail\Stockreductionemail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class Sendstockreductionmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
     public $users;
     public $description;
     public $quantity;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($users,$description,$quantity)
    {   
        $this->users = $users;
        $this->description = $description;
        $this->quantity = $quantity;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {   
        foreach((Array)$this->users as $user){
                Mail::to($user->email)->send(new Stockreductionemail($this->description,$this->quantity));
        }
    }
}
