<?php
namespace App\Repositories\User;

interface UserInterface{
  public function login($email,$password);

  public function register(array $params);

  public function logout($url);
}
