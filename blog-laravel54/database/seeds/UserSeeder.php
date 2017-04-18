<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;
use Faker\Factory as Faker;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create(User::class);
        $role_user = Role::where('name','User')->first();
        $role_author = Role::where('name','Author')->first();
        $role_admin = Role::where('name','Admin')->first();

        factory('App\User',10)->create()->each(function($user){
          $user->profile()->save(factory(App\Profile::class)->make());
          $user->roles()->attach(App\Role::all()->random()->id);
        });
        // for ($i=1; $i <= 8; $i++) {
        //   $user = User::create([
        //     'name' => $faker->firstName,
        //     'email' => $faker->unique()->freeEmail,
        //     'password' => bcrypt('secret'),
        //     'ip_address' => $faker->ipv4,
        //     'remember_token' => str_random(100),
        //     'created_at' => \Carbon\Carbon::now(),
        //     'updated_at' => \Carbon\Carbon::now(),
        //   ]);
        //   $user->roles()->attach($role_user);
        // }
        // $author = User::create([
        //   'name' => $faker->firstName,
        //   'email' => $faker->unique()->freeEmail,
        //   'password' => bcrypt('secret'),
        //   'ip_address' => $faker->ipv4,
        //   'remember_token' => str_random(100),
        //   'created_at' => \Carbon\Carbon::now(),
        //   'updated_at' => \Carbon\Carbon::now(),
        // ]);
        // $author->roles()->attach($role_author);
        // $admin = User::create([
        //   'name' => $faker->firstName,
        //   'email' => $faker->unique()->freeEmail,
        //   'password' => bcrypt('secret'),
        //   'ip_address' => $faker->ipv4,
        //   'remember_token' => str_random(100),
        //   'created_at' => \Carbon\Carbon::now(),
        //   'updated_at' => \Carbon\Carbon::now(),
        // ]);
        // $admin->roles()->attach($role_admin);
    }
}
