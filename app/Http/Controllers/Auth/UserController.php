<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Userprofile;



class UserController extends Controller
{
    //


    public function index(User $user){
        return Inertia('Usermanagement/Allusers',[
            'users' =>fn ()=> $user->filter(request()->only('sort','search'))
                ->latest()->paginate(10)
                ->withQueryString()
                -> through(fn($cuser)=>[
                    'id'=> $cuser->id,
                    'date_created' => $cuser->created_at,
                    'email' => $cuser->email,
                    'name' => $cuser->name,
                    'profile' => $cuser->profile,
                    'permissions' => $cuser->getAllPermissions()->pluck('name'),
                    'role' => $cuser->getRoleNames()
                    ]),
                'filters' => request()->only('sort','search'),
        ]);
    }
    


    public function showcreateuserform(){
        return Inertia('Usermanagement/Createuser');
    }



    public function create(User $user, Userprofile $profile)
    {
      
        $data = request()->validate([
            'name' => ['required', 'string', 'min:8', 'max:255','unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'usedefault' => ['required'],
            'password' => ['required_if:usedefault,0', 'max:255'],
            'firstname' => ['required', 'string','min:2', 'max:255'],
            'lastname' => ['required', 'string','min:2', 'max:255'],
            'contact' => ['required', 'numeric','min:9'],
            'location' => ['max:255'],
            'identification_number' => ['max:255'],
            'jobposition' => ['required', 'string','max:255'],
            'role' => ['required', 'string','max:255']
        ]);
            
        DB::transaction(function () use ($data, $user, $profile) {
            // creating new using
            $newuser = $user->create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password'] ?? 'poultryfarmhouse@'),
            ]);

             // assign role to user
             $newuser->assignRole($data['role']);

            // adding meta data to profile table
            $profile->create([
                'user_id' => $newuser->id,
                'firstname' => $data['firstname'],
                'lastname' => $data['lastname'],
                'contact' => $data['contact'],
                'location' => $data['location'],
                'jobposition' => $data['jobposition'],
                'identification_number' => $data['identification_number']

            ]);
        
        });
        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => 'user created succesfully'
            ]

        ]);
    }
}
