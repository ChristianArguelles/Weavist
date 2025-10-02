import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const nav = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="weavist-header sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-2xl brand-weave cursor-pointer" onClick={()=>nav('/')}>Weavist</div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/stories" className="nav-link">Stories</Link>
          <Link to="/support" className="nav-link">Support</Link>
            {user && user.role === 'admin' && (
              <li className="relative">
                <Link to="/admin" className="text-lg">Admin</Link>
                <svg className="inline-block ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </li>
            )}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Cart with SVG icon - placed before account */}
              <Link to="/cart" className="ml-2 inline-flex items-center gap-2 relative weave-icon" aria-label="Cart" title="View cart">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.2A1 1 0 007.8 21h8.4a1 1 0 001-.8L18 13M7 13h10"></path>
                </svg>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full px-2 py-0.5">{items.length}</span>
                )}
              </Link>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                  title="Account menu"
                >
                  {/* user SVG icon */}
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="hidden sm:inline text-sm">{user?.name || 'Account'}</span>
                </button>

                {userMenuOpen && (
                  <div role="menu" className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md">
                      {user.role !== 'admin' && (
                        <Link role="menuitem" to="/profile" onClick={()=>setUserMenuOpen(false)} className="block px-3 py-2 hover:bg-gray-100">Profile</Link>
                      )}
                    <button
                      role="menuitem"
                      onClick={() => { setUserMenuOpen(false); logout(); window.location = '/'; }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-primary"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Not signed in: show cart then user icon dropdown */}
              <Link to="/cart" className="ml-2 inline-flex items-center gap-2 relative weave-icon" aria-label="Cart" title="View cart">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.2A1 1 0 007.8 21h8.4a1 1 0 001-.8L18 13M7 13h10"></path>
                </svg>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full px-2 py-0.5">{items.length}</span>
                )}
              </Link>

              {/* Not signed in: user icon dropdown with Login/Register */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                  title="Account menu"
                >
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="hidden sm:inline text-sm">Account</span>
                </button>

                {userMenuOpen && (
                  <div role="menu" className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md">
                    <Link role="menuitem" to="/login" onClick={()=>setUserMenuOpen(false)} className="block px-3 py-2 hover:bg-gray-100">Login</Link>
                    <Link role="menuitem" to="/register" onClick={()=>setUserMenuOpen(false)} className="block px-3 py-2 hover:bg-gray-100">Register</Link>
                  </div>
                )}
              </div>
            </>
          )}

          <button className="md:hidden p-2" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu" aria-expanded={open} title="Toggle navigation">
            {open ? (
              <svg aria-hidden="true" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
            <Link to="/shop" onClick={()=>setOpen(false)}>Shop</Link>
            <Link to="/stories" onClick={()=>setOpen(false)}>Stories</Link>
            <Link to="/support" onClick={()=>setOpen(false)}>Support</Link>
            {user ? (
              <>
                        {user.role === 'admin' && (
                          <Link to="/admin" onClick={()=>setOpen(false)}>Admin Dashboard</Link>
                        )}
                <Link to="/profile" onClick={()=>{ setOpen(false); setUserMenuOpen(false); }}>Profile</Link>
                <button onClick={()=>{ logout(); window.location='/'; }} className="text-left text-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={()=>setOpen(false)}>Login</Link>
                <Link to="/register" onClick={()=>setOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}