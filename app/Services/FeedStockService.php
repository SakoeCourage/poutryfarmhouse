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
        $currentRecord = Feed::where('id',$request->feed_id);
        DB::transaction(function () use ($request,$currentRecord) {
            $currentRecord->increment('quantity_in_stock', $request->quantity * 100);
            Feedstockhistory::create([
                'feed_id' => $request->feed_id,
                'user_id' => Auth()->user()->id,
                'action_type' => StockActionEnum::Appreciate,
                'quantity' => $request->quantity,
                'description' => $request->description ?? 'from ' . Auth()->user()->name,
                'net_quantity' => $currentRecord->get()->firstorFail()->quantity_in_stock
            ]);
        });
    }

    public function decreasestock($request)
    {
        $currentRecord = Feed::where('id',$request->feed_id);
        if($request->quantity > $currentRecord->get()->firstorFail()->quantity_in_stock){
            throw \Illuminate\Validation\ValidationException::withMessages(
                ['quantity' => 'not enough feeds in stock',
                'feeds' => 'not enough feeds in stock'
                ]
            );
        }else{
            DB::transaction(function () use ($request,$currentRecord) {
                $currentRecord->decrement('quantity_in_stock', $request->quantity * 100);
                Feedstockhistory::create([
                    'feed_id' => $request->feed_id,
                    'user_id' => Auth()->user()->id,
                    'action_type' => StockActionEnum::Depreciate,
                    'quantity' => $request->quantity,
                    'description' => $request->description ?? 'for flock control',
                    'net_quantity' => $currentRecord->get()->firstorFail()->quantity_in_stock
                ]);
            });
        }
   
    }
}