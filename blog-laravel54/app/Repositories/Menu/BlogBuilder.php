<?php
namespace App\Repositories\Menu;

use App\Repositories\EloquentBuilder;

class MenuBuilder extends EloquentBuilder implements MenuInterface{

  protected function getEloquent(){
    return \App\Menu::class;
  }

  protected function getBuilder(){
    return 'menus';
  }



}
