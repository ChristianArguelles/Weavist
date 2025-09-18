<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // Get all products
    public function index()
    {
        return response()->json(
            Product::orderBy('id', 'desc')->get(),
            200
        );
    }

    // Store a new product
    public function store(Request $r)
    {
        $data = $r->validate([
            'productName'   => 'required|string',
            'shortDescription' => 'nullable|string',
            'fullDescription'  => 'nullable|string',
            'description'   => 'nullable|string',
            'productPrice'  => 'required|numeric',
            'stock'         => 'required|integer',
            'image'         => 'nullable|string'
        ]);

        $product = Product::create($data);

        return response()->json($product, 201);
    }

    // Show single product by ID
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product, 200);
    }

    // Update product
    public function update(Request $r, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->update($r->all());

        return response()->json($product, 200);
    }

    // Delete product
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
