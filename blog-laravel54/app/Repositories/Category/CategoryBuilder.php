<?php
namespace App\Repositories\Category;

use App\Repositories\EloquentBuilder;

class CategoryBuilder extends EloquentBuilder implements CategoryInterface {

  protected function getBuilder(){
    return 'categories';
  }

  function categoryPublished(){
    return $this->builder->where('status',1)->get();
  }

  function categoryHidden(){
    return $this->builder->where('status',0)->get();
  }

}
