<?php

namespace App;
use Baum\Node;
use Illuminate\Database\Eloquent\Model;
use DB;
class Blog extends Node
{
  protected $table = 'blogs';

  protected $fillable = ['title','slug','images','excerpt','description','status'];
  // protected $fillable = ['title','slug','images','excerpt','description','status','parent_id','lft','rgt','depth'];

  public $timestamps = true;

  public function user(){
    return $this->belongsTo(User::class);
  }

  public function category(){
    return $this->belongsToMany(Category::class,'category_blog','blog_id','category_id');
  }

  public function favoriteUser(){
    return $this->belongsToMany(User::class,'favorite_blogs','blog_id','user_id');
  }

  // connect controller for backend


  // connect controller for fronend


}
