import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem, getAvailableStock } = useCart();
  const navigate = useNavigate();

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const resp = await api.get(`/products/${id}`);
      setProduct(resp.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load product");
    } finally { setLoading(false); }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const stockLeft = getAvailableStock(product);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back to Shop Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/shop')}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Back to Shop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {product.image_url ? (
            <img src={product.image_url} alt={product.productName} className="w-full rounded-lg border shadow-sm" />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border">No image</div>
          )}
          {stockLeft <= 0 && <div className="mt-2 text-red-600 font-semibold">Out of stock</div>}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-gray-600 mt-2">{product.fullDescription || product.description || product.shortDescription}</p>

          <div className="mt-4">
            <div className="text-lg font-semibold">₱{Number(product.productPrice).toFixed(2)}</div>
            <div className="text-sm text-gray-500">Stock: {stockLeft}</div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => { if (stockLeft <= 0) return; addItem(product, 1); }}
              disabled={stockLeft <= 0}
              className={`flex-1 border px-4 py-2 rounded-lg ${stockLeft <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Add to Cart
            </button>

                        <button
              onClick={() => { if (stockLeft <= 0) return; addItem(product, 1); navigate("/checkout"); }}
              disabled={stockLeft <= 0}
              className={`flex-1 bg-weave-deep text-white px-4 py-2 rounded-lg hover:opacity-90 transition ${stockLeft <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{ backgroundColor: "var(--weave-deep)" }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
