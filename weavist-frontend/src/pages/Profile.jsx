import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile(){
  const { user, logout } = useAuth();
  if (!user) return <div className="max-w-4xl mx-auto p-6">Please login to view profile.</div>
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button className="mt-4 btn-primary" onClick={()=>{ logout(); window.location='/'; }}>Logout</button>
    </div>
  );
}
