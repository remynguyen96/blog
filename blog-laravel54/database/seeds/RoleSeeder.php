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
        $user->name = "Member";
        $user->description = "Subscriber";
        $user->created_at = \Carbon\Carbon::now();
        $user->updated_at = \Carbon\Carbon::now();
        $user->save();

        $author = new Role();
        $author->name = "Editor";
        $author->description = "Editor";
        $author->created_at = \Carbon\Carbon::now();
        $author->updated_at = \Carbon\Carbon::now();
        $author->save();

        $admin = new Role();
        $admin->name = "Admin";
        $admin->description = "Administrator";
        $admin->created_at = \Carbon\Carbon::now();
        $admin->updated_at = \Carbon\Carbon::now();
        $admin->save();
    }
}
