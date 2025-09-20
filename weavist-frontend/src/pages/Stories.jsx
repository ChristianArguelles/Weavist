import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

function VideoEmbed({ url, title }) {
  if (!url) return null;
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const embed = url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url;
    return (
      <div className="mt-3">
        <iframe
          className="w-full h-64 rounded"
          src={embed}
          title={title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  if (url.endsWith('.mp4')) {
    return (
      <video controls className="w-full mt-3 rounded">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return null;
}

export default function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    try {
      const res = await api.get('/stories');
      setStories(Array.isArray(res.data) ? res.data : (res.data.data || res.data));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {/* Intro Section */}
      <div className="bg-white py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold">Explore the Stories of Weaving</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="mt-2 max-w-2xl mx-auto text-gray-600">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Articles</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stories.map((s) => (
            <div key={s.id} className="relative rounded-lg overflow-hidden shadow-md">
              {s.media && (
                <img
                  src={s.media}
                  className="w-full h-56 object-cover"
                  alt={s.storyTitle}
                />
              )}
              <div className="absolute bottom-4 left-0 w-full flex justify-center">
                <button className="bg-[#6b1c1c] text-white px-6 py-2 rounded">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Watch Section */}
        <h2 className="text-2xl font-bold mb-6 text-center">Watch the Beauty of Weaving</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {stories.filter((s) => s.video).map((s) => (
            <div key={s.id} className="flex gap-6 items-center">
              <div className="flex-shrink-0 w-48">
                {s.media && (
                  <img
                    src={s.media}
                    className="w-full h-32 object-cover rounded"
                    alt={s.storyTitle}
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-xl">{s.storyTitle}</h3>
                <p className="text-gray-600 mt-2">{s.content?.slice(0, 120)}...</p>
                <button className="mt-4 bg-[#6b1c1c] text-white px-6 py-2 rounded">
                  Watch Now
                </button>
                <VideoEmbed url={s.video} title={s.storyTitle} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
