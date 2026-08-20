# Architecture Decision Records (ADRs)

## ADR-001: Use PostgreSQL with PostGIS for Database

**Date**: 2026-08-19
**Status**: Accepted

### Context

The application requires storing relational data (users, complaints) alongside advanced geospatial data (location coordinates). We need to perform complex proximity queries (e.g., finding nearby users for alerts, heat map density, and verifying if a reporter is actually near the incident).

### Decision

We will use PostgreSQL combined with the PostGIS extension.

### Consequences

- Allows native spatial querying (e.g., `ST_DWithin`).
- Easier to build heatmaps and proximity alerts.
- Requires team familiarity with PostGIS syntax.

---

## ADR-002: Use WebSockets (Socket.IO) for Real-Time Alerts

**Date**: 2026-08-19
**Status**: Accepted

### Context

When a violent crime is reported, we must instantly notify nearby citizens and update the police dashboard without requiring the clients to poll the server continuously.

### Decision

Implement Socket.IO to manage real-time, bi-directional event-based communication.

### Consequences

- Low latency for emergency broadcasting.
- Requires managing scalable WebSocket connections (e.g., Redis adapter if running multiple Node.js instances).
- Fallback to standard HTTP polling if WebSockets fail.

---

## ADR-003: Use Python/Django for Backend Architecture

**Date**: 2026-08-20
**Status**: Accepted

### Context

The TDD initially specified Node.js/Express.js, but the team's familiarity and existing virtual environments favor Python. Furthermore, Python allows easier integration with NLP/LLM AI models required for the Complaint Assistant.

### Decision

We will build the backend using Python and the Django framework.

### Consequences

- Built-in session authentication and user models can be leveraged.
- AI logic can be tightly coupled.
- Requires updating the TDD and previous architecture assumptions.

---

## ADR-004: Containerize Development Environment with Docker

**Date**: 2026-08-20
**Status**: Accepted

### Context

To ensure consistency across development environments and ease deployment, the application's components (Frontend, Backend, Database) need a unified orchestration method. We also ran into issues with database connection during backend build time.

### Decision

We will use Docker and Docker Compose to containerize the application. The backend will run database migrations at runtime (via `CMD`) instead of build time to ensure the database container is accessible. Custom database schemas and dummy data will be loaded via PostgreSQL initialization scripts in `/docker-entrypoint-initdb.d/`.

### Consequences

- Simplifies developer onboarding.
- Ensures identical environments across machines.
- Requires developers to have Docker installed.
