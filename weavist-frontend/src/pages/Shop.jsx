import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    setLoading(true);
    try {
      const res = await api.get("/products");
      const raw = Array.isArray(res.data)
        ? res.data
        : res.data.data || res.data;
      setProducts(raw.map((p) => ({ ...p })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.productName}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h3 className="font-semibold mt-2">{p.productName}</h3>
              <p className="text-gray-600">
                {p.shortDescription?.slice(0, 80) ||
                  p.description?.slice(0, 80)}...
              </p>
              <p className="text-indigo-600 font-bold mt-2">
                ₱{Number(p.productPrice).toFixed(2)}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addItem(p, 1)}
                  className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${p.id}`}
                  className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 text-center"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
