import {
    Outlet,
    useLocation,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
    const location =
        useLocation();

    return (
        <div className="min-h-screen bg-slate-50">

            <Sidebar />

            <div className="lg:ml-64">

                <Navbar />

                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}