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
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050a18] to-black text-cyan-200 p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-center mb-10
        drop-shadow-[0_0_18px_rgba(0,255,255,0.6)]
        text-cyan-300 tracking-wide">
        ⚡ Justice Engine Dashboard ⚡
      </h1>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-10">
        {["Pending", "Approved", "Trending"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 rounded-xl border transition-all duration-200 text-sm font-bold tracking-wider
              ${
                tab === t
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.9)] scale-105 border-cyan-300"
                  : "border-cyan-600 text-cyan-300 hover:bg-cyan-900/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto space-y-6">

        {loading && (
          <div className="text-center text-cyan-400 animate-pulse text-lg">
            Loading…
          </div>
        )}

        {!loading && stories.length === 0 && (
          <div className="text-center text-cyan-600 text-lg">
            No stories found.
          </div>
        )}

        {!loading &&
          stories.length > 0 &&
          stories.map((story, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.15)]
              hover:shadow-[0_0_45px_rgba(0,255,255,0.4)] hover:border-cyan-300 transition-all duration-300"
            >
              {/* TITLE */}
              <h2 className="text-2xl font-bold text-cyan-300 mb-2">
                {story.title || `Story ${story.storyId}`}
              </h2>

              {/* METADATA */}
              <div className="text-xs text-cyan-300/60 mb-4">
                {story.category && <span>Category: {story.category} • </span>}
                {story.publishedAt && <span>{story.publishedAt}</span>}
              </div>

              {/* TRENDING INFO */}
              {"currentTier" in story && (
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-sm text-cyan-200">
                    <span className="font-bold">Tier:</span> {story.currentTier}
                  </div>
                  <div className="text-sm text-cyan-200">
                    <span className="font-bold">Heat:</span> {story.heat}
                  </div>
                </div>
              )}

              {/* RAW JSON */}
              <pre className="text-xs text-cyan-100/70 bg-black/30 rounded-xl p-4 overflow-x-auto">
                {JSON.stringify(story, null, 2)}
              </pre>
            </div>
          ))}
      </div>
    </div>
  );
}
