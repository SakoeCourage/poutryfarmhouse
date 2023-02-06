<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function __construct()
    {   
        $this->middleware('auth');
    }
    public function index(){

    }

    public function getUnreadNotificationCount(){
        return Auth::user()->unreadNotifications()->count();
    }
    public function getUnreadNotification(){
        return Auth::user()->Notifications()->paginate(10);
    }

    public function markAsRead(){
        Auth::user()->unreadNotifications->markAsRead();
        return Self::getUnreadNotificationCount();
    }


}
