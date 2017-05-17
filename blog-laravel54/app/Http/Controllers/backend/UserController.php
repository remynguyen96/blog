<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Validator;
use Session;
use Mail;
use JWTAuth;
use App\User;

class UserController extends Controller
{
    function userLogin(){
      $validation = Validator::make(request()->all(),[
          'email' => 'required | email',
          'password' => 'required',
      ]);
      if($validation->fails()){
        return response()->json(['errors' => $validation->errors()->toArray()],401);
      }else{
        $credentials = request()->only('email','password');
        try{
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json(['errors' => 'Invalid Credentials'],401);
            }
        }catch(JWTException $e) {
            return response()->json(['errors' => 'Could not create token !'],500);
        }
        return response()->json(['token' => $token],200);
      }
    }

    function userSignUp(){
      $validation = Validator::make(request()->all(),[
          'name' => 'required',
          'phone' => 'required | numeric',
          'email' => 'required | email',
          'password' => 'required | min: 4 | same: confirm_password',
          'confirm_password' => 'required',
      ]);
      if($validation->fails()){
        return response()->json(['errors' => $validation->errors()->toArray()],401);
      }else{
        return response()->json(request()->all(),200);
      }
    }

    function verifiedUsers(){

    }

    function forgotPassword(){

    }

    function updatePassword(){

    }

}
