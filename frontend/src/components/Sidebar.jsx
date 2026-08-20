import {
    LayoutDashboard,
    Map,
    FileWarning,
    ClipboardList,
    LogOut,
    Shield,
    PlusCircle,
} from "lucide-react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import { useApp } from "../context/AppContext";


export default function Sidebar() {
    const { user, logout } = useApp();

    const navigate =
        useNavigate();


    const studentLinks = [
        {
            name: "Live Map",
            path: "/student",
            icon: Map,
        },

        {
            name: "Report Incident",
            path: "/student/report",
            icon: PlusCircle,
        },

        {
            name: "My Reports",
            path: "/student/reports",
            icon: ClipboardList,
        },
    ];


    const adminLinks = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: LayoutDashboard,
        },

        {
            name: "Live Map",
            path: "/admin/map",
            icon: Map,
        },

        {
            name: "Reports",
            path: "/admin/reports",
            icon: FileWarning,
        },
    ];


    const links =
        user?.role === "admin"
            ? adminLinks
            : studentLinks;


    function handleLogout() {
        logout();
        navigate("/login");
    }


    return (
        <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col bg-slate-950 text-white lg:flex">

            {/* BRAND */}

            <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                    <Shield size={22} />
                </div>

                <div>
                    <h1 className="font-bold">
                        CampusWatch
                    </h1>

                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        VGEC Safety
                    </p>
                </div>

            </div>


            {/* USER */}

            <div className="mx-4 mt-5 rounded-xl bg-white/5 p-3">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">

                        {user?.name
                            ?.charAt(0)
                            .toUpperCase()}

                    </div>

                    <div className="min-w-0">

                        <p className="truncate text-sm font-semibold">
                            {user?.name}
                        </p>

                        <p className="text-xs text-slate-400">
                            {user?.role === "admin"
                                ? "Security Admin"
                                : "Student"}
                        </p>

                    </div>

                </div>

            </div>


            {/* NAVIGATION */}

            <nav className="mt-6 flex-1 px-4">

                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Navigation
                </p>


                <div className="space-y-1">

                    {links.map((link) => {

                        const Icon =
                            link.icon;

                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={
                                    link.path ===
                                    "/student" ||
                                    link.path === "/admin"
                                }
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >

                                <Icon size={18} />

                                <span>
                                    {link.name}
                                </span>

                            </NavLink>
                        );

                    })}

                </div>

            </nav>


            {/* LOGOUT */}

            <div className="border-t border-white/10 p-4">

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>
    );
}