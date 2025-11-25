"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [tab, setTab] = useState("Approved");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const endpoint =
        tab === "Pending"
          ? "pending"
          : tab === "Approved"
          ? "approved"
          : "trending";

      const res = await fetch(`http://100.115.92.206:4000/${endpoint}`);
      const json = await res.json();

      if (tab === "Trending") {
        const mapped = Object.keys(json).map((id) => ({
          storyId: id,
          currentTier: json[id].currentTier,
          heat: json[id].heat,
        }));
        setStories(mapped);
      } else {
        setStories(json);
      }
    } catch (err) {
      console.error("LOAD ERROR:", err);
      setStories([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [tab]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-300 mb-8">
        Justice Engine Dashboard
      </h1>

      <div className="flex gap-3 mb-8">
        {["Pending", "Approved", "Trending"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg border ${
              tab === t
                ? "bg-cyan-300 text-black border-cyan-400"
                : "border-cyan-300 text-cyan-300 hover:bg-cyan-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <div className="text-cyan-300">Loading…</div>}

      {!loading && stories.length === 0 && (
        <div className="text-gray-500">No stories found.</div>
      )}

      {!loading &&
        stories.length > 0 &&
        stories.map((story, i) => (
          <div
            key={i}
            className="p-4 mb-4 bg-zinc-900 rounded-lg border border-zinc-700"
          >
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(story, null, 2)}
            </pre>
          </div>
        ))}
    </div>
  );
}
