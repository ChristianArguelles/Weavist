import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function Profile(){
  const { user, logout, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!user) return <div className="max-w-4xl mx-auto p-6">Please login to view profile.</div>

  const startEdit = () => { setEditing(true); };
  const cancelEdit = () => {
    setEditing(false);
    setName(user.name || ''); setPhone(user.phone || ''); setAddress(user.address || ''); setError('');
  };

  const save = async () => {
    setSaving(true); setError('');
    try {
      const payload = { name, phone, address };
      const res = await api.put('/profile', payload);
      const updated = res.data;
      // refresh stored auth (preserve token)
      const token = localStorage.getItem('weavist_token');
      if (token) login(updated, token);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Save failed');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Your Profile</h1>
            <p className="text-sm text-gray-500">Manage your account</p>
          </div>

          <div>
            {!editing ? (
              <button onClick={startEdit} aria-label="Edit" className="p-2 rounded hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 010 2.828l-9.193 9.193a1 1 0 01-.465.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.465l9.193-9.193a2 2 0 012.828 0z" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 text-gray-700">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            {!editing ? (
              <div className="mt-1 font-medium text-gray-900">{user.name}</div>
            ) : (
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-200" />
            )}
          </div>

          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="mt-1 font-medium text-gray-900">{user.email}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Phone</div>
            {!editing ? (
              <div className="mt-1 font-medium text-gray-900">{user.phone || <span className="text-gray-400">Not set</span>}</div>
            ) : (
              <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-200" />
            )}
          </div>

          <div>
            <div className="text-sm text-gray-500">Address</div>
            {!editing ? (
              <div className="mt-1 font-medium text-gray-900">{user.address || <span className="text-gray-400">Not set</span>}</div>
            ) : (
              <textarea value={address} onChange={e=>setAddress(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-200" rows={3} />
            )}
          </div>
        </div>

        {error && <div className="mt-4 text-sm text-primary">{error}</div>}

        <div className="mt-6 flex items-center justify-end gap-2">
          {editing ? (
            <>
              <button onClick={save} disabled={saving} className="px-3 py-1 bg-primary text-white rounded-md text-sm">{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={cancelEdit} className="px-3 py-1 border rounded-md text-sm">Cancel</button>
            </>
          ) : (
            <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover" onClick={()=>{ logout(); window.location='/'; }}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}
