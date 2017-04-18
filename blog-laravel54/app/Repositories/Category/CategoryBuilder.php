<?php
namespace App\Repositories\Category;

use App\Repositories\EloquentBuilder;

class CategoryBuilder extends EloquentBuilder implements CategoryInterface {

  protected function getEloquent(){
    return \App\Category::class;
  }

  protected function getBuilder(){
    return 'categories';
  }

  public function categoryPublished(){
    return $this->builder->where('status',1)->get();
  }

  public function categoryHidden(){
    return $this->builder->where('status',0)->get();
  }

}
