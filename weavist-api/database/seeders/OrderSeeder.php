<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Order;
use App\Models\User;

class OrderSeeder extends Seeder
{
    public function run()
    {
        // Disable FKs to allow truncate
        Schema::disableForeignKeyConstraints();
        Order::truncate();
        Schema::enableForeignKeyConstraints();

        $user = User::where('email', 'user@weavist.com')->first();

        if ($user) {
            Order::create([
                'user_id' => $user->id,
                'orderDate' => now(),
                'status' => 'completed',
                'totalAmount' => 85,
                'items' => json_encode([
                    ['product_id' => 1, 'name' => 'Handwoven Scarf', 'price' => 25, 'quantity' => 1],
                    ['product_id' => 2, 'name' => 'Woven Bag', 'price' => 60, 'quantity' => 1],
                ]),
            ]);
        }
    }
}
