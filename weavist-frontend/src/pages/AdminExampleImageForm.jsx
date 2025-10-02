import React, { useState } from 'react';
import ImagePicker from '../components/ImagePicker';

export default function AdminExampleImageForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    // Example: send imageUrl and title to backend when creating product/story
    console.log('Save', { title, imageUrl });
    alert('Saved (simulate)');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Create Example</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Image</label>
          <ImagePicker folder="stories" value={imageUrl} onChange={setImageUrl} />
        </div>

        <div className="pt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
