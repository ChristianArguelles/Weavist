import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

function VideoEmbed({ url, title }) {
  if (!url) return null;
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const embed = url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url;
    return <div className="mt-3"><iframe className="w-full h-64 rounded" src={embed} title={title} frameBorder="0" allowFullScreen></iframe></div>;
  }
  if (url.endsWith('.mp4')) {
    return <video controls className="w-full mt-3 rounded"><source src={url} type="video/mp4" />Your browser does not support the video tag.</video>;
  }
  return null;
}

export default function Stories(){
  const [stories, setStories] = useState([]);

  useEffect(()=>{ fetch(); },[]);

  async function fetch() {
    try {
      const res = await api.get('/stories');
      setStories(Array.isArray(res.data) ? res.data : (res.data.data || res.data));
    } catch(e) { console.error(e); }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Weaving Stories</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(s=>(
          <div key={s.id} className="bg-white rounded shadow overflow-hidden">
            {s.media && <img src={s.media} className="w-full h-48 object-cover" alt={s.storyTitle} />}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{s.storyTitle}</h2>
              <p className="text-gray-600 mt-2">{s.content?.slice(0,120)}...</p>
              <VideoEmbed url={s.video} title={s.storyTitle} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
