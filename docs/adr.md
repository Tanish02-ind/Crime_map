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

*(Future ADRs will be appended here as architectural decisions are made.)*
