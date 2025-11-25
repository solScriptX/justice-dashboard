export default function HeatBar({ heat }) {
  const safeHeat = Number.isFinite(heat) ? heat : 0;
  const width = Math.max(5, Math.min(100, safeHeat * 5));

  return (
    <div className="w-full h-2.5 rounded-full bg-[#0b0f1a] shadow-inner shadow-black/40 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 shadow-[0_0_10px_rgba(56,189,248,0.9)] transition-all"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
