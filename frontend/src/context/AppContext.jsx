import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    DEMO_USERS,
    INITIAL_REPORTS,
} from "../data/demoData";

import {
    generateComplaintId,
} from "../utils/helpers";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(
        () => {
            const saved =
                localStorage.getItem(
                    "campuswatch_user"
                );

            return saved
                ? JSON.parse(saved)
                : null;
        }
    );

    const [reports, setReports] =
        useState(() => {
            const saved =
                localStorage.getItem(
                    "campuswatch_reports"
                );

            if (saved) {
                return JSON.parse(saved);
            }

            localStorage.setItem(
                "campuswatch_reports",
                JSON.stringify(
                    INITIAL_REPORTS
                )
            );

            return INITIAL_REPORTS;
        });

    useEffect(() => {
        localStorage.setItem(
            "campuswatch_reports",
            JSON.stringify(reports)
        );
    }, [reports]);

    function login(email, password) {
        const found =
            DEMO_USERS.find(
                (item) =>
                    item.email === email &&
                    item.password === password
            );

        if (!found) {
            return {
                success: false,
                message:
                    "Invalid email or password.",
            };
        }

        setUser(found);

        localStorage.setItem(
            "campuswatch_user",
            JSON.stringify(found)
        );

        return {
            success: true,
            user: found,
        };
    }

    function logout() {
        setUser(null);

        localStorage.removeItem(
            "campuswatch_user"
        );
    }

    function addReport(data) {
        const now =
            new Date().toISOString();

        const report = {
            id: Date.now(),

            complaintId:
                generateComplaintId(),

            userId: user.id,

            userName: user.name,

            ...data,

            status: "Pending",

            createdAt: now,

            updatedAt: now,

            statusHistory: [
                {
                    status: "Pending",

                    note:
                        "Report submitted successfully.",

                    timestamp: now,
                },
            ],
        };

        setReports((prev) => [
            report,
            ...prev,
        ]);

        return report;
    }

    function updateReportStatus(
        reportId,
        newStatus
    ) {
        setReports((prev) =>
            prev.map((report) => {
                if (
                    report.id !== reportId
                ) {
                    return report;
                }

                const now =
                    new Date().toISOString();

                return {
                    ...report,

                    status: newStatus,

                    updatedAt: now,

                    statusHistory: [
                        ...(report.statusHistory ||
                            []),

                        {
                            status: newStatus,

                            note:
                                `Status changed to ${newStatus} by security.`,

                            timestamp: now,
                        },
                    ],
                };
            })
        );
    }

    return (
        <AppContext.Provider
            value={{
                user,
                reports,
                login,
                logout,
                addReport,
                updateReportStatus,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}