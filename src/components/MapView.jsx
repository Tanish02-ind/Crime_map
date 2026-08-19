import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Rectangle,
    useMapEvents,
} from "react-leaflet";

import L from "leaflet";

import {
    CAMPUS_CENTER,
    CAMPUS_BOUNDS,
    getCategoryColor,
} from "../utils/helpers";

import { useState } from "react";


// Fix Leaflet marker issue in Vite

const markerIcon = (category) => {
    const color =
        getCategoryColor(category);

    return L.divIcon({
        className: "",

        html: `
      <div style="
        width:28px;
        height:28px;
        border-radius:50%;
        background:${color};
        border:3px solid white;
        box-shadow:0 3px 10px rgba(0,0,0,.3);
      "></div>
    `,

        iconSize: [28, 28],

        iconAnchor: [14, 14],
    });
};


function LocationPicker({
    onLocationSelect,
}) {
    useMapEvents({
        click(event) {
            onLocationSelect(
                event.latlng.lat,
                event.latlng.lng
            );
        },
    });

    return null;
}


export default function MapView({
    reports = [],
    selectable = false,
    selectedLocation = null,
    onLocationSelect,
    height = "600px",
}) {
    const [locationError, setLocationError] =
        useState("");


    function handleLocation(
        lat,
        lng
    ) {
        const inside =
            lat >= CAMPUS_BOUNDS.minLat &&
            lat <= CAMPUS_BOUNDS.maxLat &&
            lng >= CAMPUS_BOUNDS.minLng &&
            lng <= CAMPUS_BOUNDS.maxLng;


        if (!inside) {

            setLocationError(
                "Please select a location inside the VGEC campus."
            );

            return;
        }


        setLocationError("");

        if (onLocationSelect) {
            onLocationSelect(lat, lng);
        }
    }


    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            style={{ height }}
        >

            <MapContainer
                center={CAMPUS_CENTER}
                zoom={17}
                scrollWheelZoom={true}
                className="h-full w-full"
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                <Rectangle
                    bounds={[
                        [
                            CAMPUS_BOUNDS.minLat,
                            CAMPUS_BOUNDS.minLng,
                        ],

                        [
                            CAMPUS_BOUNDS.maxLat,
                            CAMPUS_BOUNDS.maxLng,
                        ],
                    ]}
                    pathOptions={{
                        color: "#2563eb",
                        weight: 2,
                        fillOpacity: 0.04,
                    }}
                />


                {selectable && (
                    <LocationPicker
                        onLocationSelect={
                            handleLocation
                        }
                    />
                )}


                {selectedLocation && (
                    <Marker
                        position={[
                            selectedLocation.lat,
                            selectedLocation.lng,
                        ]}
                        icon={markerIcon(
                            "Selected"
                        )}
                    >

                        <Popup>
                            <strong>
                                Selected Incident Location
                            </strong>

                            <br />

                            {selectedLocation.lat.toFixed(
                                5
                            )}

                            {" , "}

                            {selectedLocation.lng.toFixed(
                                5
                            )}
                        </Popup>

                    </Marker>
                )}


                {reports.map((report) => (

                    <Marker
                        key={report.id}
                        position={[
                            report.latitude,
                            report.longitude,
                        ]}
                        icon={markerIcon(
                            report.category
                        )}
                    >

                        <Popup>

                            <div className="min-w-[220px]">

                                <h3 className="font-bold text-slate-900">
                                    {report.category}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    {report.complaintId}
                                </p>

                                <hr className="my-2" />

                                <p className="text-sm">
                                    {report.description}
                                </p>

                                <div className="mt-2 text-xs">

                                    <strong>
                                        Severity:
                                    </strong>{" "}

                                    {report.severity}

                                    <br />

                                    <strong>
                                        Status:
                                    </strong>{" "}

                                    {report.status}

                                </div>

                            </div>

                        </Popup>

                    </Marker>

                ))}

            </MapContainer>


            {locationError && (

                <div className="absolute bottom-4 left-4 z-[1000] rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
                    {locationError}
                </div>

            )}

        </div>
    );
}