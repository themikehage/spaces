---
name: factory-channels
description: Create collaboration channels, manage members, and delegate tasks to agent teams.
---

# Multi-Agent Collaboration Channels Guide

Channels enable autonomous coordination among multiple programmatic agents.

### List Channels
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/channels
```

### Create a Collaboration Channel
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"id": "dev-team", "name": "Development Team", "description": "Channel for frontend and backend agents."}'   http://localhost:3000/api/channels
```

### Add Member Agent to Channel
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"agentId": "code-reviewer", "replyMode": "auto"}'   http://localhost:3000/api/channels/dev-team/members
```

### Delegate Task to Channel (Recommended)
Always use the native `delegate_task` tool to prompt and delegate tasks to channels:
`delegate_task(targetType: "channel", targetId: "dev-team", task: "Review latest feature")`
DO NOT use curl or bash command scripts.
