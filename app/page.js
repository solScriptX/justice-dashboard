"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [tab, setTab] = useState("Approved");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    try {
      let url = "http://100.115.92.206:4000";

      if (tab === "Pending") url += "/pending";
      if (tab === "Approved") url += "/approved";
      if (tab === "Trending") url += "/trending";

      const res = await fetch(url);
      const json = await res.json();

      // Trending returns an object → convert to list
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
      console.error("Error loading:", err);
      setStories([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [tab]);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Justice Engine Dashboard
      </h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {["Pending", "Approved", "Trending"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 20px",
              background: tab === t ? "#0ff3" : "#333",
              border: "1px solid #0ff6",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <div>Loading…</div>}

      {!loading && stories.length === 0 && <div>No stories found.</div>}

      {!loading &&
        stories.length > 0 &&
        stories.map((s, i) => (
          <pre
            key={i}
            style={{
              background: "#111",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            {JSON.stringify(s, null, 2)}
          </pre>
        ))}
    </div>
  );
}
