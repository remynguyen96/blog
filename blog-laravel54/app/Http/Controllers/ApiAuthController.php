<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Auth;
use App\User;
use Validator;
use DB;
class ApiAuthController extends Controller
{

    public function authenticate(){
      $validation = Validator::make(request()->all(),[
          'email' => 'required | email',
          'password' => 'required',
      ]);
      if($validation->fails()){
          return response()->json(['errors' => $validation->errors()->toArray()],401);
      }else{
        $credentials = request()->only('email','password');
        try {
          $token = JWTAuth::attempt($credentials);
          if(!$token){
            return response()->json(['error' => 'invalid_credentials'],401);
          }
        } catch (JWTException $e) {
          return response()->json(['error' => 'Something went wrong. Could not create token !'],500);
        }
        return response()->json(['token' => $token],200);
      }
    }

    public function signUp(){
      $user  = User::create([
        'name' => request()->name,
        'email' => request()->email,
        'password' => bcrypt(request()->password),
        'phone' => request()->phone,
      ]);
      $token = JWTAuth::fromUser($user);
      return response()->json(['token',$token],200);

    }

    public function uploadFile(){
      if(request()->hasFile('files')){
        $file = request()->file('files');
        $name = $file->getClientOriginalName();
        $save = $file->move('images',$name);
        return response()->json(['success' => 'ok !'],200);
      }
    }
}
