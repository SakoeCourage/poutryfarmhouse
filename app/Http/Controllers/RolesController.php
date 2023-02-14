<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesController extends Controller
{
    public function index(){
        return(
            ['roles' => Role::latest()->paginate(10)]
        );
    }

    public function RolesToSelect(){
        return(
            ['roles' => Role::get(['id', 'name'])->except('1')]
        );
    }

    public function create(Request $request){
        $data = $request->validate([
            'name' => ['required','string','max:255','unique:roles,name']
        ]);
         Role::create($data);
         return redirect()->back()->with([
            'message' =>[
                'type' => 'sucess',
                'text' => 'new role added'
            ]
            ]);
    }

    public function permissionToSelect(){
        return ([
            'permissions' => \Spatie\Permission\Models\Permission::all()
        ]);
    }

    public function getPermissionFromRoleName($rolename){
        return [
            'rolePermissions' => Role::findByName($rolename)->permissions()->get(['name'])->pluck('name'),
            'permissions' => Permission::orderBy('created_at')->get(['name'])->pluck('name')
        ];
    }

    public function applyNewPermissions(Request $request){
       return Role::findByName($request->roleName)->syncPermissions($request->permissions);
    }
}
