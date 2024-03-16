<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Table extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'tables';
    protected $fillable = [
        'name','status'
    ];
    public function commands()
    {
        return $this->hasMany(Command::class);
    }
}
