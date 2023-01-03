<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Stock $stock)
    {   

        return Inertia('Stockmanagement/Allstock',[
                'stocks' =>fn () => $stock->filter(request()->only('sort'))
                ->latest()->paginate(10)
                ->withQueryString()
                -> through(fn($cstock)=>[
                    'id'=> $cstock->id,
                    'date' => $cstock->created_at,
                    'opening_stock' => $cstock->opening_stock,
                    'closing_stock' => $cstock->closing_stock,
                    'broken' => $cstock->broken,
                    'other_defects' => $cstock->other_defects,
                    'birds_sold' => $cstock->birds_sold,
                    'eggs_sold'=>$cstock->eggs_sold,
                    'daily_production'=>$cstock->daily_production,
                    'canEdit' =>Request()->user()->can('edit stock'),
                    ]),
                'filters' => request()->only('sort'),
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
            'opening_stock' => ['required', 'numeric'],
            'closing_stock' => ['required', 'numeric'],
            'birds_sold' => ['nullable', 'numeric'],
            'eggs_sold' => ['nullable', 'numeric'],
            'broken' => ['nullable', 'numeric'],
            'other_defects' => ['nullable', 'numeric'],
            'daily_production' => ['required', 'numeric'],
            
        ]);

        DB::transaction(function () use ($request) {
            $newstock = Stock::Create([
                'opening_stock' => $request->opening_stock,
                'closing_stock' =>$request->closing_stock ,
                'birds_sold' => $request->birds_sold,
                'eggs_sold' => $request->eggs_sold,
                'broken' => $request->broken,
                'other_defects' => $request->other_defects,
                'daily_production' =>$request->daily_production 
            ]);
          
        });
        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => 'added'
            ]

        ]);
    }

    /**
     * @return \inertia\Inertia::render 
     */

    public function showcreateform()
    {
        return Inertia('Stockmanagement/Newstock');
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
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function show(Stock $stock)
    {

        return([
            'stock' => $stock->only(['birds_sold','closing_stock','opening_stock','daily_production','broken','eggs_sold','other_defects']),
            'expenses' => $stock->expenses
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stock $stock)
    {
        // dd(request()->all());
        $request->validate([
            'opening_stock' => ['required', 'numeric'],
            'closing_stock' => ['required', 'numeric'],
            'birds_sold' => ['nullable', 'numeric'],
            'eggs_sold' => ['nullable', 'numeric'],
            'broken' => ['nullable', 'numeric'],
            'other_defects' => ['nullable', 'numeric'],
            'daily_production' => ['required', 'numeric'],
            'expense' => ['nullable', 'array']
        ]);
        $stock->update($request->all());
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
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stock $stock)
    {
        if($stock->delete()){
            return redirect()->back()->with([
                "message" => [
                    'type' => 'success',
                    'text' => 'record deleted'
                ]
    
            ]);
        }
    }
}
