<?php

namespace App\Http\Controllers;

use App\Models\FlockControl;
use App\Models\Grading;
use App\Models\Gradinghistory;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Services\ProductStockService;

class GradingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Flockmanagement/Grading', [
            'records' => fn () => Grading::filter(request()->only('sort', 'filter'))
                ->with('flockcontroldata')
                ->latest()
                ->paginate(10)
                ->withQueryString()
                ->through(function ($item) {
                    return ([
                        'status' => $item->is_graded,
                        'created_at' => $item->created_at,
                        'product_name' => Product::where('id', $item->flockcontroldata->production[0]['product_id'])->get('name')[0]->name,
                        'quantity' => $item->flockcontroldata->production[0]['quantity'],
                        'flock_control_id' => $item->flock_control_id
                    ]);
                }),
            'graded' => Grading::where('is_graded', '=', 1)->count(),
            'ungraded' => Grading::where('is_graded', '=', 0)->count(),
            'all' => Grading::count(),
            'filter' => request()->only('filter')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
   

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
     * @param  \App\Models\Grading  $grading
     * @return \Illuminate\Http\Response
     */
    public function show($flockcontrol)
    {
        return FlockControl::where('id', $flockcontrol)->select('production','id')->get()
            ->map(function ($item) {
                return ([
                    'product' => Product::where('id', $item->production[0]['product_id'])->with('definitions')->get()
                        ->map(function ($item) {
                            return ([
                                'name' => $item->name,
                                'definitions' => $item->definitions
                            ]);
                        }),
                    'flock_control_id' => $item->id,
                    'quantity' => $item->production[0]['quantity'],

                ]);
            })[0];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Grading  $grading
     * @return \Illuminate\Http\Response
     */
    public function edit(Grading $grading)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Grading  $grading
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $stockservice = new ProductStockService();
        $request->validate([
            'flock_control_id' => ['required'],
            'defected' => ['required','numeric'],
            'grading' =>['required','array','min:1'],
            'grading.*.quantity' =>['required','numeric'],
            'grading.*.productsdefinition_id' =>['required','numeric']
        ]);
        $gradeModel = Grading::where('flock_control_id','=',$request->flock_control_id)->firstorFail();

        DB::transaction(function()use($request,$gradeModel,$stockservice){
            $gradeModel->update([
                'is_graded' => true,
                'defected'=>$request->defected
            ]);
            collect($request->grading)->each(function($value,$key)use($gradeModel,$request,$stockservice){
                    Gradinghistory::create([
                        'grading_id' => $gradeModel->id,
                        'productsdefinition_id' =>$value['productsdefinition_id'],
                        'quantity' => $value['quantity'],
                        'description' => 'from product grading'
                    ]);
                    $stockservice->increasestock((Object)$value);
            });

        });
        

        return('ok');


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Grading  $grading
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grading $grading)
    {
        //
    }
}
