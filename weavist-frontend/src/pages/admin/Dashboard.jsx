import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Manage Content Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            to="/admin/products" 
            className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium text-gray-800">Products</h3>
            <p className="text-sm text-gray-500 mt-1">Manage product listings</p>
          </Link>
          <Link 
            to="/admin/stories" 
            className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium text-gray-800">Stories</h3>
            <p className="text-sm text-gray-500 mt-1">Publish and edit stories</p>
          </Link>
          <Link 
            to="/admin/campaigns" 
            className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium text-gray-800">Campaigns</h3>
            <p className="text-sm text-gray-500 mt-1">Create and track campaigns</p>
          </Link>
        </div>
      </div>

      {/* User Data Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">User Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to="/admin/orders" 
            className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium text-gray-800">Orders</h3>
            <p className="text-sm text-gray-500 mt-1">View and manage orders</p>
          </Link>
          <Link 
            to="/admin/donations" 
            className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium text-gray-800">Donations</h3>
            <p className="text-sm text-gray-500 mt-1">Track donations from users</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
