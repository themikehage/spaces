---
name: factory-agents
description: Register, prompt, and delegate tasks to autonomous programmatic agents.
---

# Autonomous Programmatic Agents Guide

Programmatic agents are independent AI workers with isolated workspaces. You can delegate tasks to them using our unified delegation CLI:

### List Active Agents
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/agents
```

### Register a New Agent
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{
    "id": "code-reviewer",
    "name": "Code Reviewer Agent",
    "role": "reviewer",
    "systemPrompt": "You are a senior code reviewer enforcing clean architecture.",
    "model": "anthropic/claude-3-5-sonnet-20241022"
  }'   http://localhost:3000/api/agents
```

### Delegate Task to Agent (Recommended)
Always use the native `delegate_task` tool to prompt and delegate tasks to programmatic agents:
`delegate_task(targetType: "agent", targetId: "code-reviewer", task: "Please review the codebase")`
DO NOT use curl or bash command scripts to communicate with other agents.

### Stop an Agent
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --method=DELETE   http://localhost:3000/api/agents/code-reviewer
```
