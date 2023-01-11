<?php 

namespace App\Services;
use App\Models\Feedstockhistory;
use App\Models\Feed;
use App\Enums\StockActionEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


Class FeedStockService{
    public $last_record;

    public function __construct(){
        $this->last_record = Feedstockhistory::all()->last();
    }

    public function increasestock($request)
    {
        DB::transaction(function () use ($request) {
            Feed::find($request->feed_id)->increment('quantity_in_stock', $request->quantity * 100);
            Feedstockhistory::create([
                'feed_id' => $request->feed_id,
                'user_id' => Auth()->user()->id,
                'action_type' => StockActionEnum::Appreciate,
                'quantity' => $request->quantity,
                'description' => $request->description ?? 'from ' . Auth()->user()->name,
                'net_quantity' => $this->last_record ? $this->last_record->net_quantity + $request->quantity : $request->quantity
            ]);
        });
    }

    public function decreasestock($request)
    {
        // dd($this->last_record->quantity);
        if((int)($request->quantity) > ($this->last_record->quantity ?? 0)){
            throw \Illuminate\Validation\ValidationException::withMessages(
                ['quantity' => 'not enough feeds in stock',
                'feeds' => 'not enough feeds in stock'
                ]
            );
        }else{
            DB::transaction(function () use ($request) {
                Feed::find($request->feed_id)->decrement('quantity_in_stock', $request->quantity * 100);
                Feedstockhistory::create([
                    'feed_id' => $request->feed_id,
                    'user_id' => Auth()->user()->id,
                    'action_type' => StockActionEnum::Depreciate,
                    'quantity' => $request->quantity,
                    'description' => $request->description ?? 'from flock control',
                    'net_quantity' => $this->last_record ? $this->last_record->net_quantity - $request->quantity : 0 - $request->quantity
                ]);
            });
        }
   
    }
}