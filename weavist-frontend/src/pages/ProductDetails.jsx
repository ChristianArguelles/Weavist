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

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const resp = await api.get(`/products/${id}`); // calls ProductController@show
      setProduct(resp.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: product image */}
        <div>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.productName}
              className="w-full rounded-lg border shadow-sm"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border">
              No image
            </div>
          )}
          {product.stock <= 0 && (
            <div className="mt-2 text-red-600 font-semibold">Out of stock</div>
          )}
        </div>

        {/* Right side: product details */}
        <div>
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-gray-600 mt-2">
            {product.fullDescription || product.description || product.shortDescription}
          </p>

          <div className="mt-4">
            <div className="text-lg font-semibold">
              ₱{Number(product.productPrice).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Stock: {product.stock}</div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                if (product.stock <= 0) {
                  alert("Product is out of stock");
                  return;
                }
                addItem(product, 1);
                navigate("/checkout");
              }}
              className={
                "flex-1 bg-weave-deep text-white px-4 py-2 rounded-lg hover:opacity-90 transition " +
                (product.stock <= 0 ? "opacity-50 cursor-not-allowed" : "")
              }
              disabled={product.stock <= 0}
              style={{ backgroundColor: "var(--weave-deep)" }}
            >
              Buy Now
            </button>

            <button
              onClick={() => {
                if (product.stock <= 0) {
                  alert("Product is out of stock");
                  return;
                }
                addItem(product, 1);
              }}
              className={
                "flex-1 border px-4 py-2 rounded-lg " +
                (product.stock <= 0 ? "opacity-50 cursor-not-allowed" : "")
              }
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
