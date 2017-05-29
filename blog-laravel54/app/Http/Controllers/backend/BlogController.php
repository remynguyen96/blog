<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Blog\BlogInterface;

class BlogController extends Controller
{
    protected $blogService;

    function __construct(BlogInterface $BlogInterface){
      $this->blogService = $BlogInterface;
    }

    function getAll(){
      // $blog = Blog::orderBy('id','desc')->limit(2)->with('category')->with('user')->get();
      $data = $this->blogService->getAll();
      return response()->json($data,200);
    }

    function getItem($slug){
      $data = $this->blogService->getDetail('slug',$slug);
      return response()->json($data,200);
    }

    function createItem(){

    }

    function editItem($slug){

    }

    function removeItem($slug){

    }

    function infiniteScroller(){
      $blog = \App\Blog::orderBy('id','desc')->paginate(10);
      return response()->json($blog,200);
    }
}
