import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminCampaigns(){
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', donationTarget:0, raisedAmount:0, image:'' });

  useEffect(()=>{ fetchList(); },[]);
  async function fetchList(){ try { const res = await api.get('/campaigns'); setCampaigns(res.data); } catch(e){ console.error(e); } }

  async function createCampaign(e){ e.preventDefault(); try { await api.post('/campaigns', form); setForm({ title:'', description:'', donationTarget:0, raisedAmount:0, image:'' }); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  async function deleteCampaign(id){ if(!confirm('Delete campaign?')) return; try { await api.delete(`/campaigns/${id}`); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Campaigns</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-100"><tr><th>ID</th><th>Title</th><th>Target</th><th>Raised</th><th>Actions</th></tr></thead>
          <tbody>
            {campaigns.map(c=>(
              <tr key={c.id} className="border-t">
                <td className="px-3 py-2">{c.id}</td>
                <td className="px-3 py-2">{c.title}</td>
                <td className="px-3 py-2">₱{c.donationTarget}</td>
                <td className="px-3 py-2">₱{c.raisedAmount}</td>
                <td className="px-3 py-2"><button onClick={()=>deleteCampaign(c.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={createCampaign} className="mt-6 bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Add Campaign</h2>
        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Target amount" value={form.donationTarget} onChange={e=>setForm({...form,donationTarget:e.target.value})} />
        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
        <textarea className="w-full border rounded px-3 py-2 mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button className="btn-primary">Add Campaign</button>
      </form>
    </div>
  );
}
