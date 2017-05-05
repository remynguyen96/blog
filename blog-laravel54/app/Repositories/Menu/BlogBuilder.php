<?php
namespace App\Repositories\Menu;

use App\Repositories\EloquentBuilder;

class MenuBuilder extends EloquentBuilder implements MenuInterface{

  protected function getBuilder(){
    return 'menus';
  }



}
