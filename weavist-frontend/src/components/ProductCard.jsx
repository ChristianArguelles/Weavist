import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000"; // adjust if your Laravel runs on a different host/port

export default function ProductCard({ product, onAdd }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  // Ensure full image URL
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_URL}${product.image}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <>
            {product.stock <= 0 && (
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

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg">
          {product.productName || product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-2 flex-1 one-line">
          {product.description}
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">
                ₱
                {Number(product.productPrice || product.price || 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">
                Stock: {product.stock}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 w-full">
            <button
              onClick={async () => {
                if (product.stock <= 0 || adding) return;
                setAdding(true);
                try {
                  await Promise.resolve(onAdd(product));
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1200);
                } finally {
                  setAdding(false);
                }
              }}
              disabled={product.stock <= 0}
              className={
                "btn-primary btn-icon btn-sm flex-1 justify-center " +
                (product.stock <= 0 ? "opacity-50 cursor-not-allowed" : "")
              }
              title="Add to cart"
            >
              {adding ? (
                <span>Adding…</span>
              ) : added ? (
                <span>Added ✓</span>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.2A1 1 0 007.8 21h8.4a1 1 0 001-.8L18 13"
                    />
                  </svg>
                  <span>Add</span>
                </>
              )}
            </button>

            <Link
              to={`/product/${product.id}`}
              className="btn-muted btn-icon btn-sm flex-1 justify-center"
              title="View details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>View</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
