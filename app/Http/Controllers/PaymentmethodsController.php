<?php

namespace App\Http\Controllers;

use App\Models\Paymentmethods;
use App\Http\Requests\StorePaymentmethodsRequest;
use App\Http\Requests\UpdatePaymentmethodsRequest;

class PaymentmethodsController extends Controller
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
     * @param  \App\Http\Requests\StorePaymentmethodsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePaymentmethodsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Paymentmethods  $paymentmethods
     * @return \Illuminate\Http\Response
     */
    public function show(Paymentmethods $paymentmethods)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Paymentmethods  $paymentmethods
     * @return \Illuminate\Http\Response
     */
    public function edit(Paymentmethods $paymentmethods)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePaymentmethodsRequest  $request
     * @param  \App\Models\Paymentmethods  $paymentmethods
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePaymentmethodsRequest $request, Paymentmethods $paymentmethods)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Paymentmethods  $paymentmethods
     * @return \Illuminate\Http\Response
     */
    public function destroy(Paymentmethods $paymentmethods)
    {
        //
    }
}
