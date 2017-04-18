<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

      $this->app->bind(
       // Blog
        'App\Repositories\Blog\BlogInterface',
        'App\Repositories\Blog\BlogBuilder'
      );
      // Category
      $this->app->bind(
        'App\Repositories\Category\CategoryInterface',
        'App\Repositories\Category\CategoryBuilder'
      );
       // User
      $this->app->bind(
        'App\Repositories\User\UserInterface',
        'App\Repositories\User\UserBuilder'
      );
       // Menu
      $this->app->bind(
        'App\Repositories\Menu\MenuInterface',
        'App\Repositories\Menu\MenuBuilder'
      );

    }
}
