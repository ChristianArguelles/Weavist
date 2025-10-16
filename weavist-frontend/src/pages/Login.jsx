import React, { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '', general: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Real-time validation
  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
    let error = '';
    if (!value.trim()) error = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address.';
    setFieldErrors(prev => ({ ...prev, email: error, general: '' }));
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
    let error = '';
    if (!value) error = 'Password is required.';
    else if (value.length < 6) error = 'Password must be at least 6 characters.';
    setFieldErrors(prev => ({ ...prev, password: error, general: '' }));
  };

  const validate = () => {
    const errors = {};
    if (!email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address.';
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const submit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setFieldErrors(prev => ({ ...prev, general: '' }));

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        login(res.data.user, res.data.token);
        nav('/');
      } else {
        setFieldErrors(prev => ({ ...prev, general: 'Login failed: no token returned' }));
      }
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.email_verified === false) {
        setFieldErrors(prev => ({ ...prev, general: 'Please verify your email before logging in.' }));
      } else {
        setFieldErrors(prev => ({ ...prev, general: err.response?.data?.message || err.message }));
      }
    }
    setLoading(false);
  };

  const resendVerification = async () => {
    if (!email) {
      setFieldErrors(prev => ({ ...prev, general: 'Please enter your email address first.' }));
      return;
    }

    setResending(true);
    setFieldErrors(prev => ({ ...prev, general: '' }));

    try {
      await api.post('/email/resend', { email });
      setFieldErrors(prev => ({ ...prev, general: 'Verification email sent! Please check your inbox.' }));
    } catch (err) {
      setFieldErrors(prev => ({ ...prev, general: err.response?.data?.message || 'Failed to send verification email.' }));
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

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 ring-accent ${fieldErrors.email ? 'border-red-500' : ''}`}
              placeholder="you@domain.com"
              value={email}
              onChange={handleEmailChange}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full border rounded-md px-3 py-2 focus:ring-2 ring-accent ${fieldErrors.password ? 'border-red-500' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.063.16-2.09.46-3.057m2.03-1.884A9.958 9.958 0 0112 5c5.523 0 10 4.477 10 10 0 1.063-.16 2.09-.46 3.057m-2.03 1.884L4.93 4.93" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
          </div>

          {/* General errors / email verification */}
          {fieldErrors.general && (
            <div className="text-primary mt-1">
              {fieldErrors.general}
              {fieldErrors.general.includes('verify your email') && (
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

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-indigo-600 font-medium">Register</a>
        </div>
      </div>
    </div>
  );
}
