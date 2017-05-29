<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Validator;
use Session;
use Mail;
use App\Mail\ConfirmRegister;
use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;
use App\User;
use App\Repositories\User\UserInterface;

class UserController extends Controller
{
    protected $member;

    function __construct(UserInterface $userInterface){
      $this->member = $userInterface;
    }

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
        $infomationUser = (new User)->where('email',request()->email)->with('profile')->with('roles')->first();
        return response()->json(['token' => $token, 'user' => $infomationUser],200);
      }
    }

    function userSignUp(){
      // $password = request()->password;
      // $password_confirm = request()->password_confirm;
      // return response()->json([$password,$password_confirm],200);
      $validation = Validator::make(request()->all(),[
          'name' => 'required',
          'email' => 'required | email | unique:users',
          'password_confirm' => 'required',
          'password' => 'required',
          // 'password' => 'required | min: 4 | same:password_confirm',
      ]);
      if($validation->fails()){
        return response()->json(['errors' => $validation->errors()->toArray()]);
      }else{
        $arrUser = request()->all();
        $arrUser['password'] =  bcrypt($arrUser['password']);
        $arrUser['remember_token'] =  $arrUser['_token'];
        unset($arrUser['_token']);
        unset($arrUser['password_confirm']);
        User::create($arrUser);
        $arrUser['url'] = "http://localhost:4200/auth/login?token={$arrUser['remember_token']}";
        Mail::to($arrUser['email'])->send(new ConfirmRegister($arrUser));
        return response()->json(['status' => 1],200);
      }
    }

    function mailTest(){
      // Mail::to(Auth::user()->email)->send(new ConfirmMember());
      $member = [
        'email' => 'test@gmail.com',
        'name' => 'Remy Nguyen',
        'url' => 'http://localhost:4200/auth/login',
      ];
      Mail::to($member['email'])->send(new ConfirmRegister($member));
      return redirect('/');
    }

    function verifiedUsers(){

    }

    function forgotPassword(){

    }

    function updatePassword(){

    }

    function profileUser($id){
        $infomationUser = (new User)->where('id',$id)->with('profile')->with('roles')->first();
        return response()->json($infomationUser,200);
    }

    function updateProfile($id){
      $infomationUser = (new User)->where('id',$id)->first();
      return response()->json($id,200);
    }

    /**
    * Decrypt data from a CryptoJS json encoding string
    *
    * @param mixed $passphrase
    * @param mixed $jsonString
    * @return mixed
    */
    function cryptoJsAesDecrypt($passphrase, $jsonString)
    {
      $jsondata = json_decode($jsonString, true);
      try {
          $salt = hex2bin($jsondata["s"]);
          $iv  = hex2bin($jsondata["iv"]);
      } catch(Exception $e) { return null; }
      $ct = base64_decode($jsondata["ct"]);
      $concatedPassphrase = $passphrase.$salt;
      $md5 = array();
      $md5[0] = md5($concatedPassphrase, true);
      $result = $md5[0];
      for ($i = 1; $i < 3; $i++) {
          $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
          $result .= $md5[$i];
      }
      $key = substr($result, 0, 32);
      $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
      return json_decode($data, true);
    }

    /**
    * Encrypt value to a cryptojs compatiable json encoding string
    *
    * @param mixed $passphrase
    * @param mixed $value
    * @return string
    */
    function cryptoJsAesEncrypt($passphrase, $value){
      $salt = openssl_random_pseudo_bytes(8);
      $salted = '';
      $dx = '';
      while (strlen($salted) < 48) {
           $dx = md5($dx.$passphrase.$salt, true);
           $salted .= $dx;
      }
      $key = substr($salted, 0, 32);
      $iv  = substr($salted, 32,16);
      $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
      $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
      return json_encode($data);
    }

}
