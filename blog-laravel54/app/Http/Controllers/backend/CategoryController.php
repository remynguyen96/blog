<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Category\CategoryInterface;

class CategoryController extends Controller
{
  private $_category;

  public function __construct(CategoryInterface $categoryInterface){
    $this->_category = $categoryInterface;
  }

  public function getAll(){
      return $this->_category->getAll();
  }

  public function getItem($slug){

  }

  public function createItem(){
    $category = \App\Category::create([
      'name' => request()->title,
      'slug' => request()->title,
      'user_id' => 3,
      'description' => 'nothing much',
    ]);
    $category->makeRoot();
    return response()->json(['success' => 'good job !'],200);
  }

  public function editItem($slug){

  }

  public function removeItem($slug){
    $delete = \App\Category::where('id',$slug)->first()->delete();
    return response()->json(['success' => 'good job !'],200);
  }

}
