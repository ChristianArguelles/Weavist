import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminOrders(){
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(()=>{ fetchList(); }, []);
  async function fetchList(){ setLoading(true); try { const res = await api.get('/orders'); const sorted = (res.data||[]).slice().sort((a,b)=>a.id - b.id); setOrders(sorted); } catch(e){ console.error(e); } setLoading(false); }

  async function updateStatus(id, status){ try { await api.put(`/orders/${id}`, { status }); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-100"><tr><th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {orders.map(o=>(
              <tr key={o.id} className="border-t">
                <td className="px-3 py-2">{o.id}</td>
                <td className="px-3 py-2">{o.user?.email || '—'}</td>
                <td className="px-3 py-2">₱{o.totalAmount}</td>
                <td className="px-3 py-2">{o.status}</td>
                <td className="px-3 py-2">{new Date(o.orderDate).toLocaleString()}</td>
                <td className="px-3 py-2">
                  <select defaultValue={o.status} onChange={(e)=>updateStatus(o.id, e.target.value)} className="border rounded px-2 py-1">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
