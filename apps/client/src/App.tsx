import React, { useEffect, useState } from "react";
import { Activity, ShieldAlert, Cpu, RefreshCw, Send, Terminal } from "lucide-react";
import type { HealthStatus } from "shared";

export default function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [wsStatus, setWsStatus] = useState<"Disconnected" | "Connecting" | "Connected">("Disconnected");
  const [wsMessages, setWsMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/health");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch server health");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const connectWebSocket = () => {
    setWsStatus("Connecting");
    
    // Determine ws url dynamically
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws`;
    
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      setWsStatus("Connected");
    };
    
    socket.onmessage = (event) => {
      setWsMessages((prev) => [...prev, `[Server]: ${event.data}`]);
    };
    
    socket.onclose = () => {
      setWsStatus("Disconnected");
      setWs(null);
    };
    
    socket.onerror = () => {
      setWsStatus("Disconnected");
    };
    
    setWs(socket);
  };

  const disconnectWebSocket = () => {
    if (ws) {
      ws.close();
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (ws && ws.readyState === WebSocket.OPEN && inputMessage.trim()) {
      ws.send(inputMessage);
      setWsMessages((prev) => [...prev, `[You]: ${inputMessage}`]);
      setInputMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Header */}
      <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-semibold text-lg leading-tight tracking-tight">OpenAI Hack Workspace</h1>
            <p className="text-xs text-neutral-400">Monorepo Client App</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${wsStatus === "Connected" ? "bg-emerald-500 animate-pulse" : wsStatus === "Connecting" ? "bg-yellow-500 animate-pulse" : "bg-neutral-600"}`}></span>
          <span className="text-xs font-mono text-neutral-400">{wsStatus}</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: API Health & Info */}
        <section className="bg-neutral-900/40 rounded-xl border border-neutral-900 p-6 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                API Server Health
              </h2>
              <button 
                onClick={fetchHealth} 
                disabled={loading}
                className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-400 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Connection Error</h4>
                  <p className="opacity-90">{error}</p>
                </div>
              </div>
            ) : health ? (
              <div className="space-y-4">
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-neutral-500 block">Server Status</span>
                    <span className="text-emerald-400 font-mono font-medium">{health.status.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">Server Time</span>
                    <span className="text-neutral-300 font-mono">{new Date(health.time).toLocaleTimeString()}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-neutral-500 block">Server Uptime</span>
                    <span className="text-neutral-300 font-mono">{health.uptime ? `${health.uptime.toFixed(1)}s` : "N/A"}</span>
                  </div>
                </div>

                <div className="text-sm text-neutral-400 leading-relaxed">
                  The client application is fetching server status validation schemas defined in <code className="text-emerald-400 font-mono">packages/shared</code>. It guarantees that the response from the Hono api server aligns directly with our single-source-of-truth Zod structures.
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-neutral-500">
                Loading server status information...
              </div>
            )}
          </div>

          <div className="border-t border-neutral-900 pt-6 mt-6">
            <h3 className="text-sm font-medium mb-2">Workspace Modules</h3>
            <ul className="text-xs font-mono text-neutral-500 space-y-1">
              <li>• apps/client - React, Vite (this app)</li>
              <li>• apps/landing - Marketing site</li>
              <li>• apps/server - Hono API / WebSocket handler</li>
              <li>• packages/shared - Zod validation models</li>
            </ul>
          </div>
        </section>

        {/* Right Column: WebSocket test client */}
        <section className="bg-neutral-900/40 rounded-xl border border-neutral-900 p-6 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                WS Test Stream
              </h2>
              {wsStatus === "Connected" ? (
                <button
                  onClick={disconnectWebSocket}
                  className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-medium transition-colors"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={connectWebSocket}
                  disabled={wsStatus === "Connecting"}
                  className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                >
                  Connect WS
                </button>
              )}
            </div>

            {/* WS log output */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs text-neutral-400 flex flex-col gap-2 scrollbar-thin">
              {wsMessages.length === 0 ? (
                <div className="text-neutral-600 italic m-auto text-center">
                  {wsStatus === "Connected" ? "Connected! Send a message below to test." : "Connect to WebSocket server to stream messages."}
                </div>
              ) : (
                wsMessages.map((msg, i) => (
                  <div key={i} className={msg.startsWith("[You]") ? "text-emerald-400" : "text-neutral-300"}>
                    {msg}
                  </div>
                ))
              )}
            </div>
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={wsStatus !== "Connected"}
              placeholder={wsStatus === "Connected" ? "Type a message..." : "Connect WebSocket first..."}
              className="flex-1 bg-neutral-950 border border-neutral-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500/40 disabled:opacity-50 text-neutral-100 placeholder:text-neutral-600"
            />
            <button
              type="submit"
              disabled={wsStatus !== "Connected" || !inputMessage.trim()}
              className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-4 px-6 text-center text-xs text-neutral-500 font-mono">
        OpenAI Hack Scaffold Project © 2026. Made with Tailwind CSS v4.
      </footer>
    </div>
  );
}
