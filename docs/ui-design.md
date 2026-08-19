# UI Design Document

## 1. Design System & Theming
- **Framework**: Tailwind CSS
- **Styling**: Modern, responsive, and accessible. Use of red/warning colors exclusively for high-danger areas and active violent crime alerts.

## 2. Key Interfaces

### 2.1 The Police Dashboard
A centralized command center for law enforcement.
- **Top Metrics Row**:
  - Total Reports: `1,284`
  - Pending Reports: `124`
  - Investigating: `87`
  - Resolved: `1,073`
- **Main View**:
  - Split screen or tabbed view showing an **Interactive Crime Map** and a list of recent reports.
- **Bottom/Side Panel**:
  - **Crime Trends**: Graphs showing incident frequency.
  - **Hotspots**: List of high-activity zones.
  - **Alerts**: Real-time notifications of incoming "New Incidents".

### 2.2 Citizen Mobile App / Web View
Designed for quick, panic-friendly interactions.
- **Home Screen**:
  - Big red "Report Emergency" button (Call-based or Violent Crime).
  - Standard "File a Report" button (Photo-based, text-based).
  - Nearby Interactive Map displaying heatmaps and safe zones.
- **AI Complaint Assistant View**:
  - Chat-like interface where users can type or speak their complaint in natural language.
- **Notification Overlay**:
  - High-priority push notification UI for nearby danger broadcasts.
  
### 2.3 Interactive Map Component (Leaflet)
- Base layer: Standard street map (OpenStreetMap).
- Data layers:
  - Heatmap layer (Mapbox) showing incident density.
  - Pin markers for specific recent, unresolved incidents.
