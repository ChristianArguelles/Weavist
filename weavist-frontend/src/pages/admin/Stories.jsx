import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ storyTitle: '', content: '', media: '', video: '' });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchList(); }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await api.get('/stories');
      const sorted = (res.data || []).slice().sort((a, b) => a.id - b.id);
      setStories(sorted);
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  function openAdd() {
    setForm({ storyTitle: '', content: '', media: '', video: '' });
    setEditingId(null);
    setModalOpen(true);
  }
  function openEdit(s) {
    setForm({ storyTitle: s.storyTitle, content: s.content, media: s.media, video: s.video });
    setEditingId(s.id);
    setModalOpen(true);
  }

  async function submitForm(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/stories/${editingId}`, form);
      } else {
        await api.post('/stories', form);
      }
      setModalOpen(false);
      fetchList();
    } catch (e) { alert(e.response?.data?.message || e.message); }
  }

  async function deleteStory(id) {
    if (!confirm('Delete story?')) return;
    try {
      await api.delete(`/stories/${id}`);
      fetchList();
    } catch (e) { alert(e.response?.data?.message || e.message); }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Stories</h1>
        <div>
          <button onClick={openAdd} className="btn-primary">Add Story</button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Video</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-center text-gray-500">
                    No stories found.
                  </td>
                </tr>
              ) : (
                stories.map(s => (
                  <tr key={s.id} className="border-t">
                    <td className="px-3 py-2">{s.id}</td>
                    <td className="px-3 py-2 max-w-[500px] whitespace-normal break-words">{s.storyTitle}</td>
                    <td className="px-3 py-2">{s.video || '-'}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(s)}
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStory(s.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Delete
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur Overlay */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/30"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-white/40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit Story' : 'Add Story'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitForm} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Story Title
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter story title"
                  value={form.storyTitle}
                  onChange={(e) => setForm({ ...form, storyTitle: e.target.value })}
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Paste image link"
                  value={form.media}
                  onChange={(e) => setForm({ ...form, media: e.target.value })}
                />
                {form.media && (
                  <img
                    src={form.media}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-lg border shadow"
                  />
                )}
              </div>

              {/* Video */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="YouTube link or /videos/story1.mp4"
                  value={form.video}
                  onChange={(e) => setForm({ ...form, video: e.target.value })}
                />
                {form.video && (
                  <video
                    controls
                    src={form.video}
                    className="mt-3 w-48 rounded-lg border shadow"
                  />
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Write the story content..."
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  {editingId ? 'Save Changes' : 'Add Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
