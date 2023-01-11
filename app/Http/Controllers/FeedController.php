<?php

namespace App\Http\Controllers;

use App\Models\Feed;
use App\Http\Requests\StoreFeedRequest;
use App\Http\Requests\UpdateFeedRequest;
use App\Models\Feedstockhistory;
use Illuminate\Http\Request;
use App\Services\FeedStockService;

class FeedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return([
            'feed' => Feed::latest()->paginate(10)
        ]);
    }
    public function feedsToSelect()
    {
        return([
            'feeds' => Feed::latest()->get(['id','feed_name'])
        ]);
    }



    public function getFeedHistory($feed){
        return ([
            'feed_history' => Feedstockhistory::where('feed_id',$feed)
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



    public function addToStock(Request $request, FeedStockService $feedstockservice)
    {
        $request->validate([
            'feed_id' => ['required'],
            'quantity' => ['required', 'numeric'],
            'description' => ['required', 'string', 'max:255']
        ]);

        $feedstockservice->increasestock($request);
        return response('ok', 200);
    }
    public function removeFromStock(Request $request, FeedStockService $feedstockservice)
    {
        $request->validate([
            'feed_id' => ['required'],
            'quantity' => ['required', 'numeric'],
            'description' => ['required', 'string', 'max:255']
        ]);

        $feedstockservice->decreasestock($request);
        return response('ok', 200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = $request->validate([
            'feed_name'=> ['required','string','max:255','unique:feeds,feed_name'],
            'cost_per_kg' => ['required','numeric']
        ]);

        Feed::create($data);
        return redirect()->back()->with([
            'message' =>[
                'type' => 'sucess',
                'text' => 'new feed added'
            ]
            ]);
    }

    public function showFeedStockPage(){
        return inertia('Stockmanagement/Feedstock');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFeedRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFeedRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Feed  $feed
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return([
            'feed' => Feed::where('id',$id)->firstorFail()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Feed  $feed
     * @return \Illuminate\Http\Response
     */
    public function edit(Feed $feed)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFeedRequest  $request
     * @param  \App\Models\Feed  $feed
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFeedRequest $request, Feed $feed)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Feed  $feed
     * @return \Illuminate\Http\Response
     */
    public function destroy(Feed $feed)
    {
        //
    }
}
