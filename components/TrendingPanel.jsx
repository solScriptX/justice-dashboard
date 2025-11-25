export default function TrendingPanel({ trending }) {
  return (
    <div className="w-full mb-10 p-6 rounded-2xl bg-black/40 border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.15)]">
      <h2 className="text-xl font-bold text-cyan-300 mb-4">
        🔥 Live Trending Heat
      </h2>

      {!trending && (
        <p className="text-cyan-200/50 text-sm">
          No trending data yet. Engine is warming up…
        </p>
      )}

      {trending && (
        <div>
          <p className="text-cyan-200 text-sm mb-3">
            Top story ID: <span className="text-white">{trending.storyId}</span>
          </p>

          {/* HEAT BAR */}
          <div className="w-full bg-cyan-900/20 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              style={{ width: `${Math.min(100, trending.heat * 5)}%` }}
            ></div>
          </div>

          <p className="text-xs text-cyan-300/70 mt-2">
            Heat: <span className="text-white">{trending.heat}</span> · Tier{" "}
            {trending.tier}
          </p>
        </div>
      )}
    </div>
  );
}
