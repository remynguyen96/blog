<?php
namespace App\Repositories\User;
use App\Repositories\EloquentBuilder;

class UserBuilder extends EloquentBuilder implements UserInterface{

  protected function getBuilder(){
    return 'users';
  }

  public function login($email,$password){

  }

  public function register(array $params){

  }

  public function logout($url){

  }


}
