import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminProducts(){
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName:'', description:'', productPrice:0, stock:0, image:'' });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ fetchList(); },[]);

  async function fetchList(){
    setLoading(true);
    try { const res = await api.get('/products'); setProducts(res.data); } catch(e){ console.error(e); }
    setLoading(false);
  }

  async function createProduct(e){
    e.preventDefault();
    try {
      await api.post('/products', form);
      setForm({ productName:'', description:'', productPrice:0, stock:0, image:'' });
      fetchList();
    } catch(e) { alert(e.response?.data?.message || e.message); }
  }

  async function deleteProduct(id){
    if(!confirm('Delete product?')) return;
    try { await api.delete(`/products/${id}`); fetchList(); } catch(e){ alert(e.response?.data?.message || e.message); }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      {loading? <div>Loading...</div> : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Stock</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2">{p.id}</td>
                  <td className="px-3 py-2">{p.productName}</td>
                  <td className="px-3 py-2">₱{Number(p.productPrice).toFixed(2)}</td>
                  <td className="px-3 py-2">{p.stock}</td>
                  <td className="px-3 py-2">
                    <button onClick={()=>deleteProduct(p.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={createProduct} className="mt-6 bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Add Product</h2>
        <input value={form.productName} onChange={e=>setForm({...form,productName:e.target.value})} placeholder="Name" className="w-full border rounded px-3 py-2 mb-2" required />
        <input value={form.productPrice} onChange={e=>setForm({...form,productPrice:e.target.value})} placeholder="Price" className="w-full border rounded px-3 py-2 mb-2" required />
        <input value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} placeholder="Stock" className="w-full border rounded px-3 py-2 mb-2" required />
        <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Image URL or path" className="w-full border rounded px-3 py-2 mb-2" />
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full border rounded px-3 py-2 mb-2" />
        <button className="btn-primary">Create Product</button>
      </form>
    </div>
  );
}
