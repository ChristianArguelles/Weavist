import React from 'react';

export default function ProductCard({product, onAdd}) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? <img src={product.image} alt={product.productName || product.name} className="w-full h-full object-cover" /> : <div className="text-gray-400">No image</div>}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.productName || product.name}</h3>
        <div className="text-indigo-600 font-bold">₱{Number(product.productPrice || product.price || 0).toFixed(2)}</div>
        <div className="mt-3">
          <button onClick={()=>onAdd(product)} className="bg-indigo-600 text-white px-3 py-2 rounded w-full hover:bg-indigo-700">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
