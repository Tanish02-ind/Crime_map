import {
    FileText,
    Clock3,
    Search,
    CheckCircle2,
    Activity,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import { useApp } from "../../context/AppContext";

import StatusBadge from "../../components/StatusBadge";

import {
    formatDate,
    getSeverityColor,
} from "../../utils/helpers";


export default function AdminDashboard() {

    const {
        reports,
    } = useApp();


    const pending =
        reports.filter(
            (r) =>
                r.status === "Pending"
        ).length;


    const investigating =
        reports.filter(
            (r) =>
                r.status ===
                "Investigating"
        ).length;


    const resolved =
        reports.filter(
            (r) =>
                r.status === "Resolved"
        ).length;


    return (
        <div className="mx-auto max-w-7xl space-y-6">


            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">

                        <Activity size={17} />

                        Security Control Center

                    </div>

                    <h1 className="mt-1 text-3xl font-black">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Monitor and manage campus
                        incidents.
                    </p>

                </div>


                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                    System Operational

                </div>

            </div>


            {/* STATS */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <Stat
                    title="Total Reports"
                    value={reports.length}
                    icon={FileText}
                    color="blue"
                />

                <Stat
                    title="Pending"
                    value={pending}
                    icon={Clock3}
                    color="amber"
                />

                <Stat
                    title="Investigating"
                    value={investigating}
                    icon={Search}
                    color="violet"
                />

                <Stat
                    title="Resolved"
                    value={resolved}
                    icon={CheckCircle2}
                    color="emerald"
                />

            </div>


            {/* RECENT REPORTS */}

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 p-5">

                    <div>

                        <h2 className="font-bold">
                            Recent Incidents
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Latest reports submitted by
                            students.
                        </p>

                    </div>


                    <Link
                        to="/admin/reports"
                        className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                    >
                        View All
                    </Link>

                </div>


                <div className="divide-y divide-slate-100">

                    {reports
                        .slice(0, 6)
                        .map((report) => (

                            <div
                                key={report.id}
                                className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                            >

                                <div>

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span className="font-semibold">
                                            {report.category}
                                        </span>

                                        <StatusBadge
                                            status={
                                                report.status
                                            }
                                        />

                                    </div>

                                    <p className="mt-1 text-xs text-slate-400">
                                        {report.complaintId}
                                    </p>

                                </div>


                                <div className="flex items-center gap-5">

                                    <span
                                        className={`text-xs font-bold ${getSeverityColor(
                                            report.severity
                                        )}`}
                                    >
                                        {report.severity}
                                    </span>

                                    <span className="text-xs text-slate-400">
                                        {formatDate(
                                            report.createdAt
                                        )}
                                    </span>

                                </div>

                            </div>

                        ))}

                </div>

            </section>

        </div>
    );
}


function Stat({
    title,
    value,
    icon: Icon,
    color,
}) {

    const styles = {
        blue: "bg-blue-100 text-blue-600",
        amber: "bg-amber-100 text-amber-600",
        violet:
            "bg-violet-100 text-violet-600",
        emerald:
            "bg-emerald-100 text-emerald-600",
    };


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[color]}`}
                >
                    <Icon size={21} />
                </div>

            </div>


            <p className="mt-5 text-xs font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-1 text-3xl font-black">
                {value}
            </p>

        </div>
    );
}