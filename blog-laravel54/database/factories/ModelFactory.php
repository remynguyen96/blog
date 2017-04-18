<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;
    return [
        'name' => $faker->firstName,
        'email' => $faker->unique()->freeEmail,
        'password' => bcrypt('secret'),
        'ip_address' => $faker->ipv4,
        'remember_token' => str_random(100),
        'created_at' => \Carbon\Carbon::now(),
        'updated_at' => \Carbon\Carbon::now(),
    ];
});
// Profile
$factory->define(App\Profile::class, function (Faker\Generator $faker) {
    return [
      'avatar' => $faker->imageUrl($width = 640, $height = 480),
      'phone' => $faker->randomElement($array = array ('097 683 0621','097 683 0622','097 683 0623','097 683 0624')),
      'address' => $faker->address,
      'description' => $faker->text(200),
    ];
});
