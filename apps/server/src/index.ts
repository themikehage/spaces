import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createBunWebSocket } from "hono/bun";
import { HealthStatusSchema } from "shared";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();

// CORS middleware
app.use(
  "/*",
  cors({
    origin: (origin) => origin || "*",
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Logging middleware
app.use("/*", logger());

// Health Check API
app.get("/api/health", (c) => {
  const data = {
    status: "ok",
    time: Date.now(),
    uptime: process.uptime(),
  };
  
  // Validate using shared package schema
  const parsed = HealthStatusSchema.safeParse(data);
  if (!parsed.success) {
    return c.json({ error: "Invalid health check schema" }, 500);
  }
  
  return c.json(parsed.data);
});

// WebSocket Server Endpoint
app.get(
  "/ws",
  upgradeWebSocket(() => {
    return {
      onOpen(evt, ws) {
        console.log("WebSocket connection established");
        ws.send("Hello from Hono/Bun WebSocket!");
      },
      onMessage(evt, ws) {
        console.log(`Received message: ${evt.data}`);
        ws.send(`Echo: ${evt.data}`);
      },
      onClose(evt, ws) {
        console.log("WebSocket connection closed");
      },
    };
  })
);

// Fallback index.html (or static files if needed)
app.get("/", (c) => c.text("OpenAI Hack Scaffold API Server Running!"));

const port = parseInt(process.env.PORT ?? "3000");

const server = Bun.serve({
  fetch: app.fetch,
  port,
  websocket,
});

console.log(`Server running at http://localhost:${server.port}`);
