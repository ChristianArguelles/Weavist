import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = "http://127.0.0.1:8000";

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, getAvailableStock } = useCart();

  const stockLeft = getAvailableStock(product);
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_URL}${product.image}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <>
            {stockLeft <= 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-semibold">
                Out of stock
              </div>
            )}
            <img
              src={imageUrl}
              alt={product.productName || product.name}
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-400 border">
            <span>No image</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg">{product.productName || product.name}</h3>
        <p className="text-sm text-gray-600 mt-2 flex-1 one-line">{product.description}</p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">
                ₱{Number(product.productPrice || product.price || 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">Stock: {stockLeft}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 w-full">
            <Link
              to={`/product/${product.id}`}
              className="btn-muted btn-icon btn-sm flex-1 justify-center"
              title="View details"
            >
              View
            </Link>

            <button
              onClick={() => {
                if (stockLeft <= 0 || adding) return;
                setAdding(true);
                try {
                  addItem(product, 1);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1200);
                } finally {
                  setAdding(false);
                }
              }}
              disabled={stockLeft <= 0}
              className={`btn-primary btn-icon btn-sm flex-1 justify-center ${stockLeft <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              title="Add to cart"
            >
              {adding ? "Adding…" : added ? "Added ✓" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
