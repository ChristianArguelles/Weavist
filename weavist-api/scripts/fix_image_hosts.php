<?php
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$models = [\App\Models\Product::class, \App\Models\Story::class, \App\Models\Campaign::class];
$from = 'http://localhost/storage/';
$to = 'http://127.0.0.1:8000/storage/';

foreach ($models as $m) {
    $items = $m::all();
    foreach ($items as $item) {
        foreach (['image','media'] as $field) {
            if (isset($item->$field) && is_string($item->$field) && strpos($item->$field, $from) === 0) {
                $item->$field = str_replace($from, $to, $item->$field);
                $item->save();
                echo "Updated {$m} id={$item->id} field={$field} -> {$item->$field}\n";
            }
        }
    }
}

// Dump current product image URLs
print_r(\App\Models\Product::all()->pluck('image')->toArray());
print_r(\App\Models\Story::all()->pluck('media')->toArray());
print_r(\App\Models\Campaign::all()->pluck('image')->toArray());
