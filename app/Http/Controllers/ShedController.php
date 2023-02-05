<?php

namespace App\Http\Controllers;

use App\Models\Shed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return Inertia('Shedmanagement/Allshed',[
                'sheds' => Shed::with('flocks')->latest()->paginate(10)
                ->through(function($item){
                    return[
                        'created_at' =>$item->created_at,
                        'shed_identification_name'=>$item->shed_identification_name,
                        'number_of_flocks' => $item->flocks->count(),
                        'number_of_birds' => $item->currentNumberOfBirds()
                    ];
                })
                
       ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showcreateform()
    {
       return Inertia('Shedmanagement/Createshed');
    }
    public function create(Request $request, Shed $shed)
    {
            
            $data = $request->validate([
                'identification_name' => ['required','string','max:255','unique:sheds,shed_identification_name'],
               
            ]);
            $shed->create([
                'shed_identification_name' => $data['identification_name'],
            
            ]);
            return back()->with([
                "message" => [
                    'type' => 'success',
                    'text' => ' created sucessfully'
                ]
            ]);
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
     * @param  \App\Models\Shed  $shed
     * @return \Illuminate\Http\Response
     */
    public function show(Shed $shed)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Shed  $shed
     * @return \Illuminate\Http\Response
     */
    public function edit(Shed $shed)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Shed  $shed
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Shed $shed)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Shed  $shed
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shed $shed)
    {
        //
    }
}
