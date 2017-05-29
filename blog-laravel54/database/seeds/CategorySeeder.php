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
        'title' => 'List Post',
        'slug' => 'list-post',
        'user_id' => App\User::all()->random()->id,
        'description' => $faker->paragraph(random_int(1,2)),
      ]);
      $categoryRoot1->makeRoot();

          $category1_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'title' => 'Popular',
            'slug' => 'popular',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category1_root1->makeChildOf($categoryRoot1);

          $category2_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'title' => 'Recommand',
            'slug' => 'recommand',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category2_root1->makeChildOf($categoryRoot1);

          $category3_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'title' => 'Outstanding Post',
            'slug' => 'outstanding-post',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category3_root1->makeChildOf($categoryRoot1);

          $category4_root1 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'title' => 'Homepage Post',
            'slug' => 'homepage-post',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category4_root1->makeChildOf($categoryRoot1);
      ////////////////////////////////////////////////////////////////////

      $categoryRoot2 = Category::create([
        'images' => $faker->imageUrl($width = 640, $height = 480),
        'title' => 'List Story',
        'slug' => 'list-story',
        'user_id' => App\User::all()->random()->id,
        'description' => $faker->paragraph(random_int(1,2)),
      ]);
      $categoryRoot2->makeRoot();

          $category1_root2 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'title' => 'Novel',
            'slug' => 'novel',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category1_root2->makeChildOf($categoryRoot2);

          $category2_root2 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'title' => 'Comic',
            'slug' => 'comic',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category2_root2->makeChildOf($categoryRoot1);

          $category3_root2 = Category::create([
            'images' => $faker->imageUrl($width = 640, $height = 480),
            'title' => 'Fact',
            'slug' => 'fact',
            'user_id' => App\User::all()->random()->id,
            'description' => $faker->paragraph(random_int(1,2)),
          ]);
          $category3_root2->makeChildOf($categoryRoot1);

              $category3_1_root2 = Category::create([
                'images' => $faker->imageUrl($width = 640, $height = 480),
                'title' => 'Outstanding story',
                'slug' => 'outstanding',
                'user_id' => 3,
                'description' => $faker->paragraph(random_int(1,2)),
              ]);
              $category3_1_root2->makeChildOf($category3_root2);

              $category3_2_root2 = Category::create([
                'images' => $faker->imageUrl($width = 640, $height = 480),
                'title' => 'Most Viewed Story',
                'slug' => 'most-viewed',
                'user_id' => App\User::all()->random()->id,
                'description' => $faker->paragraph(random_int(1,2)),
              ]);
              $category3_2_root2->makeChildOf($category3_root2);

      ////////////////////////////////////////////////////////////////////

      for ($i = 12; $i <= 164 ; $i++) {
        $categoryRoot3 = Category::create([
          'images' => $faker->imageUrl($width = 640, $height = 480),
          'title' => 'Category '.$i,
          'slug' => 'category-'.$i,
          'description' => $faker->paragraph(random_int(1,2)),
          'user_id' => App\User::all()->random()->id,
        ]);
        $categoryRoot3->makeRoot();
      }
    }
}
