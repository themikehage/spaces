---
name: factory-teams
description: Create and manage Orchestration and Negotiation teams of agents.
---

# Teams Guide

Teams are structured multi-agent workflows. The `teamType` is IMMUTABLE after creation.

## Team Types

### Orchestration Team
- Leader agent holds a persistent session and delegates to specialists.
- Requires exactly one `role: "lead"` member.
- Interact via: `manage_factory("teams", "send", teamId, { message: "..." })`
  or equivalently: `delegate_task(targetType: "team", targetId: "<teamId>", task: "...")`

### Negotiation Team
- Stateless debate: members run in parallel rounds.
- Consensus evaluation with optional arbiter escalation.
- Configure `negotiationProtocol`: `{ arbiterAgentId, mode, quorumThreshold }`.
- Interact via: `manage_factory("teams", "send", teamId, { message: "..." })`

## Operations via manage_factory

### List all teams
`manage_factory("teams", "get")`

### Get a specific team
`manage_factory("teams", "get", "team-id")`

### Create an Orchestration Team
`manage_factory("teams", "upsert", "my-team", {
  name: "Engineering Team",
  teamType: "Orchestration",
  members: [{ agentId: "lead-agent", role: "lead" }]
})`

### Create a Negotiation Team
`manage_factory("teams", "upsert", "debate-team", {
  name: "Architecture Review",
  teamType: "Negotiation",
  mode: "debate",
  maxRounds: 5,
  members: [
    { agentId: "architect-a", role: "lead" },
    { agentId: "architect-b", role: "member" },
    { agentId: "arbiter-agent", role: "member" }
  ],
  negotiationProtocol: {
    arbiterAgentId: "arbiter-agent",
    mode: "debate",
    quorumThreshold: 0.67
  }
})`

### Send a message to any team
`manage_factory("teams", "send", "team-id", { message: "Start the review" })`

### Add/update a member
`manage_factory("teams", "member", "team-id", { agentId: "new-agent", role: "member" })`

### Delete a team
`manage_factory("teams", "delete", "team-id")`
