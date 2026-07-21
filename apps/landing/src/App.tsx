import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-400 overflow-x-hidden relative">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center font-bold text-neutral-950 text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            S
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            SHAPES
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/api/health" className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors">API Health</a>
          <a href="http://localhost:5173" className="relative group overflow-hidden px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-emerald-500/10">
            <span className="relative z-10">Launch App</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 flex flex-col justify-center items-center text-center py-24 relative">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4.5 py-1.5 text-xs font-semibold text-emerald-400 mb-10 animate-pulse">
          <span>✨ Hackathon Demo Live</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-neutral-400 font-normal">v1.0.0</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-b from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent mb-8 max-w-4xl leading-[1.05] filter drop-shadow-sm">
          Orquestá Proyectos Agénticos de Verdad
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mb-12 leading-relaxed font-normal">
          Un gestor donde cada proyecto es un entorno real. Asigná agentes autónomos que no solo chatean: <span className="text-emerald-400 font-medium">corren código, hacen commits, ejecutan tests y despliegan infraestructura</span> a través de herramientas MCP reales en tiempo real.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-24 w-full sm:w-auto">
          <a href="http://localhost:5173" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 hover:opacity-90 text-neutral-950 font-bold rounded-xl transition-all shadow-xl shadow-emerald-500/10 text-center scale-100 hover:scale-[1.02] active:scale-[0.98] duration-200">
            Comenzar Ahora
          </a>
          <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/80 hover:border-neutral-700 text-neutral-200 font-bold rounded-xl transition-all text-center duration-200">
            Conocer Más
          </a>
        </div>

        {/* Live Workfloor Preview Mockup */}
        <div className="w-full max-w-4xl bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4.5 mb-24 backdrop-blur-md shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/80 pointer-events-none" />
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-left">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/70" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>
            <div className="text-xs font-mono text-neutral-500">shapes-live-workfloor.sh</div>
            <div className="w-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono text-xs">
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/60 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 font-bold">● Lead_Controller</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">PLANNING</span>
              </div>
              <p className="text-neutral-400 mb-2">&gt; Analizando alcance del proyecto y desglosando tareas...</p>
              <div className="text-[10px] text-neutral-500 border-t border-neutral-900 pt-2 flex items-center justify-between">
                <span>Task: Setup Boilerplate</span>
                <span className="text-amber-400">Delegando a Backend_Dev →</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/60 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-400 font-bold">● Backend_Dev</span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded">RUNNING</span>
              </div>
              <p className="text-neutral-400 mb-2">&gt; Ejecutando `git init` en sandbox workspace local...</p>
              <div className="text-[10px] text-neutral-500 border-t border-neutral-900 pt-2 flex items-center justify-between">
                <span>Tool: mcp://git/init</span>
                <span className="text-emerald-400">Success (0.42s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Highlights Section */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left pt-16 border-t border-neutral-900">
          <div className="bg-neutral-900/20 border border-neutral-900 hover:border-emerald-500/20 transition-all p-7 rounded-2xl duration-300">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg mb-5">
              📁
            </div>
            <h3 className="text-lg font-bold text-neutral-100 mb-3">Contexto de Proyecto Único</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Cada proyecto es una fuente de verdad con repositorio, documentación y memoria. Los agentes cargan y leen el contexto completo antes de iniciar cualquier loop.
            </p>
          </div>
          <div className="bg-neutral-900/20 border border-neutral-900 hover:border-teal-500/20 transition-all p-7 rounded-2xl duration-300">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg mb-5">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-neutral-100 mb-3">Ejecución Real vía MCP</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Integración nativa con servidores Model Context Protocol. Permite interactuar directamente con Git, bases de datos locales, Coolify, APIs y sistemas de archivos.
            </p>
          </div>
          <div className="bg-neutral-900/20 border border-neutral-900 hover:border-cyan-500/20 transition-all p-7 rounded-2xl duration-300">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg mb-5">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-neutral-100 mb-3">Human-in-the-loop Aprobaciones</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Configurá límites de autonomía. Si un agente propone una acción crítica (deploy, merge, delete), se detiene y solicita aprobación explícita de forma interactiva.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 px-6 text-center text-xs text-neutral-500">
        <p className="mb-2">SHAPES Orquestador de Proyectos Agénticos. Desarrollado para la OpenAI Build Week.</p>
        <p className="font-mono">pnpm + bun + hono + react + vite + tailwind</p>
      </footer>
    </div>
  );
}

