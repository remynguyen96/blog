<?php

namespace App\Http\Controllers\backend;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Products;
use App\Menu;
use Baum\Node;
use DB;
use Validator;

class MenuController extends Controller {

    function menuIndex(){
        $listPage = DB::table('pages')->get();
        $listProductCategory = DB::table('product_categories')->offset(1)->limit('18446744073709551610')->get();
        $listPostCategory = DB::table('post_categories')->offset(1)->limit('18446744073709551610')->get();
        $listProduct = DB::table('products')->get();
        $listPost = DB::table('posts')->get();
        $listSidebarMenu = [
          ['Danh sách các trang','page',$listPage],
          ['Danh sách category sản phẩm','product-categories',$listProductCategory],
          ['Danh sách category bài viết','post-categories',$listPostCategory],
          ['Danh sách sản phẩm','product-detail',$listProduct],
          ['Danh sách bài viết','post-detail',$listPost],
        ];
        $menuRoot = Menu::roots()->get();
        return response()->json(['listSidebarMenu' => $listSidebarMenu,'menuRoot' => $menuRoot],200);
    }

    function menuChildren(Request $request){
        $menuChildren = $this->DragDropMenu($request->alias);
        return response()->json(['menuChildren' => $menuChildren],200);
    }

    function addMenuRoot(Request $request){
      $data = $request->all();
      $validate = Validator::make($request->all(),[
        'name' => 'required | max:150',
        'alias' => 'required | max:150 | unique:menu',
      ],[
        'name.required' => 'Vui lòng nhập tên menu !',
        'name.max' => 'Tên menu tối đa 150 ký tự !',
        'alias.unique' => 'Tên alias menu đã được sử dụng !',
        'alias.required' => 'Vui lòng nhập alias menu !',
        'alias.max' => 'Tên alias menu tối đa 150 ký tự !',
      ]);

      if($validate->fails()){
        return response()->json(['error' => $validate->errors()->toArray()],202);
      }else{
        $addMenu = new Menu();
        $addMenu->createRoot($data);
        return response()->json(['success' => 'Tạo menu mới thành công !'],200);
      }
    }


    function removeMenuRoot(Request $request){
        $alias = trim($request->alias);
        if($alias){
            $menu = new Menu();
            $menu->removeRoot($alias);
            return response()->json(['success' => 'Xóa menu thành công !'],200);
        }else{
            return response()->json(['errors' => 'Xóa menu thất bại !'],403);
        }
    }

    function editMenuChildren(Request $request){
      $data = $request->all();
      $editMenu = new Menu();
      if($editMenu->validate($data)){
        return $editMenu->validate($data);
      }else{
        $editMenu->editChild($data);
        return response()->json(['success' => 'Cập nhật menu thành công !'],200);
      }
    }

    function removeMenuChildren(Request $request){
      $deleteMenu = new Menu();
      if($request->id){
        $deleteMenu->removeChild($request->id);
        return response()->json(['success' => 'Xóa menu thành công !'],200);
      }else{
        return response()->json(['errors' => 'Xóa menu thất bại !'],202);
      }
    }

    function addMenuChildren(Request $request){
      $menu = new Menu();
      $arrData= [];
      if(is_array($request->data)){
        foreach ($request->data as $item) {
          $addMenuChild = $menu->createChild($item,$request->aliasParent);
          $arrData[] = $addMenuChild;
        }
      }
      return response()->json(['success' => 'Thêm menu thành công !', 'arrData' => $arrData],200);
    }

    public function updateMenu(Request $request){
        $data = $request->data;
        $menu = new Menu();
        if($data){
          $root = $menu->getMenuRoot($request->root);
          $this->handingDataMenu($data,$root);
          return response()->json(['success' => 'Cập nhật menu thành công !'],200);
        }else{
          return response()->json(['errors' => 'Cập nhật menu thất bại !'],202);
        }
    }

