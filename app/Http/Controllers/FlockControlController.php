<?php

namespace App\Http\Controllers;

use App\Models\FlockControl;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlockControlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(FlockControl $data)
    {
        return Inertia('Flockmanagement/Flockcontroldata',[
            'controldata' =>fn () => $data->filter(request()->only('sort'))
            ->latest()->paginate(15)
            ->withQueryString()
            -> through(fn($cdata)=>[
                'id'=> $cdata->id,
                'date_created' => $cdata->created_at,
                'record_date' => $cdata->record_date,
                'flock_name' => $cdata->flock_name,
                'shed' => $cdata->relatedshed->shed_identification_name,
                'trays_produced' => $cdata->trays_produced,
                'feeds_consumed' => $cdata->feeds_consumed,
                'dead_killed'=>$cdata->dead_killed,
                'missing'=>$cdata->missing,
                'culled' => $cdata->culled,
                'canEdit' =>Request()->user()->can('edit flock control'),
                ]),
            'filters' => request()->only('sort'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * @param  \App\Models\FlockControl  $flockControl
     * @return \Illuminate\Http\Response
     */
    public function show(FlockControl $flockControl)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FlockControl  $flockControl
     * @return \Illuminate\Http\Response
     */
    public function edit(FlockControl $flockControl)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FlockControl  $flockControl
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FlockControl $flockControl)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FlockControl  $flockControl
     * @return \Illuminate\Http\Response
     */
    public function destroy(FlockControl $flockControl)
    {
        //
    }
}
