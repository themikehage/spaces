import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Navigation */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-neutral-950 text-base">
            O
          </div>
          <span className="font-semibold text-lg tracking-tight">OpenAI Hack</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/api/health" className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors">API Health</a>
          <a href="http://localhost:5173" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-medium text-sm rounded-lg transition-colors">
            Launch App
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 flex flex-col justify-center items-center text-center py-20">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-emerald-400 mb-8 animate-fade-in">
          <span>✨ New Release</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-neutral-400 font-normal">v1.0.0 is Live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent mb-6 max-w-3xl leading-[1.1]">
          Orchestrate Multi-Agent Workflows Effortlessly
        </h1>
        
        <p className="text-lg text-neutral-400 max-w-2xl mb-10 leading-relaxed">
          A high-performance monorepo scaffold designed with Hono, Bun, React 19, and TailwindCSS v4. Build, test, and scale agent systems with type-safety out of the box.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="http://localhost:5173" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-90 text-neutral-950 font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/10 text-center">
            Get Started
          </a>
          <a href="#features" className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 font-semibold rounded-xl transition-all text-center">
            Learn More
          </a>
        </div>

        {/* Technical Highlights Section */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left pt-16 border-t border-neutral-900">
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-neutral-200 mb-2">⚡ Hono + Bun Backend</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Ultra-fast runtime execution and API routing with native WebSocket upgrades and built-in hot reloading during development.
            </p>
          </div>
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-neutral-200 mb-2">🎨 React 19 + Tailwind v4</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Modern frontend setup with Vite 6. Fully utilizes CSS-first theme configs, sub-millisecond compilations, and React 19 features.
            </p>
          </div>
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-neutral-200 mb-2">🛡️ End-to-End Type Safety</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Single-source-of-truth Zod schemas defined in a shared library workspace, imported by both server and client to keep models in sync.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-8 px-6 text-center text-xs text-neutral-500">
        <p className="mb-2">OpenAI Hack Landing Page. Created with TailwindCSS v4.</p>
        <p className="font-mono">pnpm + bun + vite + react + tailwind</p>
      </footer>
    </div>
  );
}
