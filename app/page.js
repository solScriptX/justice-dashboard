"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const res = await fetch("http://100.115.92.206:4000/approved");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Justice Engine — Live Data Test
      </h1>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          Error: {error}
        </div>
      )}

      {!error && !data && <div>Loading…</div>}

      {data && (
        <pre
          style={{
            background: "#111",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
