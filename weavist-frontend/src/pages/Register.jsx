import React, { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import TermsModal from '../components/TermsModal';

export default function Register(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false); const [error,setError]=useState(''); const [success,setSuccess]=useState(false);
  const [termsAccepted,setTermsAccepted]=useState(false); const [showTermsModal,setShowTermsModal]=useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    
    if (!termsAccepted) {
      setError('You must agree to the Terms and Conditions to proceed.');
      setLoading(false);
      return;
    }
    
    try {
      const res = await api.post('/auth/register', { name, email, password });
      // Registration successful, show verification message
      setSuccess(true);
      setError('');
    } catch(err) { setError(err.response?.data?.message || err.message); }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-weave p-6">
        <div className="card p-8 w-full max-w-md text-center">
          <div className="weave-divider mb-4"></div>
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900">Registration Successful!</h1>
          <p className="text-sm text-gray-500 mb-6">Please check your email to verify your account.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              We've sent a verification link to <strong>{email}</strong>. 
              Please click the link in your email to activate your account.
            </p>
          </div>
          <button 
            onClick={() => nav('/login')} 
            className="btn-primary w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-weave p-6">
      <div className="card p-8 w-full max-w-md">
        <div className="weave-divider mb-4"></div>
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900">Create account</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Create a free account to get started</p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-700">Full name</label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 ring-accent" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 ring-accent" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input type="password" className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 ring-accent" placeholder="Choose a password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>

          <div className="flex items-start gap-2">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAccepted} 
              onChange={e=>setTermsAccepted(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{' '}
              <button 
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          {error && <div className="text-primary">{error}</div>}

          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Registering...' : 'Create account'}</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="text-indigo-600 font-medium">Login</Link></div>
      </div>
      
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
    </div>
  );
}
