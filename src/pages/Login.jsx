import {
    Shield,
    Mail,
    Lock,
    UserRound,
    ShieldCheck,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import { useApp } from "../context/AppContext";


export default function Login() {

    const {
        login,
    } = useApp();


    const navigate =
        useNavigate();


    const [
        email,
        setEmail,
    ] = useState("");


    const [
        password,
        setPassword,
    ] = useState("");


    const [
        error,
        setError,
    ] = useState("");


    function handleSubmit(event) {

        event.preventDefault();

        setError("");


        const result =
            login(
                email,
                password
            );


        if (!result.success) {

            setError(
                result.message
            );

            return;

        }


        navigate(
            result.user.role === "admin"
                ? "/admin"
                : "/student"
        );
    }


    function demoStudent() {

        setEmail(
            "student@vgec.ac.in"
        );

        setPassword(
            "student123"
        );

    }


    function demoAdmin() {

        setEmail(
            "security@vgec.ac.in"
        );

        setPassword(
            "admin123"
        );

    }


    return (
        <div className="flex min-h-screen bg-slate-950">


            {/* LEFT */}

            <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950" />


                <div className="relative z-10 flex flex-col justify-center px-16 text-white">

                    <div className="mb-8 flex items-center gap-3">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

                            <Shield size={30} />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold">
                                CampusWatch
                            </h1>

                            <p className="text-sm text-blue-200">
                                VGEC Safety Platform
                            </p>

                        </div>

                    </div>


                    <h2 className="max-w-xl text-5xl font-black leading-tight">

                        A safer campus,
                        <br />

                        <span className="text-blue-300">
                            together.
                        </span>

                    </h2>


                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-blue-100">
                        Report incidents, monitor campus
                        safety and help create a secure
                        environment for every student and
                        staff member.
                    </p>


                    <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">

                        <Feature
                            icon="🗺️"
                            text="Live Map"
                        />

                        <Feature
                            icon="🚨"
                            text="Quick Reporting"
                        />

                        <Feature
                            icon="🛡️"
                            text="Secure"
                        />

                    </div>

                </div>

            </div>


            {/* RIGHT */}

            <div className="flex w-full items-center justify-center bg-slate-50 p-6 lg:w-1/2">

                <div className="w-full max-w-md">

                    <div className="mb-8 text-center lg:text-left">

                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 lg:mx-0">

                            <ShieldCheck size={28} />

                        </div>

                        <h1 className="text-3xl font-black text-slate-900">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to access CampusWatch
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
                    >

                        {error && (

                            <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
                                {error}
                            </div>

                        )}


                        <Input
                            label="College Email"
                            icon={Mail}
                            type="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="student@vgec.ac.in"
                        />


                        <Input
                            label="Password"
                            icon={Lock}
                            type="password"
                            value={password}
                            onChange={setPassword}
                            placeholder="Enter password"
                        />


                        <button
                            type="submit"
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[.99]"
                        >
                            <UserRound size={18} />

                            Sign In

                        </button>


                        <div className="my-6 flex items-center gap-3">

                            <div className="h-px flex-1 bg-slate-200" />

                            <span className="text-xs text-slate-400">
                                DEMO ACCESS
                            </span>

                            <div className="h-px flex-1 bg-slate-200" />

                        </div>


                        <div className="grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                onClick={demoStudent}
                                className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                            >
                                Student Demo
                            </button>


                            <button
                                type="button"
                                onClick={demoAdmin}
                                className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                            >
                                Admin Demo
                            </button>

                        </div>

                    </form>


                    <p className="mt-6 text-center text-xs text-slate-400">
                        CampusWatch • VGEC Pilot
                    </p>

                </div>

            </div>

        </div>
    );
}


function Input({
    label,
    icon: Icon,
    type,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <div className="relative">

                <Icon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type={type}
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    placeholder={placeholder}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

            </div>

        </div>
    );
}


function Feature({
    icon,
    text,
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">

            <div className="text-2xl">
                {icon}
            </div>

            <p className="mt-2 text-sm font-medium">
                {text}
            </p>

        </div>
    );
}