    //////////////////////////////////////////////////////////////////
    function handingDataMenu($data,$root){
        $menu = new Menu();
        foreach ($data as $menu1) {
          if(array_key_exists('children',$menu1)){
            $child = $menu->getMenuChild($menu1['id']);
            $child->makeChildOf($root);
            $this->handingDataMenu($menu1['children'],$child);
          }else{
            $child = $menu->getMenuChild($menu1['id']);
            $child->makeChildOf($root);
          }
        }
    }

    function RenderMenu($menu){
     if( $menu->isLeaf() ) {
       $html = '<li class="dd-item" data-id="'.$menu->id.'">';
               $html .= '<div class="dd-handle">';
                   $html .= $menu->name;
               $html .= '</div>';
               $html .= '<a href="#"><i class="fa fa-caret-down" aria-hidden="true"></i></a>';
               $html .= '<div class="content">';
                   $html .= '<div class="form-group name">';
                       $html .= '<i class="fa fa-pencil" aria-hidden="true"></i>';
                       $html .= '<input type="text" id="name" name="name" value="'.$menu->name.'" placeholder="Tên menu">';
                       $html .= '<div class="errors"></div>';
                   $html .= '</div>';
                   $html .= '<div class="form-group alias">';
                       $html .= '<i class="fa fa-share" aria-hidden="true"></i>';
                       $html .= ' <input type="text" id="alias" name="alias" value="'.$menu->alias.'" placeholder="Alias menu">';
                       $html .= '<div class="errors"></div>';
                   $html .= '</div>';
                   $html .= '<div class="handing">';
                       $html .= '<button type="button" class="editMenu">Cập nhật <i class="fa fa-check-square-o" aria-hidden="true"></i></button>';
                       $html .= '<button type="button" class="removeMenu">Xóa <i class="fa fa-window-close-o" aria-hidden="true"></i></button>';
                   $html .= '</div>';
               $html .= '</div>';
         $html .= '</li>';
     } else {
         $html = '<li class="dd-item" data-id="'.$menu->id.'">';
                 $html .= '<div class="dd-handle">';
                     $html .= $menu->name;
                 $html .= '</div>';
                 $html .= '<a href="#"><i class="fa fa-caret-down" aria-hidden="true"></i></a>';
                 $html .= '<div class="content">';
                     $html .= '<div class="form-group name">';
                         $html .= '<i class="fa fa-pencil" aria-hidden="true"></i>';
                         $html .= '<input type="text" id="name" name="name" value="'.$menu->name.'" placeholder="Tên menu">';
                         $html .= '<div class="errors"></div>';
                     $html .= '</div>';
                     $html .= '<div class="form-group alias">';
                         $html .= '<i class="fa fa-share" aria-hidden="true"></i>';
                         $html .= ' <input type="text" id="alias" name="alias" value="'.$menu->alias.'" placeholder="Alias menu">';
                         $html .= '<div class="errors"></div>';
                     $html .= '</div>';
                     $html .= '<div class="handing">';
                         $html .= '<button type="button" class="editMenu">Cập nhật <i class="fa fa-check-square-o" aria-hidden="true"></i></button>';
                         $html .= '<button type="button" class="removeMenu">Xóa <i class="fa fa-window-close-o" aria-hidden="true"></i></button>';
                     $html .= '</div>';
                 $html .= '</div>';
              $html .= '<ul class="dd-list">';
                 foreach($menu->children as $child){
                   $html .= $this->RenderMenu($child);
              }
              $html .= '</ul>';
          $html .= '</li>';
      }
    return $html;
    }

    function DragDropMenu($alias){
      if($alias){
        $menuChildren1 = Menu::where('alias',$alias)->where('parent_id',null)->first()->children()->get();
        $html = '<div class="dd menuDragDrop">';
          $html .= '<ul class="dd-list">';
            foreach ($menuChildren1 as $node) {
                $html .= $this->RenderMenu($node);
            }
          $html .= '</ul>';
        $html .= "</div>";
        return $html;
      }else{
          return "Don't have menu !";
      }
    }



    public function getAll(){

    }

    public function getItem($slug){

    }

    public function createItem(){

    }

    public function editItem($slug){

    }

    public function removeItem($slug){

    }

}
