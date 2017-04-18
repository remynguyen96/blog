<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
class Profile extends Model
{
    protected $table = 'profiles';

    protected $fillable = ['avatar','phone','address','description'];

    public $timestamps = true;

    public function users(){
      return $this->belongsTo(User::class);
    }
}
