import {
    ClipboardList,
    MapPin,
} from "lucide-react";

import { useApp } from "../../context/AppContext";

import StatusBadge from "../../components/StatusBadge";

import {
    formatDate,
    getSeverityColor,
} from "../../utils/helpers";


export default function MyReports() {

    const {
        reports,
        user,
    } = useApp();


    const myReports =
        reports.filter(
            (report) =>
                report.userId === user?.id
        );


    return (
        <div className="mx-auto max-w-6xl">


            <div className="mb-6">

                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">

                    <ClipboardList size={17} />

                    My Reports

                </div>

                <h1 className="mt-1 text-3xl font-black">
                    Incident History
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Track the progress of incidents
                    you have reported.
                </p>

            </div>


            {myReports.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                    <ClipboardList
                        size={40}
                        className="mx-auto text-slate-300"
                    />

                    <h2 className="mt-4 font-bold">
                        No reports yet
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Your submitted incidents will
                        appear here.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {myReports.map(
                        (report) => (

                            <div
                                key={report.id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >

                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                                    <div>

                                        <div className="flex flex-wrap items-center gap-2">

                                            <span className="font-bold">
                                                {report.category}
                                            </span>

                                            <StatusBadge
                                                status={
                                                    report.status
                                                }
                                            />

                                        </div>


                                        <p className="mt-1 font-mono text-xs text-slate-400">
                                            {report.complaintId}
                                        </p>

                                    </div>


                                    <span
                                        className={`text-sm font-bold ${getSeverityColor(
                                            report.severity
                                        )}`}
                                    >
                                        {report.severity} Severity
                                    </span>

                                </div>


                                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                    {report.description}
                                </p>


                                <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">

                                    <Info
                                        label="Reported"
                                        value={formatDate(
                                            report.createdAt
                                        )}
                                    />

                                    <Info
                                        label="Location"
                                        value={
                                            `${report.latitude.toFixed(
                                                4
                                            )}, ${report.longitude.toFixed(
                                                4
                                            )}`
                                        }
                                    />

                                    <Info
                                        label="Last Updated"
                                        value={formatDate(
                                            report.updatedAt
                                        )}
                                    />

                                </div>


                                {/* STATUS TIMELINE */}

                                <div className="mt-6">

                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Status Timeline
                                    </h3>


                                    <div className="mt-3 space-y-3">

                                        {(
                                            report.statusHistory ||
                                            []
                                        ).map(
                                            (
                                                history,
                                                index
                                            ) => (

                                                <div
                                                    key={index}
                                                    className="flex gap-3"
                                                >

                                                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />

                                                    <div>

                                                        <p className="text-sm font-semibold">
                                                            {history.status}
                                                        </p>

                                                        <p className="text-xs text-slate-500">
                                                            {history.note}
                                                        </p>

                                                        <p className="mt-1 text-[11px] text-slate-400">
                                                            {formatDate(
                                                                history.timestamp
                                                            )}
                                                        </p>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}


function Info({
    label,
    value,
}) {
    return (
        <div className="flex gap-2">

            <MapPin
                size={15}
                className="mt-0.5 text-slate-400"
            />

            <div>

                <p className="text-[11px] text-slate-400">
                    {label}
                </p>

                <p className="text-xs font-medium text-slate-700">
                    {value}
                </p>

            </div>

        </div>
    );
}