"use client";

export default function StoryActions({ storyId, api, reload }) {
  return (
    <div className="flex gap-3 mt-4">
      
      {/* Boost Heat */}
      <button
        onClick={() => api.postData("boost", { storyId })}
        className="px-4 py-2 bg-cyan-700 rounded-lg text-sm"
      >
        + Heat
      </button>

      {/* Tier Up */}
      <button
        onClick={() => api.postData("tier", { storyId })}
        className="px-4 py-2 bg-purple-700 rounded-lg text-sm"
      >
        + Tier
      </button>

      {/* Approve */}
      <button
        onClick={() => api.postData("approve", { storyId })}
        className="px-4 py-2 bg-green-600 rounded-lg text-sm"
      >
        Approve
      </button>

      {/* Reject */}
      <button
        onClick={() => api.postData("reject", { storyId })}
        className="px-4 py-2 bg-red-600 rounded-lg text-sm"
      >
        Reject
      </button>

      {/* Force Donation */}
      <button
        onClick={() => api.postData("donate", { storyId })}
        className="px-4 py-2 bg-yellow-600 rounded-lg text-sm"
      >
        Donate
      </button>

    </div>
  );
}
