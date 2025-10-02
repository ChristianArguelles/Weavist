<?php
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap the Laravel application so we can use Eloquent outside artisan
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// get actual files in storage/public/products
$storageFiles = [];
try {
    $files = \Illuminate\Support\Facades\Storage::disk('public')->files('products');
    foreach ($files as $f) {
        $storageFiles[] = $f; // e.g. products/products1.jpg
    }
} catch (\Exception $e) {
    echo "Could not list storage files: " . $e->getMessage() . "\n";
}

// Map products by id in order and assign available storage files
$products = \App\Models\Product::all();
$i = 0;
foreach ($products as $p) {
    if (isset($storageFiles[$i])) {
        // make absolute URL using app.url
        $p->image = config('app.url') . \Illuminate\Support\Facades\Storage::url($storageFiles[$i]);
        $p->save();
        echo "Updated product {$p->id} -> {$p->image}\n";
    } else {
        // if no storage file left, leave existing image or set placeholder
        if (empty($p->image) || strpos($p->image, 'data:image') === 0) {
            $p->image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
            $p->save();
            echo "Set placeholder for product {$p->id}\n";
        }
    }
    $i++;
}

print_r(\App\Models\Product::all()->pluck('image')->toArray());
