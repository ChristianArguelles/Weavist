import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import ImagePicker from '../../components/ImagePicker';

export default function AdminProducts(){
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName:'', description:'', productPrice:0, stock:0, image:'' });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{ fetchList(); },[]);

  async function fetchList(){
    setLoading(true);
    try { const res = await api.get('/products'); const sorted = (res.data||[]).slice().sort((a,b)=>a.id - b.id); setProducts(sorted); } catch(e){ console.error(e); }
    setLoading(false);
  }

  function openAdd(){ setForm({ productName:'', description:'', productPrice:0, stock:0, image:'' }); setEditingId(null); setModalOpen(true); }
  function openEdit(p){ setForm({ productName:p.productName, description:p.description, productPrice:p.productPrice, stock:p.stock, image:p.image }); setEditingId(p.id); setModalOpen(true); }
  
  useEffect(() => {
    if (modalOpen && form.image && !form.image.startsWith('http')) {
      setForm(f => ({ ...f, image: `http://127.0.0.1:8000${f.image.startsWith('/') ? '' : '/'}${f.image}` }));
    }
  }, [modalOpen]);

  async function submitForm(e){ e.preventDefault(); try { if(editingId){ await api.put(`/products/${editingId}`, form); } else { await api.post('/products', form); } setModalOpen(false); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  async function deleteProduct(id){ if(!confirm('Delete product?')) return; try { await api.delete(`/products/${id}`); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); } }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div>
          <button onClick={openAdd} className="btn-primary">Add Product</button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        {loading ? <div className="p-4">Loading...</div> : (
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-center">ID</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Description</th>
                <th className="px-3 py-2 text-center">Price</th>
                <th className="px-3 py-2 text-center">Stock</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-3 py-6 text-center text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">{p.id}</td>
                    <td className="px-3 py-2 max-w-[200px] whitespace-normal break-words">
                      {p.productName}
                    </td>
                    <td className="px-3 py-2 max-w-[300px] whitespace-normal break-words text-gray-600">
                      {p.description || "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      ₱{Number(p.productPrice).toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-center">{p.stock}</td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="bg-primary text-white px-2 py-1 rounded hover:bg-primary-hover transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="bg-primary text-white px-2 py-1 rounded hover:bg-primary-hover transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur Overlay */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/30"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-white/40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitForm} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  value={form.productName}
                  onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  placeholder="Enter product name"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 ring-accent focus:outline-none"
                  required
                />
              </div>

              {/* Price & Stock in Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₱)
                  </label>
                  <input
                    type="number"
                    value={form.productPrice}
                    onChange={(e) =>
                      setForm({ ...form, productPrice: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 ring-accent focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="0"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 ring-accent focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Image picker (upload or choose existing) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <ImagePicker folder="products" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Write a short description..."
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 ring-accent focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg shadow bg-primary-hover transition"
                >
                  {editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
