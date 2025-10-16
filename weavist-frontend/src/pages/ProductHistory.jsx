import React, { useEffect, useState } from "react";
import { api } from "../api/client";

export default function ProductHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-3xl font-bold mb-6 text-center text-accent">
        🧾 Your Order History
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Total (₱)</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{order.id}</td>
                  <td className="p-3 border">
                    {order.product?.productName || "—"}
                  </td>
                  <td className="p-3 border">{order.quantity}</td>
                  <td className="p-3 border">
                    ₱{Number(order.total_price || 0).toFixed(2)}
                  </td>
                  <td
                    className={`p-3 border capitalize ${
                      order.status === "completed"
                        ? "text-green-600"
                        : order.status === "pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-3 border">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          You have no order history yet.
        </p>
      )}
    </div>
  );
}
