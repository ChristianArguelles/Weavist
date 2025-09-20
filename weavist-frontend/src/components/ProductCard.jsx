import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.productName || product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {product.productName || product.name}
          </h3>
          <div className="text-weave-red font-bold">
            ₱{Number(product.productPrice || product.price || 0).toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-col gap-2">
          <Link
            to={`/product/${product.id}`}
            className="btn-muted w-full text-center"
          >
            View Details
          </Link>
          <button onClick={() => onAdd(product)} className="btn-primary w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
