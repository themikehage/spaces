---
name: factory-integrations
description: Manage deployment and database platform templates and bind projects to integration settings.
---

# Platform Integrations & Binding Guide

Integrations bind specific projects to deployment targets like GitHub, Coolify, Neon Postgres, Cloudflare Wrangler, Vercel, and Notion.

### Fetch Integration Templates
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/integrations/templates
```

### Get Bindings for a Project
```bash
wget -qO- --header="Authorization: Bearer $TOKEN" http://localhost:3000/api/integrations/bindings/my-app
```

### Bind Project to Deployment Variables
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"coolifyAppUuid": "app-uuid-1234", "githubRepo": "owner/my-app"}'   http://localhost:3000/api/integrations/bindings/my-app
```
