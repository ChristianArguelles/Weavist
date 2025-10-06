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
            5 => Storage::url('products/product5.jpg'),
            6 => Storage::url('products/product6.jpg'),
            7 => Storage::url('products/product7.jpg'),
            8 => Storage::url('products/product8.jpg'),
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

        Product::create([
            'productName'       => 'Loom Wall Hanging',
            'shortDescription'  => 'Decorative handwoven wall art.',
            'fullDescription'   => 'A statement piece for your home, intricately woven with natural fibers and traditional patterns.',
            'description'       => 'Decorative wall art',
            'productPrice'      => 85.00,
            'stock'             => 6,
            'image'             => $images[5],
        ]);

        Product::create([
            'productName'       => 'Handwoven Table Runner',
            'shortDescription'  => 'Elegant runner for dining tables.',
            'fullDescription'   => 'Adds texture and authenticity to your dining setup; crafted by skilled artisans.',
            'description'       => 'Elegant table runner',
            'productPrice'      => 35.00,
            'stock'             => 12,
            'image'             => $images[6],
        ]);

        Product::create([
            'productName'       => 'Patterned Pillow Cover',
            'shortDescription'  => 'Colorful cover for throw pillows.',
            'fullDescription'   => 'Made with durable fabric and vibrant patterns to brighten any space.',
            'description'       => 'Colorful pillow cover',
            'productPrice'      => 18.00,
            'stock'             => 25,
            'image'             => $images[7],
        ]);

        Product::create([
            'productName'       => 'Woven Coasters Set',
            'shortDescription'  => 'Set of 4 eco-friendly coasters.',
            'fullDescription'   => 'Protects surfaces while showcasing traditional weaving techniques.',
            'description'       => 'Eco-friendly coasters',
            'productPrice'      => 12.00,
            'stock'             => 40,
            'image'             => $images[8],
        ]);
    }
}
