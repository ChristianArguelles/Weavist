import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminDonations(){
  const [donations, setDonations] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(()=>{ fetchList(); }, []);
  async function fetchList(){ setLoading(true); try { const res = await api.get('/donations'); const sorted = (res.data||[]).slice().sort((a,b)=>a.id - b.id); setDonations(sorted); } catch(e){ console.error(e); } setLoading(false); }

  async function deleteDonation(id){ if(!confirm('Delete donation?')) return; try { await api.delete(`/donations/${id}`); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Donations</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        {loading ? <div className="p-4">Loading...</div> : (
          <table className="table-auto w-full">
            <thead className="bg-gray-100"><tr><th>ID</th><th>User</th><th>Campaign</th><th>Amount</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {donations.map(d=>(
                <tr key={d.id} className="border-t">
                  <td className="px-3 py-2">{d.id}</td>
                  <td className="px-3 py-2">{d.user?.email}</td>
                  <td className="px-3 py-2">{d.campaign?.title}</td>
                  <td className="px-3 py-2">₱{d.amount}</td>
                  <td className="px-3 py-2">{new Date(d.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2"><button onClick={()=>deleteDonation(d.id)} className="bg-primary text-white px-2 py-1 rounded">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
