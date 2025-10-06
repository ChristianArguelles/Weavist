import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function Stories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  // Laravel backend URL (adjust if hosted differently)
  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    try {
      const res = await api.get("/stories");
      setStories(
        Array.isArray(res.data) ? res.data : res.data.data || res.data
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full">
      {/* Intro Section */}
      <div className="bg-white py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold">Explore the Stories of Weaving</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Discover how each creation reflects the artistry of local weavers
            and learn about the communities that keep this heritage alive
            through dedication, creativity, and heart.
          </p>
        </div>
      </div>

      {/* Articles Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold text-primary mb-6">Articles</h2>
        {stories.length === 0 ? (
          <div className="text-gray-600 mb-6">
            No stories available at the moment.
          </div>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {stories.map((s) => {
              const mediaUrl = s.media
                ? s.media.startsWith("http")
                  ? s.media
                  : `${API_URL}${s.media}`
                : null;

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col"
                >
                  {mediaUrl ? (
                    <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3">
                      <img
                        src={mediaUrl}
                        alt={s.storyTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-400 border mb-3">
                      No image
                    </div>
                  )}
                  <h3 className="font-semibold text-lg mb-2 text-left break-words">
                    {s.storyTitle}
                  </h3>
                  <p className="text-sm text-gray-600 text-left one-line">
                    {s.content ? s.content : ""}
                  </p>
                  {/* Button pinned bottom-right with a bit more space above */}
                  <div className="mt-auto pt-3 self-end">
                    <button
                      onClick={() => navigate(`/stories/${s.id}`)}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>


    </div>
  );
}
