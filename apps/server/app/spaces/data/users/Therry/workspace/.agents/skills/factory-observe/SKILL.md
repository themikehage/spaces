---
name: factory-observe
description: Observe running agent sessions and inspect finished executions to analyze patterns, bottlenecks, and errors.
---

# Spaces Execution Observation Guide

You can observe active agent runs and inspect completed execution logs to debug issues and optimize skills.

### Observe an Active Agent (SSE Stream)
To observe an agent in real-time, fetch its live SSE event stream:
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/agents/<agentId>/observe
```

### List Executions for an Agent
To see a history of all executed prompts:
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/agents/<agentId>/executions
```

### Get Execution Details
To inspect a specific execution's tool calls, errors, and message log:
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/agents/<agentId>/executions/<execId>
```
