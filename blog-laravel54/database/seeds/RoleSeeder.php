<?php

use Illuminate\Database\Seeder;
use App\Role;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new Role();
        $user->name = "User";
        $user->description = "A Normal User";
        $user->save();

        $author = new Role();
        $author->name = "Author";
        $author->description = "An Author";
        $author->save();

        $admin = new Role();
        $admin->name = "Admin";
        $admin->description = "A Admin";
        $admin->save();
    }
}
