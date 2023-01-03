<?php

namespace App\Http\Controllers;

use App\Models\Flock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Breed;
use App\Models\FlockControl;


class FlockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Flock $flock)
    {
        return inertia('Flockmanagement/Allflocks', [
            'flocks' => fn () => $flock->with(['shed:id,shed_identification_name','breed:id,name'])->filter(request()->only('sort'))
                ->latest()->paginate(10)
                ->withQueryString()

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }
    public function showcreateflockform()
    {
        return Inertia('Flockmanagement/Createflock');
    }

    public function createnewflock(Request $request)
    {

        $data = $request->validate([
            'flock_identification_name' => ['required', 'max:255', 'unique:flocks'],
            'shed_id'    => ['required', 'max:255'],
            'start_date' => ['required', 'date'],
            'age_of_flocks' => ['nullable', 'numeric'],
            'opening_birds' => ['required', 'numeric'],
            'breed' => ['required'],

        ]);
        $startdate = date('Y-m-d H:i:s', strtotime($request->start_date));
        Flock::create([
            'flock_identification_name' => $data['flock_identification_name'],
            'start_date' => $startdate,
            'shed_id' => $data['shed_id'],
            'breed_id' => $data['breed']
        ]);

        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => ' created sucessfully'
            ]
        ]);
    }

    public function compare()
    {
        return Inertia('Flockmanagement/Compareflocks');
    }


 


    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Flock  $flock
     * @return \Illuminate\Http\Response
     */
    public function show(Flock $flock)
    {
        return Inertia('Flock');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Flock  $flock
     * @return \Illuminate\Http\Response
     */
    public function edit(Flock $flock, Request $request)
    {
    }


    public function update( Request $request,)
    {


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Flock  $flock
     * @return \Illuminate\Http\Response
     */
    public function destroy(FlockControl $flock)
    {
        
    }
}
