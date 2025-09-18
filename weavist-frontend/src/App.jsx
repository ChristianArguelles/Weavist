import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Stories from './pages/Stories';
import SupportWeavers from './pages/SupportWeavers';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminStories from './pages/admin/Stories';
import AdminCampaigns from './pages/admin/Campaigns';
import AdminOrders from './pages/admin/Orders';
import AdminDonations from './pages/admin/Donations';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function AdminRoute({ children }) {
  const raw = localStorage.getItem('weavist_auth');
  if(!raw) return <Navigate to="/login" />
  const user = JSON.parse(raw);
  if(user.role !== 'admin') return <Navigate to="/" />
  return children;
}

export default function App(){
  return (
    <AuthProvider>
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/support" element={<SupportWeavers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        // For admin
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/stories" element={<AdminRoute><AdminStories /></AdminRoute>} />
        <Route path="/admin/campaigns" element={<AdminRoute><AdminCampaigns /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/donations" element={<AdminRoute><AdminDonations /></AdminRoute>} />
      </Routes>
    </CartProvider>
    </AuthProvider>
  );
}
