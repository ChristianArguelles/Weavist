import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminCampaigns(){
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', donationTarget:0, raisedAmount:0, image:'' });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{ fetchList(); },[]);
  async function fetchList(){ setLoading(true); try { const res = await api.get('/campaigns'); const sorted = (res.data||[]).slice().sort((a,b)=>a.id - b.id); setCampaigns(sorted); } catch(e){ console.error(e); } setLoading(false); }

  function openAdd(){ setForm({ title:'', description:'', donationTarget:0, raisedAmount:0, image:'' }); setEditingId(null); setModalOpen(true); }
  function openEdit(c){ setForm({ title:c.title, description:c.description, donationTarget:c.donationTarget, raisedAmount:c.raisedAmount, image:c.image }); setEditingId(c.id); setModalOpen(true); }

  async function submitForm(e){ e.preventDefault(); try { if(editingId){ await api.put(`/campaigns/${editingId}`, form); } else { await api.post('/campaigns', form); } setModalOpen(false); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  async function toggleArchive(campaign){ 
    const action = campaign.archived ? 'unarchive' : 'archive';
    if(!confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} this campaign?`)) return; 
    try { 
      await api.patch(`/campaigns/${campaign.id}/archive`); 
      fetchList(); 
    } catch(e){ 
      alert(e.response?.data?.message || e.message); 
    } 
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Campaigns</h1>
  <div><button onClick={openAdd} className="btn-primary">Add Campaign</button></div>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        {loading ? <div className="p-4">Loading...</div> : (
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-center">ID</th>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Description</th>
                <th className="px-3 py-2 text-center">Target</th>
                <th className="px-3 py-2 text-center">Raised</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-3 py-6 text-center text-gray-500"
                  >
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.id} className={`border-t hover:bg-gray-50 ${c.archived ? 'bg-gray-100 opacity-60' : ''}`}>
                    <td className="px-3 py-2 text-center">{c.id}</td>
                    <td className="px-3 py-2 max-w-[250px] whitespace-normal break-words">{c.title}</td>
                    <td className="px-3 py-2 max-w-[350px] whitespace-normal break-words text-sm text-gray-600">{c.description ? (c.description.length > 120 ? c.description.slice(0,120) + '…' : c.description) : '-'}</td>
                    <td className="px-3 py-2 text-center">₱{c.donationTarget}</td>
                    <td className="px-3 py-2 text-center">₱{c.raisedAmount}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${c.archived ? 'bg-gray-300 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                        {c.archived ? 'Archived' : 'Active'}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="bg-primary text-white px-2 py-1 rounded hover:bg-primary-hover transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleArchive(c)}
                          className={`${c.archived ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white px-2 py-1 rounded transition`}
                        >
                          {c.archived ? 'Unarchive' : 'Archive'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-md bg-white/20" onClick={() => setModalOpen(false)} />

          {/* Modal Content */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-white/40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? 'Edit Campaign' : 'Add Campaign'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-xl">✕</button>
            </div>

            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 ring-accent outline-none transition"
                  placeholder="Campaign Title"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 ring-accent outline-none transition"
                    placeholder="₱0.00"
                    value={form.donationTarget}
                    onChange={e => setForm({ ...form, donationTarget: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 ring-accent outline-none transition"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 ring-accent outline-none transition resize-none"
                  placeholder="Write a short description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white font-medium bg-primary-hover shadow transition">{editingId ? 'Save' : 'Add Campaign'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
