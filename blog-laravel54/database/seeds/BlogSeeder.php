<?php

use Illuminate\Database\Seeder;
use App\Blog;
use App\Category;
use Faker\Factory as Faker;
class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker::create(Category::class);
      Blog::truncate();
      $category_popular = Category::where('slug','popular')->first();
      $category_recommand = Category::where('slug','recommand')->first();
      $category_outstanding = Category::where('slug','outstanding')->first();
      $category_homepage = Category::where('slug','homepage')->first();
      $category_story = Category::where('slug','list-story')->first();
      $category_story_novel = Category::where('slug','novel')->first();
      $category_story_comic = Category::where('slug','comic')->first();
      $category_story_fact = Category::where('slug','fact')->first();
      $category_story_fact_1 = Category::where('slug','outstanding')->first();
      $category_story_fact_2 = Category::where('slug','most-viewed')->first();
      $arrImage = [
        'background1.jpg',
        'background2.jpg',
        'background3.jpg',
        'background4.jpg',
      ];
      // $faker->imageUrl($width = 640, $height = 480),
      // $faker->imageUrl($width = 620, $height = 460),
      // $faker->imageUrl($width = 600, $height = 440),
      $BlogRoot1 = Blog::create([
        'images' => 'background1.jpg',
        'library_images' => json_encode($arrImage),
        'title' => 'Post 1',
        'slug' => 'post-1',
        'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
        'excerpt' => $faker->text(200),
        'user_id' => App\User::all()->random()->id,
        'created_at' => \Carbon\Carbon::now(),
        'updated_at' => \Carbon\Carbon::now()
      ]);
      $BlogRoot1->makeRoot();
      $BlogRoot1->category()->attach($category_popular);
      ////////////////////////////////////////////////////
      $BlogRoot2 = Blog::create([
        'images' => 'background2.jpg',
        'library_images' => json_encode($arrImage),
        'title' => 'Black Jack',
        'slug' => 'black-jack',
        'description' => $faker->realText($maxNbChars = 3000, $indexSize = 5),
        'excerpt' => $faker->text(200),
        'user_id' => App\User::all()->random()->id,
      ]);
      $BlogRoot2->makeRoot();
      $BlogRoot2->category()->attach($category_story_fact);
      $BlogRoot2->category()->attach($category_story_fact_1);

          $BlogRoot2_1 = Blog::create([
            'images' => 'background3.jpg',
            'library_images' => json_encode($arrImage),
            'title' => 'Black Jack 1',
            'slug' => 'black-jack-1',
            'description' => $faker->realText($maxNbChars = 3000, $indexSize = 5),
            'excerpt' => $faker->text(200),
            'user_id' => App\User::all()->random()->id,
          ]);
          $BlogRoot2_1->makeChildOf($BlogRoot2);
          $BlogRoot2_1->category()->attach($category_story_fact_1);

          $BlogRoot2_2 = Blog::create([
            'images' => 'background4.jpg',
            'library_images' => json_encode($arrImage),
            'title' => 'Black Jack 2',
            'slug' => 'black-jack-2',
            'description' => $faker->realText($maxNbChars = 3000, $indexSize = 5),
            'excerpt' => $faker->text(200),
            'user_id' => App\User::all()->random()->id,
          ]);
          $BlogRoot2_2->makeChildOf($BlogRoot2);
          $BlogRoot2_2->category()->attach($category_story_fact_1);

          $BlogRoot2_3 = Blog::create([
            'images' => 'background1.jpg',
            'library_images' => json_encode($arrImage),
            'title' => 'Black Jack 3',
            'slug' => 'black-jack-3',
            'description' => $faker->realText($maxNbChars = 3000, $indexSize = 5),
            'excerpt' => $faker->text(200),
            'user_id' => App\User::all()->random()->id,
          ]);
          $BlogRoot2_3->makeChildOf($BlogRoot2);
          $BlogRoot2_3->category()->attach($category_story_fact_1);

          $BlogRoot2_4 = Blog::create([
            'images' => 'background2.jpg',
            'library_images' => json_encode($arrImage),
            'title' => 'Black Jack 4',
            'slug' => 'black-jack-4',
            'description' => $faker->realText($maxNbChars = 3000, $indexSize = 5),
            'excerpt' => $faker->text(200),
            'user_id' => App\User::all()->random()->id,
          ]);
          $BlogRoot2_4->makeChildOf($BlogRoot2);
          $BlogRoot2_4->category()->attach($category_story_fact_1);

          $BlogRoot2_5 = Blog::create([
            'images' => 'background3.jpg',
            'library_images' => json_encode($arrImage),
            'title' => 'Black Jack 5',
            'slug' => 'black-jack-5',
            'description' => $faker->realText($maxNbChars = 3000, $indexSize = 5),
            'excerpt' => $faker->text(200),
            'user_id' => App\User::all()->random()->id,
          ]);
          $BlogRoot2_5->makeChildOf($BlogRoot2);
          $BlogRoot2_5->category()->attach($category_story_fact_1);
        ////////////////////////////////////////////////////////////////
        $BlogRoot3 = Blog::create([
          'images' => 'background4.jpg',
          'library_images' => json_encode($arrImage),
          'title' => 'Post 3',
          'slug' => 'post-3',
          'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
          'excerpt' => $faker->text(200),
          'user_id' => App\User::all()->random()->id,
        ]);
        $BlogRoot3->makeRoot();
        $BlogRoot3->category()->attach($category_story_comic);
        ////////////////////////////////////////////////////////////////
        $BlogRoot4 = Blog::create([
          'images' => 'background1.jpg',
          'library_images' => json_encode($arrImage),
          'title' => 'Post 4',
          'slug' => 'post-4',
          'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
          'excerpt' => $faker->text(200),
          'user_id' => App\User::all()->random()->id,
        ]);
        $BlogRoot4->makeRoot();
        $BlogRoot4->category()->attach($category_story_fact_1);
        ////////////////////////////////////////////////////////////////
        $BlogRoot5 = Blog::create([
          'images' => 'background2.jpg',
          'library_images' => json_encode($arrImage),
          'title' => 'Post 5',
          'slug' => 'post-5',
          'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
          'excerpt' => $faker->text(200),
          'user_id' => App\User::all()->random()->id,
        ]);
        $BlogRoot5->makeRoot();
        $BlogRoot5->category()->attach($category_story_novel);
        $BlogRoot5->category()->attach($category_homepage);
        ////////////////////////////////////////////////////////////////
        $BlogRoot6 = Blog::create([
          'images' => 'background4.jpg',
          'library_images' => json_encode($arrImage),
          'title' => 'Post 6',
          'slug' => 'post-6',
          'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
          'excerpt' => $faker->text(200),
          'user_id' => App\User::all()->random()->id,
        ]);
        $BlogRoot6->makeRoot();
        $BlogRoot6->category()->attach($category_popular);
        $BlogRoot6->category()->attach($category_homepage);
        ////////////////////////////////////////////////////////////////
        $BlogRoot7 = Blog::create([
          'images' => 'background3.jpg',
          'library_images' => json_encode($arrImage),
          'title' => 'Post 7',
          'slug' => 'post-7',
          'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
          'excerpt' => $faker->text(200),
          'user_id' => App\User::all()->random()->id,
        ]);
        $BlogRoot7->makeRoot();
        $BlogRoot7->category()->attach($category_outstanding);
        $BlogRoot7->category()->attach($category_homepage);
        ////////////////////////////////////////////////////////////////
        $BlogRoot8 = Blog::create([
          'images' => 'background2.jpg',
          'library_images' => json_encode($arrImage),
          'title' => 'Post 8',
          'slug' => 'post-8',
          'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
          'excerpt' => $faker->text(200),
          'user_id' => App\User::all()->random()->id,
        ]);
        $BlogRoot8->makeRoot();
        $BlogRoot8->category()->attach($category_recommand);
        $BlogRoot8->category()->attach($category_homepage);
        for ($i = 9; $i <= 50 ; $i++) {
          $BlogRoot9 = Blog::create([
            'images' => $faker->randomElement($array = array ('background1.jpg','background2.jpg','background3.jpg','background4.jpg')),
            'library_images' => json_encode($arrImage),
            'title' => 'Post '.$i,
            'slug' => 'post-'.$i,
            'description' => $faker->realText($maxNbChars = 1500, $indexSize = 5),
            'excerpt' => $faker->text(200),
            'user_id' => App\User::all()->random()->id,
          ]);
          $BlogRoot9->makeRoot();
          $BlogRoot9->category()->attach($category_recommand);
          $BlogRoot9->category()->attach($category_homepage);
        }
          App\User::all()->each(function($user){
            $user->favoriteBlog()->attach(App\Blog::get(['id'])->where('id','>',10)->where('id','<','16'));
          });
    }
}
