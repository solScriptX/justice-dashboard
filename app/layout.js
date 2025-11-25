import "./globals.css";

export const metadata = {
  title: "Justice Engine",
  description: "On-chain rescue radar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050712] text-cyan-100 min-h-screen flex">
        {/* SIDEBAR */}
        <aside className="hidden md:flex flex-col w-60 bg-black/40 border-r border-cyan-400/20 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.15)] p-6 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_0_25px_rgba(34,211,238,0.7)] flex items-center justify-center text-xl">
              ⚖️
            </div>
            <div>
              <h1 className="text-xl font-extrabold">Justice Engine</h1>
              <p className="text-[10px] uppercase tracking-widest text-cyan-300/60">
                On-chain rescue radar
              </p>
            </div>
          </div>

          <nav className="flex flex-col space-y-4 text-sm font-semibold">
            <a className="hover:text-white cursor-pointer">Dashboard</a>
            <a className="hover:text-white cursor-pointer">Live Feed</a>
            <a className="hover:text-white cursor-pointer">Docs</a>
          </nav>

          <div className="mt-auto text-xs text-cyan-300/40">
            Engine v1.0 — solScriptX
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
