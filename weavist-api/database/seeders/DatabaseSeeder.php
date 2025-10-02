<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Schema::enableForeignKeyConstraints();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@weavist.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'User',
            'email' => 'user@weavist.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        $this->call([
            ProductSeeder::class,
            StorySeeder::class,
            CampaignSeeder::class,
            OrderSeeder::class,
            DonationSeeder::class,
        ]);
    }
}
