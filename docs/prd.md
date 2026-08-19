# Product Requirements Document (PRD)
**Project Name**: Interactive Crime Reporting System / Crime Map

## 1. Overview
Traditional crime reporting systems lack interactivity and accessibility, delaying law enforcement responses and hindering proactive crime prevention. This project aims to build an interactive, transparent, trackable, and convenient crime reporting and mapping system.

## 2. Target Audience & Roles
- **Citizens (Reporters)**: Anyone who witnesses or is a victim of a crime.
- **Law Enforcement**: Statement Takers, Sub-Inspectors (SI), Police Inspectors, etc., following a Role-Based Access Control (RBAC) hierarchy.

## 3. Core Features
### 3.1 Reporting Mechanisms
- **Photo-based Reports**: Upload photos with auto-extracted metadata (time of photo creation, EXIF data).
- **Call-based Reports**: Direct calling features embedded.
- **AI Complaint Assistant**: NLP-based text parsing (e.g., "My phone was stolen yesterday near the railway station around 8 PM") to automatically extract:
  - Incident type
  - Date & Time
  - Location
  - Property involved
  - Important details

### 3.2 Real-Time Tracking & Safety
- GPS-based crime location extraction from the reporter's device.
- **Ongoing Status Runner**: Background process to track the status of the reporter or incident.
- **Violent Crime Mode**: If the crime is violent, enable real-time tracking of the user's phone and broadcast a danger message to nearby users for help.
- **Live Video Feed**: Capability to proactively record and stream the incident to police/servers.

### 3.3 Verification & Abuse Prevention
- Device verification and local storage system for users.
- **ID Proof Requirement**: Require Government-issued ID proof (or Passport/Visa for non-citizens).
- **Location Proximity Rule**: Ensure the complaint origin matches the incident location (to avoid remote fake reporting).
- Implement precautions against prank reports from minors (10-17 years old).

### 3.4 Interactive Mapping & Notifications
- **Heat Map**: Mapbox visualization showing high-crime spots in 'red' to warn citizens.
- **Real-Time Notifications**:
  - *Police Dashboard*: Alerts for "New Incident".
  - *Nearby Citizens*: Push notifications warning them of nearby reported crimes.

## 4. Key Considerations
- **Unique Complaint IDs**: Generate tracking IDs like `POL-2026-000184` for every complaint.
- **Transparency**: Make the complaint lifecycle more transparent and trackable than existing bureaucratic portals.
