import React, { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false); const [error,setError]=useState('');
  const [resending,setResending]=useState(false);

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
      if (err.response?.status === 403 && err.response?.data?.email_verified === false) {
        setError('Please verify your email before logging in.');
      } else {
        setError(err.response?.data?.message || err.message);
      }
    }
    setLoading(false);
  };

  const resendVerification = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    
    setResending(true);
    setError('');
    try {
      await api.post('/email/resend', { email });
      setError('Verification email sent! Please check your inbox.');
    } catch(err) {
      setError(err.response?.data?.message || 'Failed to send verification email.');
    }
    setResending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-weave p-6">
      <div className="card p-8 w-full max-w-md">
        <div className="weave-divider mb-4"></div>
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Sign in to your account</p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="text-sm text-gray-700">Email</label>
          <input className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-accent" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} />

          <label className="text-sm text-gray-700">Password</label>
          <input type="password" className="w-full border rounded-md px-3 py-2 focus:ring-2 ring-accent" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />

          {error && (
            <div className="text-primary">
              {error}
              {error.includes('verify your email') && (
                <div className="mt-2">
                  <button 
                    type="button"
                    onClick={resendVerification}
                    disabled={resending}
                    className="text-sm text-indigo-600 hover:text-indigo-800 underline"
                  >
                    {resending ? 'Sending...' : 'Resend verification email'}
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Logging in...' : 'Sign in'}</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">Don't have an account? <a href="/register" className="text-indigo-600 font-medium">Register</a></div>
      </div>
    </div>
  );
}
