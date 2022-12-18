<?php

namespace App\Http\Controllers;

use App\Models\Flock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Breeds;
use App\Models\FlockControl;


class FlockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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

    public function createnewflock(Request $request, Flock $flock, Breeds $breeds)
    {
        $data = $request->validate([
            'flock_name' => ['required', 'max:255', 'unique:flocks'],
            'shed_id'    => ['required', 'max:255'],
            'start_date' => ['required', 'date'],
            'breed_types' => ['nullable', 'array'],
            'breed_types.*' => ['distinct'],
        ]);

        $startdate = date('Y-m-d H:i:s', strtotime($request->start_date));

        DB::transaction(function () use ($data, $flock, $breeds, $startdate) {
            $newflock = $flock->create([
                'flock_name' => $data['flock_name'],
                'start_date' => $startdate,
                'shed_id' => $data['shed_id']
            ]);

            $breedList = collect(Request()->breed_types);
            $breedList->each(function ($value, $key) use ($newflock) {
                Breeds::Create([
                    'flock_id' => $newflock->id,
                    'breed_name' => $value
                ]);
            });
        });
        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => ' done'
            ]
        ]);
    }

    public function compare()
    {
        return Inertia('Flockmanagement/Compareflocks');
    }


    public function controlShowform()
    {
        return Inertia('Flockmanagement/Flockcontrol');
    }


    public function controlCreate(Request $request)
    {
        $request->validate([
            'record_date' => ['required', 'date'],
            'flock_name' => ['required', 'string', 'max:255'],
            'shed_identification' => ['required'],
            'trays_produced' => ['required', 'numeric'],
            'feeds_consumed' => ['required', 'numeric'],
            'dead_killed' => ['nullable', 'numeric'],
            'missing' => ['nullable', 'numeric'],
            'culled' => ['nullable', 'numeric'],

        ]);
        $record_date = date('Y-m-d H:i:s', strtotime($request->record_date));

        FlockControl::Create([
            'record_date' => $record_date,
            'flock_name' => $request->flock_name,
            'shed_id' => $request->shed_identification,
            'trays_produced' => $request->trays_produced,
            'feeds_consumed' => $request->feeds_consumed,
            'dead_killed' => $request->dead_killed ?? null,
            'missing' => $request->missing ?? null,
            'culled' => $request->culled ?? null,
        ]);
        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => ' done'
            ]
        ]);
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
    public function edit(Flock $flock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Flock  $flock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Flock $flock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Flock  $flock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Flock $flock)
    {
        //
    }
}
