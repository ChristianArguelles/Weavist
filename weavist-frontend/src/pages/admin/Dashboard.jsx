import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/products" className="card p-4">Products</Link>
        <Link to="/admin/stories" className="card p-4">Stories</Link>
        <Link to="/admin/campaigns" className="card p-4">Campaigns</Link>
        <Link to="/admin/orders" className="card p-4">Orders</Link>
        <Link to="/admin/donations" className="card p-4">Donations</Link>
      </div>
    </div>
  );
}
