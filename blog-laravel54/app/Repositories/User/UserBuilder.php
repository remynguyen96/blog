<?php
namespace App\Repositories\User;
use App\Repositories\EloquentBuilder;
class UserBuilder extends EloquentBuilder implements UserInterface{

  protected function getBuilder(){
    return 'users';
  }

  function login($email,$password){

  }

  function logout(){

  }

}
