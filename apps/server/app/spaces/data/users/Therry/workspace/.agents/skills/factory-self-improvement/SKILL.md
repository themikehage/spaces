---
name: factory-self-improvement
description: Run a structured self-evaluation suite that exercises each factory capability with real prompts, then analyzes results to produce an actionable improvement report.
---

# Spaces Self-Improvement Protocol

This skill runs a structured evaluation of the Global Spaces Director's capabilities. It targets specific factory skills to run test prompts, collects results, and produces an actionable improvement report.

### Step 0: User Consultation (MANDATORY FIRST STEP)
Before executing any exercises, you MUST ask the user which capability or area they would like to evaluate and improve (e.g., environment/providers, project management/delegation, subagent spawning, agents, channels, custom skills, or session introspection), or if they prefer to run the full diagnostic suite.
Only proceed to execute the corresponding exercise(s) after receiving the user's choice.

---

## Phase 1 — Execution Suite

Execute the chosen exercise(s) below. After each one, record: what happened, whether it succeeded, and any friction or unexpected behavior you encountered.

---

### Exercise 1 — Environment Introspection (factory-env)

**Prompt to execute:**
> "List all configured environment variables and summarize how many are set. Do not reveal values."

**Expected outcome:** A bash call to `GET /api/env` returns a JSON array. The agent summarizes the count and key names without exposing secrets.

**What to check:** Did the agent use curl correctly with the Bearer token? Did it expose any values accidentally? Was the output clear and concise?

---

### Exercise 2 — Provider Status Check (factory-providers)

**Prompt to execute:**
> "List all configured LLM providers and tell me which ones are authenticated (have an API key set)."

**Expected outcome:** A call to `GET /api/providers` returns a list with `isConfigured` flags. The agent summarizes which providers are ready.

**What to check:** Did the agent distinguish between configured and unconfigured providers? Did it avoid setting or modifying any keys without being asked?

---

### Exercise 3 — Project Creation (factory-projects)

**Prompt to execute:**
> "Create an empty project named 'self-eval-test' in my workspace."

**Expected outcome:** The agent calls `POST /api/workspace-projects` with `name: "self-eval-test"` (no cloneUrl). Returns the new project's ID.

**What to check:** Did the agent use the API correctly instead of running `mkdir` or `git init` in bash? Did it confirm the project was created and provide the ID?

---

### Exercise 4 — Project Delegation (factory-projects + delegate_task)

**Prompt to execute:**
> "Delegate this task to the project 'self-eval-test': Write a file called README.md with a single line: 'Self-evaluation test project'."

**Expected outcome:** The agent uses `delegate_task(targetType: "project", targetId: "self-eval-test", task: "...")`. The subagent executes and the file is created.

**What to check:** Did the agent use `delegate_task` instead of running bash commands itself? Did it verify the outcome by reading the file afterward?

---

### Exercise 5 — Spawn Subagent (spawn_subagent)

**Prompt to execute:**
> "Spawn a subagent with the role of 'TypeScript code verifier'. Give it this task: list all .ts files under apps/server/src/core/ and count them. Return the count."

**Expected outcome:** The agent calls `spawn_subagent` with an appropriate system prompt and task. The subagent returns a result. The parent agent extracts the count from the envelope response (`status`, `executive_summary`, `artifacts`).

**What to check:** Did the parent parse the subagent's response correctly? Was the envelope properly structured? Did the parent report the result to the user without re-running the task?

---

### Exercise 6 — Programmatic Agent Registration (factory-agents)

**Prompt to execute:**
> "Register a new temporary programmatic agent with id 'eval-worker', name 'Eval Worker', role 'evaluator', and use the default configured model. Give it this system prompt: 'You are a code evaluation assistant. Reply concisely in English.'"

**Expected outcome:** The agent calls `POST /api/agents` with the correct body. Returns the agent entry.

**What to check:** Did the agent construct the JSON body correctly? Did it identify the default model from the modelRegistry or provider config? Did it avoid hardcoding a model string?

