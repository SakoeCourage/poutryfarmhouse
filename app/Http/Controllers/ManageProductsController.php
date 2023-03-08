<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Productsdefinition;

use Illuminate\Http\Request;

class ManageProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia('Stockmanagement/Productstock');
    }


    public function allProducts()
    {
        return ([
                'products' => Product::latest()->with('definitions')->get()->map(function ($item) {
                    return ([
                        'product' => $item->name,
                        'in_crates' => $item->in_crates,
                        'collection_type'=>$item->collection_type,
                        'id' => $item->id,
                        'definitions' => $item->definitions->map(function ($item) {
                            return ([
                                'name' => $item->name,
                                'id' => $item->id
                            ]);
                        })
                    ]);
                })

            ]
        );
    }
    public function stockableProducts()
    {
        return ([
                'products' => Product::with('definitions')->latest()->whereHas('definitions',function($query){
                    $query->where('automated_stocking','=',1);
                })->get()
                 ]
        );
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ([
            'definition' => Productsdefinition::where('id', $id)->with('product:id,name,in_crates,collection_type')->firstorFail()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
