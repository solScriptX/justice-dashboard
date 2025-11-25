"use client";

export default function StoryDetails({ params }) {
  const { id } = params;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-cyan-300 mb-4">
        Story Details
      </h1>

      <div className="text-cyan-200">
        <p className="mb-4">Story ID: {id}</p>

        <div className="p-4 bg-black/40 rounded-xl border border-cyan-400/20">
          This page will eventually:
          <ul className="mt-2 text-sm list-disc list-inside space-y-1">
            <li>Show full title, category, and URL</li>
            <li>Display engine timeline</li>
            <li>Show Tier, Heat, boosts, and donations</li>
            <li>Include “Support this rescue” CTA</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