---

### Exercise 7 — Agent Delegation (factory-agents + delegate_task)

**Prompt to execute:**
> "Delegate this task to the agent 'eval-worker': Summarize what the file apps/server/src/core/agent-utils.ts does in 2 sentences."

**Expected outcome:** The agent calls `delegate_task(targetType: "agent", targetId: "eval-worker", task: "...")`. The eval-worker responds with a 2-sentence summary.

**What to check:** Did the agent use `delegate_task` correctly? Did it return the delegated agent's response clearly to the user?

---

### Exercise 8 — Channel Creation (factory-channels)

**Prompt to execute:**
> "Create a collaboration channel named 'eval-channel' with a description 'Temporary evaluation channel'."

**Expected outcome:** The agent calls `POST /api/channels` with the correct body. Returns the channel ID.

**What to check:** Did the agent create the channel via the API? Did it confirm the channel ID to the user?

---

### Exercise 9 — Skill Creation (factory-skills)

**Prompt to execute:**
> "Create a new skill called 'hello-world-skill'. The skill description should be 'A minimal test skill.' The SKILL.md content should just say: '# Hello World. This skill does nothing. It is a test.'"

**Expected outcome:** The agent creates the directory `.agents/skills/hello-world-skill/` and writes a `SKILL.md` file with valid YAML frontmatter (`name` and `description` fields) and the provided content.

**What to check:** Did the agent use the correct path relative to the global workspace CWD? Is the YAML frontmatter valid?

---

### Exercise 10 — Session Introspection (factory-sessions)

**Prompt to execute:**
> "List the 5 most recently updated sessions and summarize their names, statuses, and whether they belong to a project or agent."

**Expected outcome:** The agent calls `GET /api/sessions` and parses the response, producing a readable summary table or list.

**What to check:** Did the agent handle pagination or empty results gracefully? Did it avoid fetching full message histories unnecessarily?

---

## Phase 2 — Analysis

After completing all exercises, reflect on the entire execution trace:

1. **Failures:** Which exercises failed entirely or produced incorrect output? What was the root cause?
2. **Friction Points:** Where did you hesitate, make an extra API call to verify something, or correct a mistake mid-execution?
3. **Skill Gaps:** For each exercise, is the corresponding factory skill (`factory-env`, `factory-projects`, etc.) clear enough? What information was missing or ambiguous?
4. **Prompt Clarity:** Were the exercise prompts unambiguous? Which prompts could be reworded to produce better first-attempt results?
5. **Tool Misuse Patterns:** Did you default to bash/curl when a native tool (`delegate_task`, `spawn_subagent`) should have been used instead?

---

## Phase 3 — Improvement Report

Produce a structured report in this exact format:

```
# Self-Improvement Report — [Date]

## Summary
[1-2 sentence overview of the evaluation run]

## Exercise Results
| Exercise | Status | Notes |
|----------|--------|-------|
| 1. ENV Introspection | Pass / Partial / Fail | [brief note] |
| 2. Provider Status | ... | ... |
...

## Critical Issues
[Numbered list of things that broke or produced wrong output]

## Areas of Improvement
[Numbered list of skill content gaps, ambiguous instructions, or missing examples]

## Recommended Skill Updates
For each skill that needs updating:
- **Skill:** factory-xxx
- **Gap:** [What was missing or unclear]
- **Suggestion:** [Specific wording or example to add]

## Recommended Prompt Updates
[Specific rewordings for exercises that produced poor first-attempt results]
```

---

## Delegation Mode (Optional)

If you want to offload the execution to a subagent and only handle the analysis yourself:

1. Spawn a subagent with role "Spaces Capabilities Evaluator".
2. Give it this exact task: "Execute all 10 exercises in the factory-self-improvement skill. For each exercise, record: what you did, whether it succeeded, and any issues encountered. Return a structured log with one entry per exercise."
3. Wait for the subagent to return its result envelope.
4. Use the subagent's log as input to Phase 2 (Analysis) and Phase 3 (Report).
