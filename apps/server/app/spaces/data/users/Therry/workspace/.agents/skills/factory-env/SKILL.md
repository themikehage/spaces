---
name: factory-env
description: Manage global environment variables across the factory for external tools and services.
---

# Global Environment Variables Management

Environment variables are stored securely per user and made available to agent sessions and sub-processes.

### List Environment Variables
```bash
# List variables (values will be masked as ••••••••)
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/env
```

### Reveal a Specific Variable
```bash
# Reveal the value of a specific environment variable (logged for audit)
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/env/reveal/GITHUB_TOKEN
```

### Set a Single Environment Variable
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"key": "GITHUB_TOKEN", "value": "ghp_xxxxxxxxxxxx"}'   http://localhost:3000/api/env
```

### Bulk Update Environment Variables
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --method=PUT   --body-data='{"variables": {"COOLIFY_API_KEY": "secret", "NEON_API_KEY": "secret"}}'   http://localhost:3000/api/env
```
