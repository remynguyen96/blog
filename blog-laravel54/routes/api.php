<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/test',function(Request $request){

  $token = JWTAuth::getToken();
  $user = JWTAuth::toUser($token);
  return $user;

})->middleware('jwt.auth');


Route::post('/authenticate',[
  'uses' => 'ApiAuthController@authenticate',
]);

Route::post('/sign-up',[
'uses' => 'ApiAuthController@signUp',
]);

Route::get('/get-all',[
'uses' => 'ApiAuthController@getAll',
]);


// Route::group(['middleware' => 'jwt.auth'],function(){

  /**
    * Task: handing/users
    * Author: Remy Nguyen
    * Date created: 2017/05/16 16:05 PM
    * @return Users
    */
  Route::post('login',[
    'uses' => 'backend\UserController@userLogin',
    'as' => 'user.login.backend',
  ]);
  Route::post('sign-up',[
    'uses' => 'backend\UserController@userSignUp',
    'as' => 'user.register.backend',
  ]);
  Route::post('verified-users',[
    'uses' => 'backend\UserController@verifiedUsers',
    'as' => 'user.verified',
  ]);
  Route::post('forgot-password',[
    'uses' => 'backend\UserController@forgotPassword',
    'as' => 'user.forgot.password',
  ]);
  Route::put('update-password',[
    'uses' => 'backend\UserController@updatePassword',
    'as' => 'user.update.password',
  ]);
  /**
    * Task: handing/blogs
    * Author: Remy Nguyen
    * Date created: 2017/05/16 16:05 PM
    * @return Users
    */
  Route::get('blogs/news',[
    'uses' => 'backend\BlogController@infiniteScroller',
    'as' => 'blogs.infinite.scroller',
  ]);
  Route::get('blogs/get-all',[
    'uses' => 'backend\BlogController@getAll',
    'as' => 'get.all.blogs',
  ]);
  Route::post('blogs/get-all-next',[
    'uses' => 'backend\BlogController@getAllNext',
    'as' => 'get.all.blogs.next',
  ]);
  Route::post('blogs/get-item/{slug}',[
    'uses' => 'backend\BlogController@getItem',
    'as' => 'get.item.blogs',
  ])->where('slug','[a-z0-9-]+');
  Route::post('blogs/create-item',[
    'uses' => 'backend\BlogController@createItem',
    'as' => 'create.item.blogs',
  ]);
  Route::put('blogs/edit-item/{slug}',[
    'uses' => 'backend\BlogController@editItem',
    'as' => 'edit.item.blogs',
  ])->where('slug','[a-z0-9-]+');
  Route::delete('blogs/remove-item/{slug}',[
    'uses' => 'backend\BlogController@removeItem',
    'as' => 'remove.item.blogs',
  ])->where('slug','[a-z0-9-]+');
  /**
    * Task: handing/category
    * Author: Remy Nguyen
    * Date created: 2017/05/16 16:05 PM
    * @return Category
    */
  Route::get('categories/get-all',[
    'uses' => 'backend\CategoryController@getAll',
    'as' => 'get.all.categories',
  ]);
  Route::post('categories/get-item/{slug}',[
    'uses' => 'backend\CategoryController@getItem',
    'as' => 'get.item.categories',
  ])->where('slug','[a-z0-9-]+');
  Route::post('categories/create-item',[
    'uses' => 'backend\CategoryController@createItem',
    'as' => 'create.item.categories',
  ]);
  Route::put('categories/edit-item/{slug}',[
    'uses' => 'backend\CategoryController@editItem',
    'as' => 'edit.item.categories',
  ])->where('slug','[a-z0-9-]+');
  Route::delete('categories/remove-item/{slug}',[
    'uses' => 'backend\CategoryController@removeItem',
    'as' => 'remove.item.categories',
  ])->where('slug','[a-z0-9-]+');
  /**
    * Task: handing/menu
    * Author: Remy Nguyen
    * Date created: 2017/05/16 16:05 PM
    * @return Menu
    */
  Route::get('menus/get-all',[
    'uses' => 'backend\MenuController@getAll',
    'as' => 'get.all.menus',
  ]);
  Route::post('menus/get-item/{slug}',[
    'uses' => 'backend\MenuController@getItem',
    'as' => 'get.item.menus',
  ])->where('slug','[a-z0-9-]+');
  Route::post('menus/create-item',[
    'uses' => 'backend\MenuController@createItem',
    'as' => 'create.item.menus',
  ]);
  Route::put('menus/edit-item/{slug}',[
    'uses' => 'backend\MenuController@editItem',
    'as' => 'edit.item.menus',
  ])->where('slug','[a-z0-9-]+');
  Route::delete('menus/remove-item/{slug}',[
    'uses' => 'backend\MenuController@removeItem',
    'as' => 'remove.item.menus',
  ])->where('slug','[a-z0-9-]+');
  /**
    * Task: handing/settings
    * Author: Remy Nguyen
    * Date created: 2017/05/16 16:05 PM
    * @return Settings
    */
  Route::get('settings/get-all',[
    'uses' => 'backend\SettingController@getAll',
    'as' => 'get.all.settings',
  ]);
  Route::post('settings/get-item/{slug}',[
    'uses' => 'backend\SettingController@getItem',
    'as' => 'get.item.settings',
  ])->where('slug','[a-z0-9-]+');
  Route::post('settings/create-item',[
    'uses' => 'backend\SettingController@createItem',
    'as' => 'create.item.settings',
  ]);
  Route::put('settings/edit-item/{slug}',[
    'uses' => 'backend\SettingController@editItem',
    'as' => 'edit.item.settings',
  ])->where('slug','[a-z0-9-]+');
  Route::delete('settings/remove-item/{slug}',[
    'uses' => 'backend\SettingController@removeItem',
    'as' => 'remove.item.settings',
  ])->where('slug','[a-z0-9-]+');

// });
