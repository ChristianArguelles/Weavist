<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Product::truncate();
        Schema::enableForeignKeyConstraints();

        // Images will be served from storage/app/public/products
        // Make sure: php artisan storage:link
        $images = [
            1 => Storage::url('products/product1.jpg'),
            2 => Storage::url('products/product2.jpg'),
            3 => Storage::url('products/product3.jpg'),
            4 => Storage::url('products/product4.jpg'),
        ];

        Product::create([
            'productName'       => 'Handwoven Scarf',
            'shortDescription'  => 'Soft and elegant cotton scarf.',
            'fullDescription'   => 'This handwoven scarf is crafted from natural cotton by skilled artisans. It is lightweight, breathable, and perfect for any season. Every purchase supports local weavers.',
            'description'       => 'Soft cotton scarf',
            'productPrice'      => 25.00,
            'stock'             => 10,
            'image'             => $images[1],
        ]);

        Product::create([
            'productName'       => 'Woven Bag',
            'shortDescription'  => 'Durable bag for everyday use.',
            'fullDescription'   => 'A handwoven bag made with strong and eco-friendly fibers. Each bag features unique patterns, representing the traditions of local weaving communities.',
            'description'       => 'Durable handwoven bag',
            'productPrice'      => 45.00,
            'stock'             => 8,
            'image'             => $images[2],
        ]);

        Product::create([
            'productName'       => 'Traditional Fabric',
            'shortDescription'  => 'Colorful fabric with heritage patterns.',
            'fullDescription'   => 'This traditional fabric is dyed with natural colors and woven with intricate designs that have been passed down for generations. Ideal for custom clothing or home décor.',
            'description'       => 'Colorful traditional fabric',
            'productPrice'      => 60.00,
            'stock'             => 5,
            'image'             => $images[3],
        ]);

        Product::create([
            'productName'       => 'Weaver Bracelet',
            'shortDescription'  => 'Intricate bracelet, handmade with care.',
            'fullDescription'   => 'A handwoven bracelet made with colorful threads and beads. Each piece carries the personal touch of a local weaver, making it a meaningful accessory.',
            'description'       => 'Intricate bracelet',
            'productPrice'      => 15.00,
            'stock'             => 20,
            'image'             => $images[4],
        ]);
    }
}
