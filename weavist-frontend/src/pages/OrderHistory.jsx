import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function ProductHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get("/orders", { withCredentials: true });
      setOrders(res.data || []);
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-10 max-w-5xl">
      {/* Back to Shop button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/shop")}
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

      <h1 className="text-3xl font-bold mb-6 text-center text-accent">
        Your Order History
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              {/* Each order may contain multiple items */}
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <img
                        src={
                            item.imageUrl ||
                            item.image ||
                            item.product?.imageUrl ||
                            "/placeholder.png"
                        }
                        alt={item.productName || item.name || "Product"}
                        className="w-20 h-20 object-cover rounded-lg border"
                        />

                        {/* Product Info */}
                        <div>
                        <h2 className="font-semibold text-lg">
                            {item.productName || item.name || "Unknown Product"}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Quantity: {item.quantity || 1}
                        </p>
                        <p className="text-gray-600 text-sm">
                            Subtotal: ₱
                            {Number(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        </div>
                    </div>

                    {/* Order Status and Date */}
                    {idx === 0 && (
                      <div className="text-right">
                        <p
                          className={`font-semibold capitalize ${
                            order.status === "completed"
                              ? "text-green-600"
                              : order.status === "pending"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        >
                          {order.status}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate || order.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium text-gray-700 mt-1">
                          Total: ₱{Number(order.totalAmount || 0).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">
                  No items found in this order.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          You have no order history yet.
        </p>
      )}
    </div>
  );
}
