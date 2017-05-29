<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Category\CategoryInterface;

class CategoryController extends Controller
{
  private $_category;

  function __construct(CategoryInterface $categoryInterface){
    $this->_category = $categoryInterface;
  }

  function getAll(){
      return $this->_category->getAll();
  }

  function getItem($slug){

  }

  function createItem(){
    $category = \App\Category::create([
      'name' => request()->title,
      'slug' => request()->title,
      'user_id' => 3,
      'description' => 'nothing much',
    ]);
    $category->makeRoot();
    return response()->json(['success' => 'good job !'],200);
  }

  function editItem($slug){

  }

  function removeItem($slug){
    $delete = \App\Category::where('id',$slug)->first()->delete();
    return response()->json(['success' => 'good job !'],200);
  }

  function categoryPagination(){
    $category = \App\Category::orderBy('id','desc')->paginate(10);
    return response()->json($category,200);
  }

}
