<?php

namespace App\Http\Controllers;

use App\Models\Productsdefinition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProductsdefinitionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ([
            'products' => Productsdefinition::with(['product:id,name'])->latest()->paginate(15)
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
            // dd(request()->in_crates);
        Request()->validate([
            'name' => ['required', 'string', 'max:255', 'unique:products,name'],
            'in_crates'=>['required','boolean'],
            'definitions' => ['required', 'array', 'min:1'],
            'definitions.*.name' => ['required', 'string', 'max:255', 'distinct'],
            'definitions.*.unit_price' => ['required', 'numeric'],
            'definitions.*.price_per_crate' => [Rule::requiredIf(request()->in_crates == true),'nullable','numeric'],
            'definitions.*.units_per_crate' => [Rule::requiredIf(request()->in_crates == true),'nullable','numeric'],
            'automated_stocking' => ['required', 'boolean']
        ]);
        DB::transaction(function () {
            $newProduct = \App\Models\Product::create([
                'name'  => Request()->name,
                'in_crates' => Request()->in_crates
            ]);

            // dd(collect(Request()->definitions));
                collect(Request()->definitions)->each(function($value, $key) use ($newProduct) {
                Productsdefinition::create([
                    'product_id' => $newProduct->id,
                    'name' => $value['name'],
                    'unit_price' => $value['unit_price'],
                    'price_per_crate' => $value['price_per_crate'],
                    'units_per_crate' => $value['units_per_crate'],
                    'automated_stocking' => Request()->automated_stocking
                ]);
            });
        });
        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => 'product created succesfully'
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
     * @param  \App\Models\Productsdefinition  $productsdefinition
     * @return \Illuminate\Http\Response
     */
    public function show(Productsdefinition $productsdefinition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Productsdefinition  $productsdefinition
     * @return \Illuminate\Http\Response
     */
    public function edit(Productsdefinition $productsdefinition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Productsdefinition  $productsdefinition
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Productsdefinition $productsdefinition)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Productsdefinition  $productsdefinition
     * @return \Illuminate\Http\Response
     */
    public function destroy(Productsdefinition $productsdefinition)
    {
        //
    }
}
