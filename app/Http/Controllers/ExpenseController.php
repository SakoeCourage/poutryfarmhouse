<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Stock;
use App\Models\Expense;
use App\Models\Expenseitem;
use App\Notifications\ExpenseApproved;
use Illuminate\Http\Request;
use App\Services\StockService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Notifications\NewUnApprovedExpense;
use Illuminate\Support\Facades\Notification;



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
            'expenses' => fn () => Expense::where('status',2)->with('author:id,name')->filter(request()->only('sort'))
                ->latest()->paginate(10)
                ->withQueryString()
        ]);
    }

    public function mySubmissions()
    {
        return inertia('Expensesmanagement/Allexpense', [
                'expenses' => fn () => Expense::where('user_id',Auth()->user()->id)->with('author:id,name')->filter(request()->only('sort'))
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
            $users_to_authorize =  User::getUsersWhoCan('authorize expense')->get();
            Notification::send($users_to_authorize, new NewUnApprovedExpense(Auth::user(), $newexpense));
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

        DB::transaction(function () use ($expense, $action) {
            if ($action === 'accept') {
                $expense->update([
                    'status' => 1
                ]);
            $expense->author->notify(new ExpenseApproved($expense));
            } elseif ($action === 'decline') {
                $expense->update([
                    'status' => 0
                ]);
            }
        });


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
