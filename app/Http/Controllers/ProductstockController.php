<?php

namespace App\Http\Controllers;

use App\Models\Productstock;
use Illuminate\Http\Request;
use App\Models\Productsdefinition;
use Illuminate\Support\Facades\Auth;
use App\Services\ProductStockService;
use Illuminate\Validation\Rule;

class ProductstockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
       
 
    }

    public function getProductHistory($product){
        
        return ([
            'product_history' => Productstock::where('productsdefinition_id',$product)
            ->filter(request()->only('date'))
            ->latest()->paginate(10)->withQueryString()
            ->through(function($item){
                return([
                    'date' => $item->created_at,
                    'time' => date('H:i', strtotime($item->created_at)),
                    'description' => $item->description,
                    'quantity' => $item->quantity,
                    'net_quantity' => $item->net_quantity,
                    'action' => $item->action_type
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
        $productStockService = new ProductStockService();
        $request->validate([
            'productsdefinition_id' => ['required'],
            'quantity' => ['required', 'numeric'],
            'action_type' => ['required', 'string']
        ]);
        if ($request->action_type == 'Appreciate') {
            $productStockService->increasestock($request);
        } else if ($request->action_type == 'Depreciate') {
            $productStockService->decreasestock($request);
        }
    }

    public function addToStock(Request $request, ProductStockService $productservice)
    {
        $request->validate([
            'productsdefinition_id' => ['required'],
             'in_crates' => ['required','boolean'],
             'crates' => [Rule::requiredIf($request->in_crates),'nullable','numeric'],
             'units' => [Rule::requiredIf(!request()->in_crates),'nullable','numeric'],
             'quantity' => ['required', 'numeric'],
             'description' => ['required', 'string', 'max:255']
        ]);

        $productservice->increasestock($request);
        return response('ok', 200);
    }
    public function removeFromStock(Request $request, ProductStockService $productservice)
    {
        $request->validate([
            'productsdefinition_id' => ['required'],
            'quantity' => ['required', 'numeric'],
            'description' => ['required', 'string', 'max:255']
        ]);

        $productservice->decreasestock($request);
        return response('ok', 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Productstock  $productstock
     * @return \Illuminate\Http\Response
     */
    public function show(Productstock $productstock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Productstock  $productstock
     * @return \Illuminate\Http\Response
     */
    public function edit(Productstock $productstock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Productstock  $productstock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Productstock $productstock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Productstock  $productstock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Productstock $productstock)
    {
        //
    }
}
