<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MenusSeeder extends Seeder
{
    const data = [
      [
          "title" => "Taxos",
          "price" => 40,
          "image" => null
      ],
      [
          "title" => "Shawarma",
          "price" => 80,
          "image" => null
      ],
      [
          "title" => "Pizza",
          "price" => 90,
          "image" => null
      ],
      [
          "title" => "Hamburger",
          "price" => 80,
          "image" => null
      ],
    ];
    public function run(): void
    {
        foreach (self::data as $menu){
            Menu::create($menu);
        }
    }
}
