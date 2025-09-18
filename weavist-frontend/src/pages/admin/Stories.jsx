import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminStories(){
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ storyTitle:'', content:'', media:'', video:'' });

  useEffect(()=>{ fetchList(); },[]);

  async function fetchList(){ try { const res = await api.get('/stories'); setStories(res.data); } catch(e){ console.error(e); } }

  async function createStory(e){ e.preventDefault(); try { await api.post('/stories', form); setForm({ storyTitle:'', content:'', media:'', video:''}); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  async function deleteStory(id){ if(!confirm('Delete story?')) return; try { await api.delete(`/stories/${id}`); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Stories</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-100"><tr><th className="px-3 py-2">ID</th><th className="px-3 py-2">Title</th><th className="px-3 py-2">Video</th><th className="px-3 py-2">Actions</th></tr></thead>
          <tbody>
            {stories.map(s=>(
              <tr key={s.id} className="border-t">
                <td className="px-3 py-2">{s.id}</td>
                <td className="px-3 py-2">{s.storyTitle}</td>
                <td className="px-3 py-2">{s.video || '-'}</td>
                <td className="px-3 py-2"><button onClick={()=>deleteStory(s.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={createStory} className="mt-6 bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Add Story</h2>
        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Title" value={form.storyTitle} onChange={e=>setForm({...form,storyTitle:e.target.value})} required />
        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Image URL or path" value={form.media} onChange={e=>setForm({...form,media:e.target.value})} />
        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Video URL (YouTube or /videos/story1.mp4)" value={form.video} onChange={e=>setForm({...form,video:e.target.value})} />
        <textarea className="w-full border rounded px-3 py-2 mb-2" placeholder="Content" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} />
        <button className="btn-primary">Add Story</button>
      </form>
    </div>
  );
}
