<?php

namespace App\Services;

use App\Models\Productstock;
use Illuminate\Http\Request;
use App\Enums\StockActionEnum;
use App\Models\Productsdefinition;
use Illuminate\Support\Facades\DB;

class ProductStockService
{
   

    public function increasestock($request)
    {
        
        DB::transaction(function () use ($request) {
            Productsdefinition::find($request->productsdefinition_id)->increment('quantity_in_stock', $request->quantity);
            $last_record = Productstock::where('productsdefinition_id',$request->productsdefinition_id)->get()->last();
            Productstock::create([
                'productsdefinition_id' => $request->productsdefinition_id,
                'user_id' => Auth()->user()->id,
                'action_type' => StockActionEnum::Appreciate,
                'quantity' => $request->quantity,
                'description' => $request->description ?? 'from ' . Auth()->user()->name,
                'net_quantity' => $last_record ? $last_record->net_quantity + $request->quantity : $request->quantity
            ]);
        });
    }

    public function decreasestock($request)
    {
        DB::transaction(function () use ($request) {
            Productsdefinition::find($request->productsdefinition_id)->decrement('quantity_in_stock', $request->quantity);
            $last_record = Productstock::where('productsdefinition_id',$request->productsdefinition_id)->get()->last();
            Productstock::create([
                'productsdefinition_id' => $request->productsdefinition_id,
                'user_id' => Auth()->user()->id,
                'action_type' => StockActionEnum::Depreciate,
                'quantity' => $request->quantity,
                'description' => $request->description ?? 'for sale',
                'net_quantity' => $last_record ? $last_record->net_quantity - $request->quantity : 0 - $request->quantity
            ]);
        });
    }
}
