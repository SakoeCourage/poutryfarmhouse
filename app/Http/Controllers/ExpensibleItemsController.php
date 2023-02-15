<?php

namespace App\Http\Controllers;

use App\Models\ExpensibleItems;
use Illuminate\Http\Request;

class ExpensibleItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

   
    public function expensibleItemsToSelect(){
        return ([
            'items' => \App\Models\ExpensibleItems::get(['id', 'item'])
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
     * @param  \App\Models\ExpensibleItems  $expensibleItems
     * @return \Illuminate\Http\Response
     */
    public function show(ExpensibleItems $expensibleItems)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ExpensibleItems  $expensibleItems
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpensibleItems $expensibleItems)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ExpensibleItems  $expensibleItems
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpensibleItems $expensibleItems)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ExpensibleItems  $expensibleItems
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpensibleItems $expensibleItems)
    {
        //
    }
}
