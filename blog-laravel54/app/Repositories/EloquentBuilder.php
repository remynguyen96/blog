<?php
namespace App\Repositories;

use DB;

abstract class EloquentBuilder implements InterfaceBuilder{

    // protected $eloquent;
    protected $builder;

    function __construct(){
        $this->setBuilder();
        // $this->setEloquent();
    }
    // abstract protected function getEloquent();

    // protected function setEloquent(){
    //     return $this->eloquent = app()->make($this->getEloquent());
    // }

    abstract protected function getBuilder();

    protected function setBuilder(){
        return $this->builder = DB::table($this->getBuilder());
    }

    function getAll(){
      return $this->builder->orderBy('id','desc')->get();
    }

    function getDetail($typeof,$slug){
        return $this->builder->where($typeof,$slug)->first();
    }

    function create(array $attribute){
        return $this->builder->insert($attribute);
    }

    function edit($typeof,$slug,array $attribute){
        return $this->getDetail($typeof,$slug)->update($attribute);
    }

    function remove($typeof,$slug){
        return $this->getDetail($typeof,$slug)->delete();
        return true;
    }

}
