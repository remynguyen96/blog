<?php
namespace App\Repositories\Blog;
use App\Repositories\EloquentBuilder;

class BlogBuilder extends EloquentBuilder implements BlogInterface{

  // protected function getEloquent(){
  //   return \App\Blog::class;
  // }

  protected function getBuilder(){
    return 'blogs';
  }

  public function blogPrivate(){
    return $this->builder->where('status',0)->get();
  }


}
