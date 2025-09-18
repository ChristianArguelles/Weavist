import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const nav = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={()=>nav('/')}>Weavist</div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/stories">Stories</Link>
          <Link to="/support">Support</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className="hidden sm:inline">Profile</Link>
              {user.role === 'admin' && (
                <div className="relative group">
                  <button className="hidden sm:inline">Admin ▾</button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block">
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin">Dashboard</Link>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/products">Products</Link>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/stories">Stories</Link>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/campaigns">Campaigns</Link>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/orders">Orders</Link>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/donations">Donations</Link>
                  </div>
                </div>
              )}
              <button onClick={()=>{ logout(); window.location = '/'; }} className="text-red-600 hidden sm:inline">Logout</button>
            </>
          ):(
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <Link to="/cart" className="ml-2 inline-flex items-center gap-2">
            <span className="text-xl">🛒</span>
            {items.length > 0 && <span className="text-sm font-semibold">({items.length})</span>}
          </Link>
          <button className="md:hidden p-2" onClick={()=>setOpen(v=>!v)}>{open ? '✕' : '☰'}</button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
            <Link to="/shop" onClick={()=>setOpen(false)}>Shop</Link>
            <Link to="/stories" onClick={()=>setOpen(false)}>Stories</Link>
            <Link to="/support" onClick={()=>setOpen(false)}>Support</Link>
            {user ? <><Link to="/profile" onClick={()=>setOpen(false)}>Profile</Link><button onClick={()=>{ logout(); window.location='/'; }} className="text-left text-red-600">Logout</button></> : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
          </div>
        </div>
      )}
    </header>
  );
}
