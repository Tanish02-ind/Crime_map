import {
    FileWarning,
    Search,
    Filter,
} from "lucide-react";

import {
    useState,
} from "react";

import { useApp } from "../../context/AppContext";

import StatusBadge from "../../components/StatusBadge";

import {
    formatDate,
    getSeverityColor,
} from "../../utils/helpers";


export default function AdminReports() {

    const {
        reports,
        updateReportStatus,
    } = useApp();


    const [
        statusFilter,
        setStatusFilter,
    ] = useState("All");


    const [
        categoryFilter,
        setCategoryFilter,
    ] = useState("All");


    const [
        search,
        setSearch,
    ] = useState("");


    const filteredReports =
        reports.filter((report) => {

            const statusMatch =
                statusFilter === "All" ||
                report.status ===
                statusFilter;


            const categoryMatch =
                categoryFilter === "All" ||
                report.category ===
                categoryFilter;


            const searchMatch =
                report.complaintId
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                report.category
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                report.description
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            return (
                statusMatch &&
                categoryMatch &&
                searchMatch
            );

        });


    return (
        <div className="mx-auto max-w-7xl">


            {/* HEADER */}

            <div className="mb-6">

                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">

                    <FileWarning size={17} />

                    Incident Management

                </div>

                <h1 className="mt-1 text-3xl font-black">
                    All Reports
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Review incidents and update
                    their response status.
                </p>

            </div>


            {/* FILTERS */}

            <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <div className="grid gap-3 md:grid-cols-4">

                    <div className="relative">

                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search reports..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                        />

                    </div>


                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none"
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Investigating">
                            Investigating
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                    </select>


                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(
                                e.target.value
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none"
                    >

                        <option value="All">
                            All Categories
                        </option>

                        <option value="Theft">
                            Theft
                        </option>

                        <option value="Harassment">
                            Harassment
                        </option>

                        <option value="Suspicious Activity">
                            Suspicious Activity
                        </option>

                        <option value="Accident">
                            Accident
                        </option>

                        <option value="Safety Hazard">
                            Safety Hazard
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>


                    <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 text-xs font-semibold text-slate-500">

                        <Filter size={15} />

                        {filteredReports.length}
                        {" "}
                        matching reports

                    </div>

                </div>

            </div>


            {/* REPORTS */}

            <div className="space-y-3">

                {filteredReports.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                        <FileWarning
                            size={40}
                            className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 font-semibold">
                            No matching reports
                        </p>

                    </div>

                ) : (

                    filteredReports.map(
                        (report) => (

                            <ReportRow
                                key={report.id}
                                report={report}
                                updateStatus={
                                    updateReportStatus
                                }
                            />

                        )
                    )

                )}

            </div>

        </div>
    );
}


function ReportRow({
    report,
    updateStatus,
}) {

    const [
        status,
        setStatus,
    ] = useState(report.status);


    function handleUpdate() {

        if (
            status === report.status
        ) {
            return;
        }

        updateStatus(
            report.id,
            status
        );

    }


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto] lg:items-center">


                {/* INCIDENT */}

                <div>

                    <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-bold">
                            {report.category}
                        </h3>

                        <StatusBadge
                            status={
                                report.status
                            }
                        />

                    </div>

                    <p className="mt-1 font-mono text-xs text-slate-400">
                        {report.complaintId}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                        {report.description}
                    </p>

                </div>


                {/* SEVERITY */}

                <div>

                    <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Severity
                    </p>

                    <p
                        className={`mt-1 text-sm font-bold ${getSeverityColor(
                            report.severity
                        )}`}
                    >
                        {report.severity}
                    </p>

                </div>


                {/* DATE */}

                <div>

                    <p className="text-[11px] uppercase tracking-wider text-slate-400">
                        Reported
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-700">
                        {formatDate(
                            report.createdAt
                        )}
                    </p>

                </div>


                {/* STATUS CONTROL */}

                <div>

                    <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-400">
                        Update Status
                    </p>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none"
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Investigating">
                            Investigating
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                    </select>

                </div>


                {/* BUTTON */}

                <button
                    onClick={handleUpdate}
                    disabled={
                        status ===
                        report.status
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Update
                </button>

            </div>

        </div>
    );
}