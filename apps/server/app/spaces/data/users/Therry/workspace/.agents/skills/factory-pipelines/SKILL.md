---
name: factory-pipelines
description: Create, run, and monitor deterministic linear execution pipelines.
---

# Linear Pipelines Guide

Pipelines are deterministic, linear sequences of stages. Unlike channels (which are collaborative and conversational), pipelines execute stages strictly in order. A failure at any stage stops the pipeline immediately (fail-fast).

Always use the `manage_pipelines` tool to execute and debug pipelines.

## Stage Types
- **script**: Runs a bash script directly. No LLM. Extremely fast and deterministic.
- **agent**: Delegates to an agent with a prompt, using LLM reasoning.

## Actions available in `manage_pipelines`

### 1. Create or Update a Pipeline (upsert)
Call `manage_pipelines` with `action: "upsert"`, `id: "pipeline-id"`. You can specify stages and save scripts inline:

```json
{
  "action": "upsert",
  "id": "my-pipeline",
  "params": {
    "name": "My Pipeline",
    "description": "Lint and test",
    "stages": [
      {
        "id": "lint",
        "name": "Run Linter",
        "type": "script",
        "script": "lint.sh",
        "timeoutMs": 60000,
        "outputSchema": [
          { "name": "passed", "type": "boolean", "description": "true if lint passed" }
        ]
      },
      {
        "id": "report",
        "name": "Report Results",
        "type": "agent",
        "prompt": "Review the lint result: {{stages.lint.output.passed}}. Report your recommendation."
      }
    ],
    "scripts": {
      "lint.sh": "#!/bin/bash\nset -e\npnpm lint\necho '---OUTPUT---'\necho '{\"passed\":true}'\necho '---END OUTPUT---'"
    }
  }
}
```

### 2. Run a Pipeline (run)
Call `manage_pipelines(action: "run", id: "my-pipeline")` to trigger execution in the background (fire-and-forget). This returns a `runId` immediately:
```json
{ "runId": "run_abc123", "message": "Pipeline started" }
```

### 3. Check Run Summary (get)
Call `manage_pipelines(action: "get", id: "my-pipeline/runs/run_abc123")` to get a quick summary.

### 4. Debug a Failed Run (get_run)
If a run fails, call `manage_pipelines` with `action: "get_run"` and `params: { "runId": "run_abc123" }` to get a detailed status containing the full `rawOutput` and `stderr` of each stage.

### 5. Inspect and Patch Scripts
- Read script: `manage_pipelines(action: "read_script", id: "my-pipeline", params: { "scriptName": "lint.sh" })`
- Patch script: `manage_pipelines(action: "patch_script", id: "my-pipeline", params: { "scriptName": "lint.sh", "content": "#!/bin/bash\n..." })`

### 6. Abort a Run
Call `manage_pipelines(action: "abort", id: "my-pipeline", params: { "runId": "run_abc123" })` to cancel execution.

## Common Debugging Workflow
1. Check failure: `manage_pipelines(action: "get_run", id: "my-pipeline", params: { "runId": "run_abc123" })` to read logs.
2. Read the failing script: `manage_pipelines(action: "read_script", id: "my-pipeline", params: { "scriptName": "lint.sh" })`.
3. Patch the script: `manage_pipelines(action: "patch_script", id: "my-pipeline", params: { "scriptName": "lint.sh", "content": "fixed-content" })`.
4. Re-run execution: `manage_pipelines(action: "run", id: "my-pipeline")`.
