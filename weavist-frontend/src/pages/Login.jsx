import React, { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false); const [error,setError]=useState('');

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        login(res.data.user, res.data.token);
        nav('/');
      } else {
        setError('Login failed: no token returned');
      }
    } catch(err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-weave p-6">
      <div className="card p-8 w-full max-w-md">
        <div className="weave-divider mb-4"></div>
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Sign in to your account</p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="text-sm text-gray-700">Email</label>
          <input className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-200" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} />

          <label className="text-sm text-gray-700">Password</label>
          <input type="password" className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-200" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />

          {error && <div className="text-red-600">{error}</div>}

          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Logging in...' : 'Sign in'}</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">Don't have an account? <a href="/register" className="text-indigo-600 font-medium">Register</a></div>
      </div>
    </div>
  );
}
