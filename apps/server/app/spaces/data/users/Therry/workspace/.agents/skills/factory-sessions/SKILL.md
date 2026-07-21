---
name: factory-sessions
description: List, inspect, delete, and analyze agent sessions and execution logs across projects, agents, channels, and experiments.
---

# Spaces Sessions Management & Analysis Guide

As the Global Spaces Director, you can manage the lifecycle of all active and historic sessions, send prompts to specific sessions, and analyze their logs for performance, error tracking, and benchmark metrics.

All actions are performed via Hono REST endpoints and require the `Authorization: Bearer $TOKEN` header.

## 1. Session Discovery

### List All Sessions
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/sessions
```

### Filter Sessions by Entity Type (using bun's JSON parser)
```bash
# By Project:
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/sessions | bun -e "
const data = await Bun.stdin.text();
const sessions = JSON.parse(data).sessions || [];
sessions.filter(s => s.projectName).forEach(s => console.log(s.id, s.name));
"
```

```bash
# By Programmatic Agent:
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/sessions | bun -e "
const data = await Bun.stdin.text();
const sessions = JSON.parse(data).sessions || [];
sessions.filter(s => s.agentId).forEach(s => console.log(s.id, s.name));
"
```

```bash
# By Channel:
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/sessions | bun -e "
const data = await Bun.stdin.text();
const sessions = JSON.parse(data).sessions || [];
sessions.filter(s => s.channelId).forEach(s => console.log(s.id, s.name));
"
```

---

## 2. Session Interaction

### Send prompt to a Session (Awaited REST)
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"message": "Please run typecheck on apps/server"}'   http://localhost:3000/api/sessions/<session-id>/prompt
```

### Send prompt with Real-time Streaming (CLI)
You can delegate prompt execution using the CLI helper, which automatically resolves or creates the underlying session:
```bash
bun run scripts/delegate.ts --project <projectName> --message "<prompt>"
bun run scripts/delegate.ts --agent <agentId> --message "<prompt>"
bun run scripts/delegate.ts --channel <channelId> --message "<prompt>"
```

---

## 3. Session Diagnostics & Error Analysis

### Fetch Message History
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/sessions/<session-id>/messages
```

### Troubleshooting Patterns
When checking for failures, parse the message array:
- **Agent Errors:** Find objects with `type: "agent_error"` to inspect Hono server or provider execution crashes.
- **Tool Failures:** Find tool calls within messages or history events where `isError: true` or the result contains exception stacks.
- **Execution Bottlenecks:** Measure the latency between `tool_execution_start` and `tool_execution_end` events to find hanging bash operations or heavy bundle builds.

---

## 4. Experiment Introspection
To inspect debates and variants in laboratory simulations:

1. **List all experiments:**
   ```bash
   wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/experiments
   ```
2. **Fetch active sessions from variants:**
   Filter the experiment JSON to find:
   - Baseline single-run session: `variants.single.activeSessionId`
   - Collaborative no-leader session: `variants.multiNoLeader.activeSessionId`
   - Hierarchical debate session: `variants.multiWithLeader.activeSessionId`
3. **Read logs:** Fetch messages for those session IDs using the standard `/api/sessions/:id/messages` route to compare agent statements and judge reasonings.

---

## 5. Session Cleanup
Delete any stalled or redundant session:
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --method=DELETE   http://localhost:3000/api/sessions/<session-id>
```
