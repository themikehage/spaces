---
name: factory-skills
description: Create, inspect, and update custom capabilities and skills in .agents/skills/ for agents across the factory.
---

# Skill Management Guide

To create a new custom skill for agents in Spaces:

1. Create a directory under `.agents/skills/<skill-id>`.
2. Create a `SKILL.md` file inside that directory.
3. Include YAML frontmatter with `name` and `description`.
4. Add detailed markdown instructions and guidelines for the agent.

### Example SKILL.md Template
```markdown
---
name: my-custom-skill
description: Performs automated deployment checks.
---

# My Custom Skill
Instructions for executing this skill...
```
