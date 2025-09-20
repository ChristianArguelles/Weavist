import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="container py-8 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8 text-center text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="card overflow-hidden grid md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div>
          <img
            src={product.image || "/placeholder.png"}
            alt={product.productName}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Product Info Section */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {product.productName}
            </h1>
            <p className="text-weave-red font-bold text-xl mb-4">
              ₱{Number(product.productPrice).toFixed(2)}
            </p>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-gray-700 italic mb-3">
                {product.shortDescription}
              </p>
            )}

            {/* Full Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.fullDescription || product.description || "No description available."}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => addItem(product, 1)}
              className="flex-1 btn-primary transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addItem(product, 1);
                navigate("/checkout");
              }}
              className="flex-1 bg-weave-deep text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: 'var(--weave-deep)' }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
