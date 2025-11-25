export default function TierDisplay({ tier }) {
  const label = typeof tier === "number" ? `Tier ${tier}` : "Tier —";

  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-[10px] sm:text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.7)]">
      <span className="text-[9px]">🎗️</span>
      <span>{label}</span>
    </div>
  );
}
