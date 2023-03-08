<?php

namespace App\Http\Controllers;

use App\Models\CollectionType;
use Illuminate\Http\Request;

class CollectionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CollectionType::get(['id','type']);
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
     * @param  \App\Models\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function show(CollectionType $collectionType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function edit(CollectionType $collectionType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CollectionType $collectionType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function destroy(CollectionType $collectionType)
    {
        //
    }
}
