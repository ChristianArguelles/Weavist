<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Order;

class OrderSeeder extends Seeder
{
    public function run()
    {
        // Disable FKs to allow truncate
        Schema::disableForeignKeyConstraints();
        Order::truncate();
        Schema::enableForeignKeyConstraints();

        // Leave empty intentionally — no initial orders seeded
    }
}
