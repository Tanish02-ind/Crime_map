export const CAMPUS_CENTER = [
    23.0738,
    72.5468,
];

export const CAMPUS_BOUNDS = {
    minLat: 23.069,
    maxLat: 23.0785,
    minLng: 72.541,
    maxLng: 72.5525,
};

export function isInsideCampus(lat, lng) {
    return (
        lat >= CAMPUS_BOUNDS.minLat &&
        lat <= CAMPUS_BOUNDS.maxLat &&
        lng >= CAMPUS_BOUNDS.minLng &&
        lng <= CAMPUS_BOUNDS.maxLng
    );
}

export function generateComplaintId() {
    const reports =
        JSON.parse(
            localStorage.getItem(
                "campuswatch_reports"
            )
        ) || [];

    const number =
        100 + reports.length + 1;

    return `VGEC-${new Date().getFullYear()}-${String(
        number
    ).padStart(6, "0")}`;
}

export function formatDate(date) {
    return new Date(date).toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    );
}

export function getStatusColor(status) {
    switch (status) {
        case "Pending":
            return "bg-amber-100 text-amber-700";

        case "Investigating":
            return "bg-violet-100 text-violet-700";

        case "Resolved":
            return "bg-emerald-100 text-emerald-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
}

export function getSeverityColor(severity) {
    switch (severity) {
        case "High":
            return "text-red-600";

        case "Medium":
            return "text-amber-600";

        case "Low":
            return "text-emerald-600";

        default:
            return "text-slate-600";
    }
}

export function getCategoryColor(category) {
    switch (category) {
        case "Theft":
            return "#dc2626";

        case "Harassment":
            return "#9333ea";

        case "Suspicious Activity":
            return "#f59e0b";

        case "Accident":
            return "#2563eb";

        case "Safety Hazard":
            return "#ea580c";

        default:
            return "#64748b";
    }
}