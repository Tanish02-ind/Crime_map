export const DEMO_USERS = [
    {
        id: 1,
        name: "Rutvi Raval",
        email: "student@vgec.ac.in",
        password: "student123",
        role: "student",
    },

    {
        id: 2,
        name: "VGEC Security",
        email: "security@vgec.ac.in",
        password: "admin123",
        role: "admin",
    },
];

export const INITIAL_REPORTS = [
    {
        id: 1,
        complaintId: "VGEC-2026-000101",

        userId: 1,
        userName: "Demo Student",

        category: "Theft",

        description:
            "A helmet was reported missing near the parking area.",

        latitude: 23.0745,
        longitude: 72.5478,

        severity: "High",

        status: "Investigating",

        createdAt:
            new Date(
                Date.now() - 86400000
            ).toISOString(),

        updatedAt:
            new Date().toISOString(),

        statusHistory: [
            {
                status: "Pending",
                note: "Report submitted.",
                timestamp:
                    new Date(
                        Date.now() - 86400000
                    ).toISOString(),
            },

            {
                status: "Investigating",
                note:
                    "Security team is checking CCTV footage.",
                timestamp:
                    new Date().toISOString(),
            },
        ],
    },

    {
        id: 2,
        complaintId: "VGEC-2026-000102",

        userId: 1,
        userName: "Demo Student",

        category: "Safety Hazard",

        description:
            "A damaged electrical wire was noticed near the laboratory block.",

        latitude: 23.0728,
        longitude: 72.546,

        severity: "Medium",

        status: "Pending",

        createdAt:
            new Date(
                Date.now() - 3600000
            ).toISOString(),

        updatedAt:
            new Date().toISOString(),

        statusHistory: [
            {
                status: "Pending",
                note: "Report submitted.",
                timestamp:
                    new Date().toISOString(),
            },
        ],
    },

    {
        id: 3,
        complaintId: "VGEC-2026-000103",

        userId: 1,
        userName: "Demo Student",

        category: "Suspicious Activity",

        description:
            "An unknown person was observed near the campus entrance.",

        latitude: 23.076,
        longitude: 72.5485,

        severity: "Low",

        status: "Resolved",

        createdAt:
            new Date(
                Date.now() - 172800000
            ).toISOString(),

        updatedAt:
            new Date().toISOString(),

        statusHistory: [
            {
                status: "Pending",
                note: "Report submitted.",
                timestamp:
                    new Date(
                        Date.now() - 172800000
                    ).toISOString(),
            },

            {
                status: "Resolved",
                note:
                    "Security verified the situation.",
                timestamp:
                    new Date().toISOString(),
            },
        ],
    },
];