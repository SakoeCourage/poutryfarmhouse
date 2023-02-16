<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Models\Permission;
use Symfony\Component\HttpKernel\Profiler\Profile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function issuedtoday(){
        return $this->hasMany(Expense::class)->whereDate('created_at',Carbon::today());
    }
    public function profile(){
        return $this->hasOne(Userprofile::class);
    }

    public function jobpostion(){
        return $this->hasOneThrough(Jobposition::class, Userprofile::class);
    }

    public function scopeFilter($query, array $filters){
        $query->when($filters['search'] ?? false, function($query, $search){
            $query->where('name', 'Like', '%' . $search . '%')
            ->orwhere('email', 'Like', '%' . $search . '%');
        })->when($filters['sort'] ?? false, function($query,$sort){
            if($sort === 'created_asc'){
                $query->orderBy('created_at','asc');
            }else if($sort === 'created_desc'){
                $query->orderBy('created_at','desc') ;
            }
    });
    }
    public function expenses(){
        return $this->hasMany(Expense::class,'user_id');
    }

    static function getUsersWhoCan($permission){
        $p = Permission::findByName($permission);
        $roles = $p->roles->pluck('name');
        $roles[] = 'Super Admin';
        $users = User::whereHas('roles', function ($query) use ($roles) {
            $query->whereIn('name', $roles);
        });
        return $users;
    }


}
