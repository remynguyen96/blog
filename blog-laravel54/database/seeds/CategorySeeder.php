<?php

use Illuminate\Database\Seeder;
use App\Category;
use Faker\Factory as Faker;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker::create(Category::class);
      Category::truncate();

      $categoryRoot1 = Category::create([
        'images' => $faker->imageUrl($width = 640, $height = 480),
        'name' => 'List Post',
        'slug' => 'list-post',
        'user_id' => App\User::all()->random()->id,
        'description' => $faker->paragraph(random_int(1,2)),
      ]);
      $categoryRoot1->makeRoot();

          $category1_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'name' => 'Popular',
            'slug' => 'popular',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category1_root1->makeChildOf($categoryRoot1);

          $category2_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'name' => 'Recommand',
            'slug' => 'recommand',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category2_root1->makeChildOf($categoryRoot1);

          $category3_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'name' => 'Outstanding Post',
            'slug' => 'outstanding-post',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category3_root1->makeChildOf($categoryRoot1);

          $category4_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'name' => 'Homepage Post',
            'slug' => 'homepage-post',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category4_root1->makeChildOf($categoryRoot1);
      ////////////////////////////////////////////////////////////////////

      $categoryRoot2 = Category::create([
        'images' => $faker->imageUrl($width = 640, $height = 480),
        'name' => 'List Story',
        'slug' => 'list-story',
        'user_id' => App\User::all()->random()->id,
        'description' => $faker->paragraph(random_int(1,2)),
      ]);
      $categoryRoot2->makeRoot();

          $category1_root2 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'name' => 'Novel',
            'slug' => 'novel',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category1_root2->makeChildOf($categoryRoot2);

          $category2_root2 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'name' => 'Comic',
            'slug' => 'comic',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category2_root2->makeChildOf($categoryRoot1);

          $category3_root2 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'name' => 'Fact',
            'slug' => 'fact',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category3_root2->makeChildOf($categoryRoot1);

              $category3_1_root2 = Category::create([
                'images' => $faker->imageUrl($width = 640, $height = 480),
                'name' => 'Outstanding story',
                'slug' => 'outstanding',
                'user_id' => 3,
                'description' => $faker->paragraph(random_int(1,2)),
              ]);
              $category3_1_root2->makeChildOf($category3_root2);

              $category3_2_root2 = Category::create([
                'images' => $faker->imageUrl($width = 640, $height = 480),
                'name' => 'Most Viewed Story',
                'slug' => 'most-viewed',
                'user_id' => App\User::all()->random()->id,
                'description' => $faker->paragraph(random_int(1,2)),
              ]);
              $category3_2_root2->makeChildOf($category3_root2);

      ////////////////////////////////////////////////////////////////////
    }
}
