import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStory();
  }, [id]);

  async function fetchStory() {
    try {
      const res = await api.get(`/stories/${id}`);
      setStory(res.data);
    } catch (e) {
      console.error("Error fetching story:", e);
    } finally {
      setLoading(false);
    }
  }

  function getYoutubeEmbed(url) {
    if (!url) return null;
    try {
      if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
      }
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  if (loading) {
    return <div className="py-20 text-center text-gray-600">Loading story...</div>;
  }

  if (!story) {
    return <div className="py-20 text-center text-red-500">Story not found</div>;
  }

  const paragraphs = (story.content || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-primary hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold tracking-tight mb-2">{story.storyTitle}</h1>
      <div className="text-sm text-gray-500 mb-6">A story from the Weavist community</div>
      <hr className="border-gray-200 mb-8" />

      {story.media_url ? (
        <div className="w-full h-72 mb-8 rounded overflow-hidden shadow">
          <img
            src={story.media_url}
            alt={story.storyTitle}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-64 mb-8 bg-gray-100 flex items-center justify-center text-gray-400 border rounded">
          No media available
        </div>
      )}

      {getYoutubeEmbed(story.video) ? (
        <div className="my-10">
          <div className="relative w-full overflow-hidden rounded shadow" style={{paddingTop: '56.25%'}}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getYoutubeEmbed(story.video)}
              title={story.storyTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Citation */}
          <div className="mt-4 flex justify-between items-center text-sm">
            <div>
              <div className="text-gray-800 font-medium">Video Source</div>
              <div className="text-gray-600">YouTube</div>
            </div>
            <a 
              href={story.video} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent hover:underline font-medium"
            >
              View on YouTube →
            </a>
          </div>
        </div>
      ) : null}

      <article className="text-gray-800 text-lg leading-8 space-y-6">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
        ) : (
          <p>{story.content}</p>
        )}
      </article>
    </div>
  );
}
