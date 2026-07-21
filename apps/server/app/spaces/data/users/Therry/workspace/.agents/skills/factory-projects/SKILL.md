---
name: factory-projects
description: Create new local projects or clone remote Git repositories into the user workspace.
---

# Project Management Guide

Projects are isolated agent contexts. The absolute path structure is:
- User base: user data directory
- Projects root: user projects directory
- Each project workspace: user projects workspace

Your current working directory (CWD) in global mode is your user workspace directory.
To reference projects from your CWD, use the relative path `../projects/<projectId>/workspace/`.

### Create or Clone a Project via API (REQUIRED — do NOT use mkdir/git init manually)
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"name": "my-new-app", "cloneUrl": "https://github.com/example/repo.git"}'   http://localhost:3000/api/workspace-projects
```

To create an empty project (no cloneUrl):
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{"name": "my-new-app"}'   http://localhost:3000/api/workspace-projects
```

### Delegating Work to a Project (CRITICAL)
Once a project is created or cloned, DO NOT create a programmatic agent to work on it. Instead, run prompts directly in the project context using the delegation CLI:
```bash
bun run scripts/delegate.ts --project <projectName> --message "Escribe un componente Button en src/components"
```
