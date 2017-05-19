<?php

namespace App;

use Baum\Node;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use DB;
use Validator;

class Menu extends Node {

  /**
   * Table name.
   *
   * @var string
   */
  protected $table = 'menus';

  protected $fillable = ['parent_id','lft','rgt','depth','name','slug'];

  public $timestamps = true;

  public function createRoot(array $data){
      $menu = self::create($data);
      return $menu->makeRoot();
  }

  public function removeRoot($slug){
    $root = self::where('alias',$slug)->where('parent_id',null)->first();
    $root->children()->delete();
    $root->delete();
  }

  public function getMenuRoot($slug){
    return self::where('alias',$slug)->where('parent_id',null)->first();
  }

  public function getMenuChild($id){
    return self::where('id',$id)->first();
  }

  public function validate(array $data){
    $validate = Validator::make($data,[
        'name' => 'required | max:150',
        'alias' => 'required | max:150',
    ],[
        'name.required' => 'Vui lòng nhập tên menu !',
        'name.max' => 'Tên menu tối đa 150 ký tự !',
        'alias.required' => 'Vui lòng nhập alias menu !',
        'alias.max' => 'Tên alias menu tối đa 150 ký tự !',
    ]);
    if($validate->fails()){
        return response()->json(['errors' => $validate->errors()->toArray()],202);
    }
  }

  public function createChild(array $data,$slug){
    $parent = $this->getMenuRoot($slug);
    $createMenu = self::create($data);
    return $createMenu->makeChildOf($parent);
  }

  public function editChild(array $data){
    return self::findOrFail($data['id'])->update($data);
  }

  public function removeChild($id){
    return self::findOrFail($id)->delete();
  }


}
