import {
    Map,
    ShieldCheck,
    AlertTriangle,
    FileText,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import MapView from "../../components/MapView";

import { useApp } from "../../context/AppContext";


export default function StudentDashboard() {

    const {
        reports,
        user,
    } = useApp();


    const recentReports =
        reports
            .filter(
                (r) =>
                    r.userId === user?.id
            )
            .slice(0, 3);


    return (
        <div className="mx-auto max-w-7xl space-y-6">


            {/* HEADER */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">

                        <ShieldCheck size={16} />

                        Campus Safety

                    </div>

                    <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                        Good afternoon,{" "}
                        {user?.name?.split(" ")[0]} 👋
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Monitor incidents and help keep
                        VGEC safe.
                    </p>

                </div>


                <Link
                    to="/student/report"
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
                >

                    <AlertTriangle size={18} />

                    Report Incident

                </Link>

            </div>


            {/* STATS */}

            <div className="grid gap-4 sm:grid-cols-3">

                <StatCard
                    icon={Map}
                    title="Live Incidents"
                    value={reports.length}
                    color="blue"
                />

                <StatCard
                    icon={AlertTriangle}
                    title="My Reports"
                    value={recentReports.length}
                    color="amber"
                />

                <StatCard
                    icon={FileText}
                    title="Resolved"
                    value={
                        reports.filter(
                            (r) =>
                                r.status === "Resolved"
                        ).length
                    }
                    color="emerald"
                />

            </div>


            {/* MAP */}

            <section>

                <div className="mb-3 flex items-center justify-between">

                    <div>

                        <h2 className="text-lg font-bold text-slate-900">
                            Live Incident Map
                        </h2>

                        <p className="text-xs text-slate-500">
                            Reported incidents around
                            the campus
                        </p>

                    </div>

                    <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                        Live

                    </span>

                </div>


                <MapView
                    reports={reports}
                    height="550px"
                />

            </section>

        </div>
    );
}


function StatCard({
    icon: Icon,
    title,
    value,
    color,
}) {

    const colors = {
        blue: "bg-blue-100 text-blue-600",
        amber: "bg-amber-100 text-amber-600",
        emerald:
            "bg-emerald-100 text-emerald-600",
    };


    return (
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}
            >
                <Icon size={22} />
            </div>

            <div>

                <p className="text-xs font-medium text-slate-500">
                    {title}
                </p>

                <p className="mt-1 text-2xl font-black">
                    {value}
                </p>

            </div>

        </div>
    );
}