<?php
require __DIR__ . '/../vendor/autoload.php';

use App\Models\Product;
use Illuminate\Support\Facades\Artisan;

$products = Product::where('image', 'like', 'http://localhost/storage/%')->get();
foreach ($products as $p) {
    $p->image = preg_replace('#^https?://[^/]+#', '', $p->image);
    $p->save();
    echo "Fixed: {$p->id} -> {$p->image}\n";
}
$all = Product::all()->pluck('image')->toArray();
print_r($all);
