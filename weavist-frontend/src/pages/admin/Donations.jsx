import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminDonations(){
  const [donations, setDonations] = useState([]);

  useEffect(()=>{ fetchList(); }, []);
  async function fetchList(){ try { const res = await api.get('/donations'); setDonations(res.data); } catch(e){ console.error(e); } }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Donations</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-100"><tr><th>ID</th><th>User</th><th>Campaign</th><th>Amount</th><th>Date</th></tr></thead>
          <tbody>
            {donations.map(d=>(
              <tr key={d.id} className="border-t">
                <td className="px-3 py-2">{d.id}</td>
                <td className="px-3 py-2">{d.user?.email}</td>
                <td className="px-3 py-2">{d.campaign?.title}</td>
                <td className="px-3 py-2">₱{d.amount}</td>
                <td className="px-3 py-2">{new Date(d.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
