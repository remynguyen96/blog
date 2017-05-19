<?php
namespace App\Repositories\User;

interface UserInterface{
  function login($email,$password);

  function logout();
}
