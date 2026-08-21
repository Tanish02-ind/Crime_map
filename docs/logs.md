# Micrologs

> This file contains chronological micrologs of development progress, daily tasks, minor decisions, and debugging notes.

## Format
- **[Date] [Time]**: Brief description of action taken or minor decision made.

---

## Logs

- **[2026-08-19]**: Initialized documentation based on whiteboard sketches and notes. Generated PRD, TDD, Roadmap, ADR, and UI Design docs.
- **[2026-08-20]**: Implemented Phase 1.3 basic authentication and RBAC using Django sessions and React Context. Updated backend stack to Python/Django (ADR-003).
- **[2026-08-20]**: Dockerized the frontend, backend, and database environments using Docker Compose (ADR-004). Fixed build-time migration issues by moving migrations to runtime CMD. Added database initialization scripts (setup.sql, dummy_data.sql) to PostGIS container. Fixed nested Router in React App.
- **[2026-08-21]**: Redesigned LoginPage and RegisterPage with a high-contrast dark crime aesthetic (deep charcoal/black ground, blood red, neon cyan, and amber yellow accents, live stats chips, password visibility toggle, and strength meters).
- **[2026-08-21]**: Updated global typography to modern sans-serif ('Plus Jakarta Sans' and 'Inter') across all headings, body, and components.
- **[2026-08-21]**: Suppressed redundant global Navbar on `/login` and `/register` routes to prevent duplicate header bars.
- **[2026-08-21]**: Applied a cohesive Neon Crimson to Deep Charcoal dark gradient theme across LoginPage and RegisterPage for a sharp, high-contrast, authentic crime app aesthetic.
- **[2026-08-21]**: Refined color palette with authentic crime map navigation gradients (tactical radar midnight base, electric cyan safe-corridors, emergency siren red/amber incident telemetry, and concentric radar grid rings).
- **[2026-08-21]**: Updated gradient scheme across LoginPage, RegisterPage, and navigation components to a Caution Yellow and Muted Blue palette (tactical navy ambient flares, caution amber interactive buttons, and dual-tone text/grid gradients).