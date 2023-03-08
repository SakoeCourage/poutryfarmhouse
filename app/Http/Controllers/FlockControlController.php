<?php

namespace App\Http\Controllers;

use App\Models\FlockControl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\FeedStockService;
use App\Services\MortalityService;
use App\Models\Grading;
use Illuminate\Validation\Rule;


class FlockControlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(FlockControl $data)
    {
        return Inertia('Flockmanagement/Flockcontroldata', [
            'controldata' => fn () => $data->with('flocks')->filter(request()->only('sort'))
                ->latest()->paginate(15)
                ->withQueryString()
                ->through(fn ($cdata) => [
                    'id' => $cdata->id,
                    'date_created' => $cdata->created_at,
                    'record_date' => $cdata->record_date,
                    'flock_name' => $cdata->flocks->flock_identification_name,
                    'shed' => $cdata->relatedshed->shed_identification_name,
                    'eggs_produced' => collect($cdata->production)->sum('quantity'),
                    'feeds_consumed' => collect($cdata->feeds)->sum('quantity'),
                    'dead' => $cdata->dead,
                    'missing' => $cdata->missing,
                    'culled' => $cdata->culled,
                    'time' => $cdata->time,
                    'vaccination' => $cdata->vaccination,
                    'medication' => $cdata->medication,
                    'canEdit' => Request()->user()->can('edit flock control'),
                ]),
            'filters' => request()->only('sort'),
        ]);
    }


    public function flocksToSelect()
    {
        return ([
            'flocks' => \App\Models\Flock::with('pen')->get()->map(function ($item) {
                return ([
                    'flock_identification_name' => $item->flock_identification_name,
                    'id' => $item->id,
                    'shed_identification_name' => $item->pen->shed_identification_name,
                    'shed_id' => $item->pen->id
                ]);
            })
        ]);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {



        $request->validate([
            'record_date' => ['required', 'date'],
            'flock_name' => ['required', 'string', 'max:255'],
            'pen_identification' => ['required'],
            'feeds' => ['nullable', 'array'],
            'feeds.*.feed_id' => ['required', 'distinct',],
            'feeds.*.quantity' => ['required', 'numeric'],
            'products' => ['required', 'array'],
            'products.*.product_id' => ['required', 'distinct'],
            'products.*.quantity' => ['required', 'numeric'],
            'dead' => ['nullable', 'numeric'],
            'medication' => ['nullable', 'string', 'max:255'],
            'vaccination' => ['nullable', 'string', 'max:255'],
            'missing' => ['nullable', 'numeric'],
            'culled' => ['nullable', 'numeric'],
            'time' => ['date_format:H:i'],
            'products.*.in_crates' => ['required', 'boolean'],
            'products.*.crates' => ['required_if:products.*.in_crates,true', 'nullable', 'numeric'],
            'products.*.units' => ['required_if:products.*.in_crates,false', 'nullable', 'numeric'],


        ]);

        $record_date = date('Y-m-d H:i:s', strtotime($request->record_date));
        $feedservice = new FeedStockService();
        $mortality =  new MortalityService($request);

        DB::transaction(function () use ($request, $record_date, $feedservice, $mortality) {
            foreach ($request->products as $loop => $product) {
                $newflockdata = FlockControl::Create([
                    'record_date' => $record_date,
                    'flock_id' => $request->flock_name,
                    'shed_id' => $request->pen_identification,
                    'production' => $product,
                    'feeds' => $request->feeds,
                    'vaccination' => $request->vaccination ?? null,
                    'time' => $request->time ?? null,
                    'medication' => $request->medication ?? null,
                    'dead' => $loop == 0 ? $mortality->handleDeadMortality() : 0,
                    'missing' => $loop == 0 ? $mortality->handleMissingMortality() : 0,
                    'culled' => $loop == 0 ? $mortality->handleCulledMortality() : 0,
                ]);
                \App\Models\Grading::create([
                    'flock_control_id' => $newflockdata->id,
                    'is_graded' => false,
                    'remainder_description' => ''
                ]);
            }

            foreach ($request->feeds as  $feed) {
                $feedservice->decreasestock((object)$feed);
            }
        });
        return response('ok');
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
    public function show(FlockControl $flock)
    {
        return ($flock
            ->only([
                'eggs_produced', 'shed_id', 'record_date', 'id', 'flock_name', 'missing', 'feeds_consumed', 'dead', 'culled'

            ]));
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
    public function update(Request $request, FlockControl $flock)
    {
        $request->validate([
            'record_date' => ['required', 'date'],
            'flock_name' => ['required', 'string', 'max:255'],
            'shed_identification' => ['required'],
            'eggs_produced' => ['required', 'numeric'],
            'feeds_consumed' => ['required', 'numeric'],
            'dead' => ['nullable', 'numeric'],
            'missing' => ['nullable', 'numeric'],
            'culled' => ['nullable', 'numeric'],

        ]);;
        $record_date = date('Y-m-d H:i:s', strtotime($request->record_date));
        $flock->update([
            'record_date' => $record_date,
            'flock_name' => $request->flock_name,
            'shed_id' => $request->shed_identification,
            'eggs_produced' => $request->eggs_produced,
            'feeds_consumed' => $request->feeds_consumed,

        ]);
        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => 'updated'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FlockControl  $flockControl
     * @return \Illuminate\Http\Response
     */
    public function destroy(FlockControl $flock)
    {
        if ($flock->delete()) {
            return redirect()->back()->with([
                "message" => [
                    'type' => 'success',
                    'text' => 'deleted sucessful'
                ]
            ]);
        }
    }
}
