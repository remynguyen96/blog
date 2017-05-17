<?php
namespace App\Repositories\User;

interface UserInterface{
  function login($email,$password);

  function register(array $params);

  function logout($url);
}
