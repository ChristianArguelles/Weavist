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

        $additionalProducts = [
            [
                'name' => 'Loom Wall Hanging',
                'short' => 'Decorative handwoven wall art.',
                'full' => 'A statement piece for your home, intricately woven with natural fibers and traditional patterns.',
                'desc' => 'Decorative wall art',
                'price' => 85.00,
                'stock' => 6,
            ],
            [
                'name' => 'Handwoven Table Runner',
                'short' => 'Elegant runner for dining tables.',
                'full' => 'Adds texture and authenticity to your dining setup; crafted by skilled artisans.',
                'desc' => 'Elegant table runner',
                'price' => 35.00,
                'stock' => 12,
            ],
            [
                'name' => 'Patterned Pillow Cover',
                'short' => 'Colorful cover for throw pillows.',
                'full' => 'Made with durable fabric and vibrant patterns to brighten any space.',
                'desc' => 'Colorful pillow cover',
                'price' => 18.00,
                'stock' => 25,
            ],
            [
                'name' => 'Woven Coasters Set',
                'short' => 'Set of 4 eco-friendly coasters.',
                'full' => 'Protects surfaces while showcasing traditional weaving techniques.',
                'desc' => 'Eco-friendly coasters',
                'price' => 12.00,
                'stock' => 40,
            ],
            [
                'name' => 'Artisan Tote',
                'short' => 'Spacious tote with woven accents.',
                'full' => 'Perfect for daily use; combines function with heritage design elements.',
                'desc' => 'Spacious woven tote',
                'price' => 55.00,
                'stock' => 10,
            ],
            [
                'name' => 'Handloom Shawl',
                'short' => 'Warm, soft handloom shawl.',
                'full' => 'Comfortable and stylish, ideal for cool evenings; supports local weavers.',
                'desc' => 'Warm handloom shawl',
                'price' => 48.00,
                'stock' => 9,
            ],
            [
                'name' => 'Woven Keychain',
                'short' => 'Compact, colorful keychain.',
                'full' => 'A small accessory with a big story; each one is unique.',
                'desc' => 'Colorful woven keychain',
                'price' => 6.00,
                'stock' => 100,
            ],
            [
                'name' => 'Traditional Placemat',
                'short' => 'Handwoven placemat for dining.',
                'full' => 'Adds a rustic touch to your table while being easy to clean.',
                'desc' => 'Handwoven placemat',
                'price' => 9.00,
                'stock' => 30,
            ],
            [
                'name' => 'Fabric Basket',
                'short' => 'Sturdy woven storage basket.',
                'full' => 'Ideal for organizing, made from durable natural fibers.',
                'desc' => 'Woven storage basket',
                'price' => 22.00,
                'stock' => 14,
            ],
            [
                'name' => 'Embroidered Pouch',
                'short' => 'Hand-embroidered zipper pouch.',
                'full' => 'Perfect for small items; a blend of weaving and embroidery.',
                'desc' => 'Hand-embroidered pouch',
                'price' => 14.00,
                'stock' => 50,
            ],
        ];

        $index = 1;
        foreach ($additionalProducts as $p) {
            $imageIndex = (($index - 1) % 4) + 1; // cycle 1..4
            Product::create([
                'productName'       => $p['name'],
                'shortDescription'  => $p['short'],
                'fullDescription'   => $p['full'],
                'description'       => $p['desc'],
                'productPrice'      => $p['price'],
                'stock'             => $p['stock'],
                'image'             => $images[$imageIndex],
            ]);
            $index++;
        }
    }
}
