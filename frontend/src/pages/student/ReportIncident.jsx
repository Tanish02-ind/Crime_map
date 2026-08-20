import {
    AlertTriangle,
    MapPin,
    Send,
    ShieldAlert,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import MapView from "../../components/MapView";

import { useApp } from "../../context/AppContext";


const categories = [
    "Theft",
    "Harassment",
    "Suspicious Activity",
    "Accident",
    "Safety Hazard",
    "Other",
];


const severities = [
    "Low",
    "Medium",
    "High",
];


export default function ReportIncident() {

    const {
        addReport,
    } = useApp();


    const navigate =
        useNavigate();


    const [
        category,
        setCategory,
    ] = useState("");


    const [
        severity,
        setSeverity,
    ] = useState("");


    const [
        description,
        setDescription,
    ] = useState("");


    const [
        selectedLocation,
        setSelectedLocation,
    ] = useState(null);


    const [
        photo,
        setPhoto,
    ] = useState(null);


    const [
        error,
        setError,
    ] = useState("");


    const [
        success,
        setSuccess,
    ] = useState("");


    function handleSubmit(event) {

        event.preventDefault();

        setError("");


        if (!selectedLocation) {

            setError(
                "Please select the incident location on the map."
            );

            return;
        }


        if (
            !category ||
            !severity ||
            !description.trim()
        ) {

            setError(
                "Please complete all required fields."
            );

            return;
        }


        const report =
            addReport({
                category,

                severity,

                description:
                    description.trim(),

                latitude:
                    selectedLocation.lat,

                longitude:
                    selectedLocation.lng,

                photoName:
                    photo?.name || null,
            });


        setSuccess(
            `Incident reported successfully. Your complaint ID is ${report.complaintId}.`
        );


        setCategory("");

        setSeverity("");

        setDescription("");

        setSelectedLocation(null);

        setPhoto(null);


        setTimeout(() => {

            navigate(
                "/student/reports"
            );

        }, 1800);

    }


    return (
        <div className="mx-auto max-w-6xl">


            {/* HEADER */}

            <div className="mb-6">

                <div className="flex items-center gap-2 text-sm font-medium text-red-600">

                    <ShieldAlert size={17} />

                    Incident Reporting

                </div>

                <h1 className="mt-1 text-3xl font-black text-slate-900">
                    Report an Incident
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Provide accurate information so
                    campus security can respond quickly.
                </p>

            </div>


            {error && (

                <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">

                    <AlertTriangle size={18} />

                    {error}

                </div>

            )}


            {success && (

                <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">

                    {success}

                </div>

            )}


            <form
                onSubmit={handleSubmit}
                className="grid gap-6 lg:grid-cols-5"
            >


                {/* FORM */}

                <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

                    <Field
                        label="Incident Category"
                    >

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }
                            className="input"
                            required
                        >

                            <option value="">
                                Select category
                            </option>

                            {categories.map(
                                (item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            )}

                        </select>

                    </Field>


                    <Field label="Severity">

                        <select
                            value={severity}
                            onChange={(e) =>
                                setSeverity(
                                    e.target.value
                                )
                            }
                            className="input"
                            required
                        >

                            <option value="">
                                Select severity
                            </option>

                            {severities.map(
                                (item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            )}

                        </select>

                    </Field>


                    <Field label="Description">

                        <textarea
                            rows={7}
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Describe what happened..."
                            className="input resize-none"
                            required
                        />

                    </Field>


                    <Field label="Photo (Optional)">

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setPhoto(
                                    e.target.files?.[0] ||
                                    null
                                )
                            }
                            className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 text-sm file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:font-semibold file:text-blue-700"
                        />

                        {photo && (

                            <p className="mt-2 text-xs text-slate-500">
                                Selected: {photo.name}
                            </p>

                        )}

                    </Field>


                    <div className="rounded-xl bg-blue-50 p-4 text-xs leading-relaxed text-blue-700">

                        <strong>
                            Privacy Notice:
                        </strong>

                        <br />

                        Only provide information relevant
                        to the incident. Avoid sharing
                        unnecessary personal information.

                    </div>


                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-bold text-white shadow-lg shadow-red-100 transition hover:bg-red-700"
                    >

                        <Send size={18} />

                        Submit Incident

                    </button>

                </div>


                {/* MAP */}

                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:col-span-3">

                    <div className="mb-3 flex items-center gap-2 px-2">

                        <MapPin
                            size={18}
                            className="text-blue-600"
                        />

                        <div>

                            <h2 className="text-sm font-bold">
                                Select Incident Location
                            </h2>

                            <p className="text-xs text-slate-500">
                                Click anywhere inside the
                                highlighted campus area.
                            </p>

                        </div>

                    </div>


                    <MapView
                        selectable
                        selectedLocation={
                            selectedLocation
                        }
                        onLocationSelect={(
                            lat,
                            lng
                        ) =>
                            setSelectedLocation({
                                lat,
                                lng,
                            })
                        }
                        height="650px"
                    />


                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs">

                        {selectedLocation ? (

                            <span className="font-medium text-emerald-600">

                                ✓ Location selected:{" "}

                                {selectedLocation.lat.toFixed(
                                    5
                                )}

                                ,{" "}

                                {selectedLocation.lng.toFixed(
                                    5
                                )}

                            </span>

                        ) : (

                            <span className="text-slate-500">

                                📍 No location selected yet.

                            </span>

                        )}

                    </div>

                </div>

            </form>

        </div>
    );
}


function Field({
    label,
    children,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            {children}

        </div>
    );
}