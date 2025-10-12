import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

// Selection-only ImagePicker: shows current preview and a button (labelled Upload)
// that opens a modal to choose from existing uploaded images. No file upload is performed here.
export default function ImagePicker({ folder = 'uploads', value, onChange }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/admin/uploads', { params: { folder }, withCredentials: true });
      const itemsRaw = resp.data?.data || [];
      const normalized = itemsRaw.map(it => ({ ...it, url: it.url || (it.path ? `${window.location.origin}/storage/${it.path}` : undefined) }));
      setItems(normalized);
    } catch (err) {
      console.error(err);
      alert('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchItems();
  }, [open]);

  return (
    <div>
      {value && (
        <div className="mt-3">
          <img src={value} alt="preview" className="w-48 h-32 object-cover rounded mt-1" />
        </div>
      )}

      <div className="mt-2">
        <button type="button" onClick={() => setOpen(true)} className="px-3 py-2 border rounded">Upload</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-4xl rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Choose image</h3>
              <div>
                <button type="button" className="mr-2" onClick={() => fetchItems()}>Refresh</button>
                <button type="button" onClick={() => setOpen(false)}>Close</button>
              </div>
            </div>

            {loading ? <div>Loading...</div> : (
              <div className="grid grid-cols-4 gap-3">
                {items.length === 0 && <div className="col-span-4 text-sm text-gray-600">No images yet</div>}
                {items.map((it) => (
                  <div key={it.path} className="cursor-pointer" onClick={() => { if (onChange) onChange(it.url); setOpen(false); }}>
                    <img src={it.url} alt={it.name} className="w-full h-32 object-cover rounded" />
                    <div className="text-sm truncate">{it.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
