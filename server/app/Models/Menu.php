<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use HasFactory,SoftDeletes;
    protected $table ='menus';
    protected $fillable = [
        'title','image','price'
 ];
    public function commands(){
        return $this->belongsToMany(Command::class);
    }
}
