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

  if (loading) {
    return <div className="py-20 text-center text-gray-600">Loading story...</div>;
  }

  if (!story) {
    return <div className="py-20 text-center text-red-500">Story not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-primary hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{story.storyTitle}</h1>

      {story.media_url ? (
        <div className="w-full h-64 mb-6 rounded overflow-hidden shadow">
          <img
            src={story.media_url}
            alt={story.storyTitle}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-64 mb-6 bg-gray-100 flex items-center justify-center text-gray-400 border rounded">
          No media available
        </div>
      )}

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {story.content}
      </p>
    </div>
  );
}
