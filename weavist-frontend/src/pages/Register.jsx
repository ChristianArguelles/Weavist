import React, { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false); const [error,setError]=useState('');

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const token = res.data.token;
      if(token) { login(res.data.user, token); nav('/'); } else { setError('Registered but no token returned'); }
    } catch(err) { setError(err.response?.data?.message || err.message); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-weave p-6">
      <div className="card p-8 w-full max-w-md">
        <div className="weave-divider mb-4"></div>
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900">Create account</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Create a free account to get started</p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-700">Full name</label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-red-200" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-red-200" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input type="password" className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-red-200" placeholder="Choose a password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Registering...' : 'Create account'}</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="text-indigo-600 font-medium">Login</Link></div>
      </div>
    </div>
  );
}
