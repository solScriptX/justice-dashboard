"use client";

import { useState, useEffect } from "react";
import JusticeClient from "../utils/justiceClient";
import SectionTabs from "../components/SectionTabs";
import StoryCard from "../components/StoryCard";
import HeatBar from "../components/HeatBar";
import TierDisplay from "../components/TierDisplay";
import TrendingPanel from "../components/TrendingPanel";
import StoryActions from "../components/StoryActions";

// DIRECT BACKEND URL — guaranteed working
const api = new JusticeClient("http://100.115.92.206:4000");

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("Approved");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    try {
      setLoading(true);

      if (selectedTab === "Pending") {
        const res = await api.fetchData("/pending");
        setStories(res || []);
      }

      if (selectedTab === "Approved") {
        const res = await api.fetchData("/approved");
        setStories(res || []);
      }

      if (selectedTab === "Trending") {
        const res = await api.fetchData("/trending");
        const mapped = Object.keys(res || {}).map((id) => ({
          storyId: id,
          currentTier: res[id].currentTier,
          heat: res[id].heat,
        }));
        setStories(mapped);
      }
    } catch (err) {
      console.error("Error loading:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [selectedTab]);

  return (
    <div className="p-8 w-full text-cyan-100">
      <div className="w-full text-center mb-12 p-8 rounded-2xl bg-black/30 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_35px_rgba(0,255,255,0.25)]">
        <h1 className="text-4xl font-extrabold text-cyan-300 drop-shadow-[0_0_18px_rgba(0,255,255,0.8)]">
          Justice Engine Dashboard
        </h1>
        <p className="text-cyan-200/70 mt-3 text-sm tracking-wide">
          Real-time rescue monitoring — pending → approved → trending.
        </p>
      </div>

      <SectionTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="space-y-8 mt-8">
        {loading && <div className="text-center text-cyan-300/60">Loading…</div>}

        {!loading && stories.length === 0 && (
          <div className="text-center text-cyan-300/60">No stories found.</div>
        )}

        {!loading &&
          stories.length > 0 &&
          stories.map((story, i) => (
            <div key={i} className="mb-6">
              <StoryCard story={story} />

              {"currentTier" in story && (
                <div className="mt-4 flex gap-6 items-center">
                  <TierDisplay tier={story.currentTier} />
                  <HeatBar heat={story.heat} />
                </div>
              )}

              <StoryActions
                storyId={story.storyId}
                api={api}
                reload={loadData}
              />
            </div>
          ))}

        {selectedTab === "Trending" && stories.length > 0 && (
          <TrendingPanel stories={stories} />
        )}
      </div>
    </div>
  );
}
