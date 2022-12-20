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
                'sheds' => Shed::paginate(10)
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
                'identification_name' => ['required','string','max:255'],
                'number_of_flocks' => ['nullable','numeric']
            ]);
            $shed->create([
                'shed_identification_name' => $data['identification_name'],
                'number_of_flocks' => $data['number_of_flocks']
            ]);
            return back()->with([
                "message" => [
                    'type' => 'success',
                    'text' => ' done'
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
