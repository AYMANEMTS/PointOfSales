<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Command extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'commands';
    protected $fillable = [
        'user_id','table_id','total','number','status'
    ];

    public function menus()
    {
        return $this->belongsToMany(Menu::class)->withPivot('choices');
    }
    public function table()
    {
        return $this->belongsTo(Table::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
