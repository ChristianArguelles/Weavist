import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function EmailVerification() {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    verifyEmail();
  }, [id, hash]);

  const verifyEmail = async () => {
    try {
      const response = await api.get(`/email/verify/${id}/${hash}`);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-weave p-6">
        <div className="card p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-weave p-6">
        <div className="card p-8 w-full max-w-md text-center">
          <div className="weave-divider mb-4"></div>
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900">Email Verified!</h1>
          <p className="text-sm text-gray-500 mb-6">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <button 
            onClick={() => navigate('/login')} 
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
      <div className="card p-8 w-full max-w-md text-center">
        <div className="weave-divider mb-4"></div>
        <div className="text-red-600 text-6xl mb-4">✗</div>
        <h1 className="text-3xl font-extrabold mb-2 text-gray-900">Verification Failed</h1>
        <p className="text-sm text-gray-500 mb-6">
          {error || 'The verification link is invalid or has expired.'}
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/login')} 
            className="btn-primary w-full"
          >
            Go to Login
          </button>
          <button 
            onClick={() => navigate('/register')} 
            className="btn-muted w-full"
          >
            Register Again
          </button>
        </div>
      </div>
    </div>
  );
}
