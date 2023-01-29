<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Stock;
use Illuminate\Http\Request;
use App\Models\Expenseitem;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Services\StockService;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('Expensesmanagement/index', [
            'today' => Expense::whereDate('created_at', Carbon::today())->count(),
            'submission_today' => Auth::user()->issuedtoday->count()

        ]);
    }



    public function allExpenses()
    {
        return inertia('Expensesmanagement/Allexpense', [
            'expenses' => fn () => Expense::with('author:id,name')->filter(request()->only('sort'))
                ->latest()->paginate(10)
                ->withQueryString()
        ]);
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
        $request->validate([
            'description' => ['required', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.item' => ['required', 'string', 'distinct'],
            'items.*.amount' => ['required']
        ]);

        DB::transaction(function () use ($request) {
            $newexpense = Expense::create([
                'description' => $request->description,
                'total' => $request->total,
                'user_id' => $request->user()->id,
                'status' => 2
            ]);
            $item_collection = collect($request->items);
            $item_collection->each(function ($expense, $key) use ($newexpense) {
                Expenseitem::create([
                    'expense_id' => $newexpense->id,
                    'item' => $expense['item'],
                    'amount' => $expense['amount']
                ]);
            });
        });
        return redirect()->back()->with([
            'message' => [
                'type' => 'sucess',
                'text' => 'expense submitted'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {
        return ([
            'expense' => $expense,
            'author' => $expense->author->only(['id', 'name']),
            'items' => $expense->expenseitems
        ]);
    }


    public function action(Expense $expense, $action)
    {

        $stock = new StockService();

        try {
            if ($action === 'accept') {
                if ($stock->decreaseproduction($expense)) {
                    $expense->update([
                        'status' => 1
                    ]);
                }
            } elseif ($action === 'decline') {
                $expense->update([
                    'status' => 0
                ]);
            }
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'message' => [
                    'type' => 'sucess',
                    'text' => $e->getMessage()
                ]
            ]);
        }

        return redirect()->back()->with([
            'message' => [
                'type' => 'sucess',
                'text' => 'action taken'
            ]
        ]);
    }


    /**
     * Get the expenses of a given stock resource
     * 
     * @param \App\Models\Stock 
     */
    public function getexpensesfromstockid(Stock $stock)
    {

        return ([
            'expenses' => $stock->expenses
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'name' => ['required', 'max:255'],
            'amount' => ['required', 'numeric']
        ]);
        $expense->update($request->all());
        return response('ok', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        if ($expense->delete()) {
            return response('ok', 200);
        }
    }
}
