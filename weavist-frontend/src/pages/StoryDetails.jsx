import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [otherStories, setOtherStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchStory();
    fetchOtherStories();
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

  async function fetchOtherStories() {
    try {
      const res = await api.get("/stories");
      const allStories = Array.isArray(res.data) ? res.data : res.data.data || res.data;
      setOtherStories(allStories.filter(s => s.id !== Number(id)));
    } catch (e) {
      console.error("Error fetching other stories:", e);
    }
  }

  function getYoutubeEmbed(url) {
    if (!url) return null;
    try {
      if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
      if (url.includes("youtu.be/")) {
        const vidId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${vidId}`;
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  if (loading) return <div className="py-20 text-center text-gray-600">Loading story...</div>;
  if (!story) return <div className="py-20 text-center text-red-500">Story not found</div>;

  const paragraphs = (story.content || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="mb-6 text-primary hover:underline">
        ← Back
      </button>

      <h1 className="text-4xl font-bold tracking-tight mb-2">{story.storyTitle}</h1>
      <div className="text-sm text-gray-500 mb-6">A story from the Weavist community</div>
      <hr className="border-gray-200 mb-8" />

      {story.media_url ? (
        <div className="w-full h-100 mb-8 rounded overflow-hidden shadow">
          <img src={story.media_url} alt={story.storyTitle} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-64 mb-8 bg-gray-100 flex items-center justify-center text-gray-400 border rounded">
          No media available
        </div>
      )}

      <article className="text-gray-800 text-lg leading-8 space-y-6">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, idx) => {
            // Insert YouTube after the 2nd paragraph (index 1)
            if (idx === 1 && getYoutubeEmbed(story.video)) {
              return (
                <React.Fragment key={idx}>
                  <p>{p}</p>
                  <div className="my-9 flex justify-center">
                    <div
                      className="relative rounded shadow w-full sm:w-11/12 md:w-5/6"
                      style={{ paddingTop: '45%' }} // maintain aspect ratio
                    >
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={getYoutubeEmbed(story.video)}
                        title={story.storyTitle}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center items-center text-sm">
                    <div className="-mt-3 mb-4 text-sm text-center">
                      <span className="text-gray-800 font-medium">Video Source: </span>
                      <a
                        href={story.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline font-medium"
                      >
                        {story.video}
                      </a>
                    </div>
                  </div>
                </React.Fragment>
              );
            }
            return <p key={idx}>{p}</p>;
          })
        ) : (
          <p>{story.content}</p>
        )}
      </article>

      {/* Other Stories Section */}
      {otherStories.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Other Stories</h2>
          <div className="max-w-4xl mx-auto flex flex-col gap-6 px-4">
            {otherStories.map((s) => {
              const mediaUrl = s.media
                ? s.media.startsWith("http")
                  ? s.media
                  : `${API_URL}${s.media}`
                : null;

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 cursor-pointer hover:shadow-lg transition"
                >
                  {/* Image on the left */}
                  {mediaUrl ? (
                    <div className="sm:w-1/3 h-48 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <img
                        src={mediaUrl}
                        alt={s.storyTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="sm:w-1/3 h-48 flex-shrink-0 rounded-md flex items-center justify-center text-sm text-gray-400 border bg-gray-100">
                      No image
                    </div>
                  )}

                  {/* Title + Content Preview */}
                  <div className="sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{s.storyTitle}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {s.content || ""}
                      </p>
                    </div>

                    {/* Read More button at bottom-right */}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => navigate(`/stories/${s.id}`)}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
