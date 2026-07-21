---
name: factory-quick-actions
description: Compile optimized scripts and register them as reusable Quick Actions for specific projects.
---

# Reusable Quick Actions Guide

When you notice a repetitive sequence of commands or a pattern of errors that is easily fixed with a script, compile a helper script and register it as a Quick Action.

### 1. Write the script
Save a script under `workspace/assets/scripts/<name>.sh` or inside the repo.

### 2. Register/Update Quick Action Template
Fetch current templates, then write an updated definition to integrations catalog:
```bash
wget -qO- --header="Authorization: Bearer $TOKEN"   --header="Content-Type: application/json"   --post-data='{
    "templates": [
      {
        "id": "my-custom-integration",
        "name": "Custom Integration",
        "actions": [
          {
            "id": "custom-script",
            "name": "Run Custom Script",
            "prompt": "Run script: workspace/assets/scripts/my-script.sh",
            "description": "Executes optimized custom commands."
          }
        ]
      }
    ]
  }'   http://localhost:3000/api/integrations/templates
```
