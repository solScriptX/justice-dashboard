import React from "react";

export default function StoryCard({ story }) {
  return (
    <div
      className="
        rounded-2xl
        bg-[#0c0f17]
        border border-cyan-500/20
        shadow-[0_0_25px_rgba(0,255,255,0.15)]
        p-5
        transition
        hover:shadow-[0_0_35px_rgba(0,255,255,0.4)]
        hover:border-cyan-400/40
      "
    >
      {/* IMAGE (optional) */}
      {story.image && story.image.length > 0 && (
        <div className="w-full h-40 mb-4 rounded-xl overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
          />
        </div>
      )}

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-cyan-300 mb-1">
        {story.title}
      </h2>

      {/* DATE */}
      {story.publishedAt && (
        <p className="text-sm text-cyan-200/60 mb-2">{story.publishedAt}</p>
      )}

      {/* LINK */}
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-200 underline text-sm break-all hover:text-white"
      >
        {story.url}
      </a>

      {/* CATEGORY BADGE */}
      <div className="mt-4 inline-block px-3 py-1 text-xs font-bold rounded-full 
                      bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md">
        {(story.category || "UNKNOWN").toUpperCase()}
      </div>
    </div>
  );
}
