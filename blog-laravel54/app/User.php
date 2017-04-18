<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','ip_address'
    ];

    public $timestamps = true;

    public function roles(){
      return $this->belongsToMany(Role::class,'user_role','user_id','role_id');
    }

    public function blog(){
      return $this->hasMany(Blog::class);
    }

    public function category(){
      return $this->hasMany(Category::class);
    }

    public function profile(){
      return $this->hasOne(Profile::class);
    }
}
