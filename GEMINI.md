# Agent Behavior Rules

This file defines custom rules for AI agents and the IDE working in this workspace.

## Documentation and Logging Mandate

When making changes, planning features, or making architectural choices in this project, you MUST adhere to the following logging and documentation rules:

### 1. Architecture Decision Records (ADR)
All significant architectural decisions, framework choices, database schema changes, and API design choices must be documented in `docs/adr.md`.
- Follow the standard ADR format: `Context`, `Decision`, and `Consequences`.
- Before adding a new dependency or changing the system architecture, write an ADR and get it approved.

### 2. Micrologs
Every time a task is completed, a bug is fixed, or a minor implementation decision is made, it MUST be logged in `docs/logs.md`.
- Keep logs concise.
- Use the format: `- **[YYYY-MM-DD]**: Description of what was done or decided.`
- This acts as a living journal of the project's development history.

### 3. General Documentation Updates
- When implementing a feature from the `docs/prd.md` or `docs/tdd.md`, update the documents if specifications change during development.
- Keep the `docs/roadmap.md` updated by checking off completed items.
