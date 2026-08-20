import {
    Map,
    Activity,
} from "lucide-react";

import MapView from "../../components/MapView";

import { useApp } from "../../context/AppContext";


export default function AdminMap() {

    const {
        reports,
    } = useApp();


    return (
        <div className="mx-auto max-w-7xl">


            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">

                        <Map size={17} />

                        Live Monitoring

                    </div>

                    <h1 className="mt-1 text-3xl font-black">
                        Incident Map
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Monitor all reported incidents
                        across the VGEC campus.
                    </p>

                </div>


                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">

                    <Activity size={15} />

                    {reports.length} Active Records

                </div>

            </div>


            <MapView
                reports={reports}
                height="calc(100vh - 190px)"
            />

        </div>
    );
}