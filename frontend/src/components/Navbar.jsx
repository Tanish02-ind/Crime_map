import {
    Bell,
    ShieldCheck,
} from "lucide-react";

import { useApp } from "../context/AppContext";

export default function Navbar() {
    const { user } = useApp();

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">

            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                <div>
                    <h2 className="text-sm font-semibold text-slate-800">
                        {user?.role === "admin"
                            ? "Security Control Center"
                            : "Campus Safety"}
                    </h2>

                    <p className="text-xs text-slate-500">
                        Vishwakarma Government Engineering College
                    </p>
                </div>


                <div className="flex items-center gap-4">

                    <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">

                        <Bell size={19} />

                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />

                    </button>


                    <div className="hidden items-center gap-2 sm:flex">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">

                            {user?.name
                                ?.charAt(0)
                                .toUpperCase()}

                        </div>

                        <div>

                            <p className="text-sm font-semibold">
                                {user?.name}
                            </p>

                            <p className="text-xs text-slate-500">
                                {user?.role === "admin"
                                    ? "Administrator"
                                    : "Student"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </header>
    );
}