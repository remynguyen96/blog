<?php

namespace App;
use Baum\Node;
use Illuminate\Database\Eloquent\Model;
use DB;
class Category extends Node
{
  protected $table = 'categories';

  protected $fillable = ['name','slug','images','description','user_id','parent_id','lft','rgt','depth'];

  public $timestamps = true;

  public function user(){
    return $this->belongsTo(User::class);
  }

  public function blogs(){
    return $this->belongsToMany(Blog::class,'category_blog','category_id','blog_id');
  }


}
