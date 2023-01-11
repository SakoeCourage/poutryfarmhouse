<?php

namespace App\Http\Controllers;
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


    public function allProducts(){
        return(
         [  
             'products' => Productsdefinition::latest()->paginate(15)->through(function($item){
                return([
                    'id'=>$item->id,
                    'name' => $item->name
                ]);
             })
             ]
        );
    }
    public function stockableProducts(){
        return(
         [  
             'products' => Productsdefinition::where('automated_stocking',1)->get(['name','id'])
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
        return([
            'product' => Productsdefinition::where('id',$id)->firstorFail()
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
