import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await api.get("/products");
      const raw = Array.isArray(res.data)
        ? res.data
        : res.data.data || res.data;
      setProducts(raw.map((p) => ({ ...p })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Explore Weaving Collections</h2>
          <div className="flex items-center gap-3 relative">
            {/* Search input */}
            <input
              placeholder="Search products"
              className="border rounded-full px-4 py-2 w-64"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') setQuery(e.target.value); }}
              aria-label="Search products"
            />

            {/* Search button - focuses input or triggers client-side search (we filter below) */}
            <button
              onClick={() => document.querySelector('input[aria-label="Search products"]').focus()}
              className="p-2 weave-icon rounded hover:bg-gray-100"
              aria-label="Focus search"
              title="Focus search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
              </svg>
            </button>

            {/* Filter toggle */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(v => !v)}
                className="p-2 weave-icon rounded hover:bg-gray-100"
                aria-expanded={showFilters}
                aria-controls="shop-filters"
                aria-label="Toggle filters"
                title="Filters"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M6 12h12M10 19h4" />
                </svg>
              </button>

              {showFilters && (
                <div id="shop-filters" className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md p-3 z-40">
                  <div className="text-sm font-semibold mb-2">Filters</div>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Handwoven</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Scarves</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Bags</label>
                </div>
              )}
            </div>

            {/* Cart button */}
            <button onClick={() => navigate("/cart")} className="p-2 weave-icon rounded hover:bg-gray-100" aria-label="View cart" title="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.2A1 1 0 007.8 21h8.4a1 1 0 001-.8L18 13" />
              </svg>
            </button>
          </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products
              .filter(p => p.productName?.toLowerCase().includes((query || '').toLowerCase()))
              .map((p) => (
                <ProductCard key={p.id} product={p} onAdd={() => addItem(p, 1)} />
              ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
