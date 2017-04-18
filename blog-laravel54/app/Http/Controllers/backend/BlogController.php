<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Blog;
use App\Repositories\Blog\BlogInterface;
class BlogController extends Controller
{
    protected $blogService;
    public function __construct(BlogInterface $BlogInterface){
      $this->blogService = $BlogInterface;
    }


    public function getAll(){
      // $blog = Blog::orderBy('id','desc')->limit(2)->with('category')->with('user')->get();
      $data = $this->blogService->getAll();
      return response()->json($data,200);
    }

    public function getItem($slug){
      $data = $this->blogService->getDetail('slug',$slug);
      return response()->json($data,200);
    }

    public function createItem(){

    }

    public function editItem($slug){

    }

    public function removeItem($slug){

    }

    public function getAllNext(){
      $count = request()->totalBlogCurrent;
      $blog = Blog::orderBy('id','desc')->offset($count)->limit(2)->with('category')->with('user')->get();
      $totalBlog = Blog::all()->count();
      if($count + 2 >= $totalBlog) {
        return response()->json(['last' => $blog],200);
      }else{
        return response()->json(['next' => $blog],200);
      }
    }
}
