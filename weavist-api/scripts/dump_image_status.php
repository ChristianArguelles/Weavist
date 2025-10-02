<?php
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap app
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$products = \App\Models\Product::all();
foreach ($products as $p) {
    $img = $p->image;
    $trimmed = trim($img);
    $existsInPublic = file_exists(__DIR__ . '/../public' . parse_url($trimmed, PHP_URL_PATH));
    $headers = @get_headers($trimmed);
    $httpStatus = $headers ? $headers[0] : 'no response';
    echo "ID {$p->id}: [{$img}]\n";
    echo "  trimmed: [{$trimmed}]\n";
    echo "  file exists in public: " . ($existsInPublic ? 'YES' : 'NO') . "\n";
    echo "  http: {$httpStatus}\n\n";
}
