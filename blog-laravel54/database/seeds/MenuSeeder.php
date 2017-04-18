<?php

use Illuminate\Database\Seeder;
use App\Menu;
class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $menu_root  = Menu::create([
          'name' => 'Menu 1',
          'slug' => 'menu-1',
      ]);
      $menu_root->makeRoot();

          $menu_0  = Menu::create([
              'name' => 'Homepage',
              'slug' => 'homepage',
          ]);
          $menu_0->makeChildOf($menu_root);

          $menu_1  = Menu::create([
              'name' => 'Black Jack',
              'slug' => 'black-jack',
          ]);
          $menu_1->makeChildOf($menu_root);

                $menu_1_2  = Menu::create([
                    'name' => 'Black Jack 1',
                    'slug' => 'black-jack-1',
                ]);
                $menu_1_2->makeChildOf($menu_1);

                $menu_1_3  = Menu::create([
                    'name' => 'Black Jack 2',
                    'slug' => 'black-jack-2',
                ]);
                $menu_1_3->makeChildOf($menu_1);

                $menu_1_4  = Menu::create([
                    'name' => 'Black Jack 3',
                    'slug' => 'black-jack-3',
                ]);
                $menu_1_4->makeChildOf($menu_1);


                $menu_1_5  = Menu::create([
                    'name' => 'Black Jack 4',
                    'slug' => 'black-jack-4',
                ]);
                $menu_1_5->makeChildOf($menu_1);

                $menu_1_6  = Menu::create([
                    'name' => 'Black Jack 5',
                    'slug' => 'black-jack-5',
                ]);
                $menu_1_6->makeChildOf($menu_1);

      $menu_2  = Menu::create([
          'name' => 'categories',
          'slug' => 'categories',
      ]);
      $menu_2->makeChildOf($menu_root);

          $menu_2_2  = Menu::create([
              'name' => 'Popular',
              'slug' => 'popular',
          ]);
          $menu_2_2->makeChildOf($menu_2);

          $menu_2_3  = Menu::create([
              'name' => 'Recommand',
              'slug' => 'recommand',
          ]);
          $menu_2_3->makeChildOf($menu_2);

          $menu_2_4  = Menu::create([
              'name' => 'Outstanding Post',
              'slug' => 'outstanding-post',
          ]);
          $menu_2_4->makeChildOf($menu_2);

          $menu_2_5 = Menu::create([
              'name' => 'Homepage Post',
              'slug' => 'homepage-post',
          ]);
          $menu_2_5->makeChildOf($menu_2);

          $menu_2_6 = Menu::create([
              'name' => 'List Story',
              'slug' => 'list-story',
          ]);
          $menu_2_6->makeChildOf($menu_2);

          $menu_2_7 = Menu::create([
              'name' => 'Novel',
              'slug' => 'novel',
          ]);
          $menu_2_7->makeChildOf($menu_2);

          $menu_2_8 = Menu::create([
              'name' => 'Comic',
              'slug' => 'comic',
          ]);
          $menu_2_8->makeChildOf($menu_2);

          $menu_2_9 = Menu::create([
              'name' => 'Fact',
              'slug' => 'fact',
          ]);
          $menu_2_9->makeChildOf($menu_2);

          $menu_2_10 = Menu::create([
              'name' => 'Outstanding story',
              'slug' => 'outstanding',
          ]);
          $menu_2_10->makeChildOf($menu_2);

          $menu_2_11 = Menu::create([
              'name' => 'Most Viewed Story',
              'slug' => 'most-viewed',
          ]);
          $menu_2_11->makeChildOf($menu_2);
      //////////////////////////////////////////////////////////////////////////////

      $menu_root2  = Menu::create([
          'name' => 'Menu 2',
          'slug' => 'menu-2',
      ]);
      $menu_root2->makeRoot();

          $menu_3  = Menu::create([
              'name' => 'About me',
              'slug' => 'about-me',
          ]);
          $menu_3->makeChildOf($menu_root2);

          $menu_4  = Menu::create([
              'name' => 'Tip',
              'slug' => 'tip',
          ]);
          $menu_4->makeChildOf($menu_root2);

          $menu_4  = Menu::create([
              'name' => 'course',
              'slug' => 'course',
          ]);
          $menu_4->makeChildOf($menu_root2);

          $menu_5  = Menu::create([
              'name' => 'Account',
              'slug' => 'account',
          ]);
          $menu_5->makeChildOf($menu_root2);

              $menu_5_1  = Menu::create([
                  'name' => 'Login',
                  'slug' => 'login',
              ]);
              $menu_5_1->makeChildOf($menu_5);

              $menu_5_2  = Menu::create([
                  'name' => 'Sign Up',
                  'slug' => 'sign-up',
              ]);
              $menu_5_2->makeChildOf($menu_5);

    }
}
