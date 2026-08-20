# Technical Design Document (TDD)

## 1. Architecture Overview
The system follows a modern client-server architecture with real-time capabilities via WebSockets. It uses a relational database with geospatial extensions for mapping functionalities.

## 2. Technology Stack
### 2.1 Front-End
- **Framework**: React JS
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet + OpenStreetMap (with Mapbox visualization for heatmaps)

### 2.2 Back-End
- **Runtime**: Python 3
- **Framework**: Django (with Django Rest Framework)
- **API**: REST APIs for standard CRUD, Django Channels / WebSockets for real-time tracking and notifications.

### 2.3 Database
- **Primary Database**: PostgreSQL
- **Spatial Extension**: PostGIS (for advanced geospatial queries, e.g., finding nearby users, heatmaps).

## 3. Database Schema (High-Level)
The database will store the following key entities:
1. **Users**: User information, ID proofs, device verification data, RBAC roles (Citizen, SI, Inspector).
2. **Crime Reports**:
   - Unique Complaint ID (e.g., POL-2026-000184)
   - Crime Type
   - Location Coordinates (PostGIS Geometry)
   - Date/Time
   - Evidence (References to photo/video storage URLs)
   - Report Status (Pending, Investigating, Resolved)
   - Police Responses & Investigation Updates

## 4. System Components & Workflows

### 4.1 Real-Time Tracking & Broadcasting
- **WebSockets (Socket.IO)**: Used to maintain persistent connections with active user devices.
- When a violent crime is reported, the backend calculates the radius around the coordinates and broadcasts a danger alert to connected nearby clients via Socket.IO rooms/channels.

### 4.2 AI Assistant Parsing
- Integration with an LLM/NLP service.
- The backend receives a natural language string, prompts the LLM to extract JSON containing `incident_type`, `date`, `time`, `location`, `property`, and `details`, and pre-fills the report form.

### 4.3 Media & Storage
- Photos and Live Video feeds require scalable object storage (e.g., AWS S3).
- Metadata extraction (EXIF) will be done on the backend upon image upload to verify timestamps.

### 4.4 Geospatial Queries (PostGIS)
- Heatmap generation involves querying incident densities over specific geospatial polygons.
- Fake complaint prevention involves `ST_Distance` calculations between the device's current GPS coordinate and the reported incident coordinate.
