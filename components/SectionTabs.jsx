export default function SectionTabs({ selectedTab, setSelectedTab }) {
  const tabs = ["Pending", "Approved", "Trending"];

  return (
    <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
      {tabs.map((tab) => {
        const active = selectedTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold tracking-wide
              transition-all duration-200 border
              ${
                active
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-cyan-300 shadow-[0_0_25px_rgba(0,255,255,0.8)] scale-[1.07]"
                  : "bg-[#0a0f1c] text-cyan-200 border-cyan-400/30 hover:border-cyan-200/60 hover:text-white hover:shadow-[0_0_18px_rgba(0,255,255,0.45)]"
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
