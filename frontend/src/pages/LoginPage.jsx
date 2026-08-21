import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    Shield,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    Activity,
    ShieldAlert,
    Radio,
    Flame,
    CheckCircle2,
} from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Invalid username or password.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickFill = (demoUser, demoPass) => {
        setUsername(demoUser);
        setPassword(demoPass);
        setError('');
    };

    return (
        <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col justify-between selection:bg-amber-500/35 selection:text-white relative overflow-hidden font-sans">
            
            {/* ================= CAUTION YELLOW & MUTED BLUE AMBIENT GRADIENTS ================= */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Caution Yellow & Muted Blue Primary Flare (Top-Left) */}
                <div className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-amber-500/20 via-blue-600/15 to-transparent blur-[140px]" />
                
                {/* Deep Tactical Muted Blue Secondary Glow (Bottom-Right) */}
                <div className="absolute -bottom-40 -right-40 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tl from-blue-700/22 via-slate-800/15 to-transparent blur-[150px]" />
                
                {/* Deep Charcoal / Navy Center Vignette */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52rem] h-[34rem] rounded-full bg-[#0B111E]/40 blur-[160px]" />
                
                {/* Tactical Crime Mesh Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)]" />
            </div>

            {/* ================= TOP NAVIGATION BAR ================= */}
            <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <Link to="/" className="inline-flex items-center gap-3 group">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-blue-900 border border-amber-400/60 text-slate-950 shadow-[0_0_24px_rgba(245,158,11,0.4)] transition-transform group-hover:scale-105">
                        <Shield size={20} strokeWidth={2.4} />
                    </span>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-black tracking-wider text-base uppercase text-white">Crime Map</span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 uppercase">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                                Active Grid
                            </span>
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase -mt-0.5">
                            Incident Dispatch Grid
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mr-1"
                    >
                        <ArrowLeft size={14} />
                        <span>Public Live Map</span>
                    </Link>

                    <Link
                        to="/login"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-[0_0_14px_rgba(245,158,11,0.25)] transition-all"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] border border-amber-400/50 transition-all"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* ================= MAIN CRIME PORTAL CONTAINER ================= */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl grid lg:grid-cols-12 rounded-3xl border border-slate-800/80 bg-[#0E1118]/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
                    
                    {/* LEFT — Caution Yellow & Muted Blue Showcase */}
                    <section className="lg:col-span-6 p-8 sm:p-11 bg-gradient-to-b from-[#131B2A] via-[#0E1522] to-[#090D15] border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
                        
                        {/* Caution Yellow & Blue Flare in Background */}
                        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/16 via-blue-700/12 to-transparent blur-[90px] pointer-events-none" />

                        <div className="space-y-6 relative">
                            {/* Eyebrow */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-blue-900/30 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(245,158,11,0.2)]">
                                <Radio size={14} className="text-amber-400 animate-pulse" />
                                <span>Live Incident Intelligence</span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-2.5">
                                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15]">
                                    See your sector.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-blue-200">
                                        Report what matters.
                                    </span>
                                </h1>
                                <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                                    A high-precision community safety platform. Pin incidents, track active danger zones, and coordinate instantaneous emergency response.
                                </p>
                            </div>

                            {/* Caution Yellow & Muted Blue Stat Chips */}
                            <div className="grid grid-cols-3 gap-2.5 pt-2">
                                <div className="p-3.5 rounded-xl bg-[#141B2B] border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xl sm:text-2xl font-black text-white font-mono">3,482</div>
                                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                                    </div>
                                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mt-1">Reports Logged</div>
                                </div>
                                
                                <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-700/80 shadow-inner">
                                    <div className="text-xl sm:text-2xl font-black text-white font-mono">96%</div>
                                    <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wider mt-1">Resolved</div>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-700/80 shadow-inner">
                                    <div className="text-xl sm:text-2xl font-black text-amber-200 font-mono">24/7</div>
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Monitoring</div>
                                </div>
                            </div>

                            {/* Security Checklist */}
                            <div className="space-y-2 pt-1">
                                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                    <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                                    <span>Instant geofenced safety alerts on high-priority hazards</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                    <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                                    <span>Direct line to Police Sub-Inspectors & Active Patrols</span>
                                </div>
                            </div>
                        </div>

                        {/* Showcase Footer */}
                        <div className="pt-8 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                            <span className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                Encrypted Session
                            </span>
                            <span className="text-slate-500">CRIME MAP · SECTOR-01</span>
                        </div>
                    </section>

                    {/* RIGHT — Authentication Panel */}
                    <section className="lg:col-span-6 p-8 sm:p-11 flex flex-col justify-center bg-[#0C0F16]">
                        <div className="max-w-md w-full mx-auto space-y-6">
                            
                            {/* Card Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-blue-900/30 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                                        <Lock size={16} />
                                    </span>
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                                        Authorized Access
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    Sign in to your account
                                </h2>
                                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                                    Enter your credentials to access the safety intelligence grid.
                                </p>
                            </div>

                            {/* Error Alert Box */}
                            {error && (
                                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#241708] border border-amber-500/70 text-amber-200 text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-shake">
                                    <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
                                    <span className="font-medium leading-relaxed">{error}</span>
                                </div>
                            )}

                            {/* Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                
                                {/* Username */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                                        Username
                                    </label>
                                    <div className="relative rounded-xl border border-slate-700/80 bg-[#07090E] focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/25 focus-within:shadow-[0_0_18px_rgba(245,158,11,0.25)] transition-all">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <User size={17} />
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-white placeholder-slate-500 outline-none rounded-xl font-medium"
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            autoComplete="username"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative rounded-xl border border-slate-700/80 bg-[#07090E] focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/25 focus-within:shadow-[0_0_18px_rgba(245,158,11,0.25)] transition-all">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Lock size={17} />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            required
                                            className="w-full pl-10 pr-11 py-3 bg-transparent text-sm text-white placeholder-slate-500 outline-none rounded-xl font-medium"
                                            placeholder="••••••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Caution Yellow Primary Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-500 active:scale-[0.99] text-slate-950 text-sm font-black tracking-wider uppercase shadow-[0_0_28px_rgba(245,158,11,0.45)] border border-amber-300/60 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-950 rounded-full animate-spin" />
                                            <span>Authenticating…</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 text-slate-900" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Quick Demo Credentials Switcher */}
                            <div className="pt-1">
                                <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    <span>Quick Demo Access</span>
                                    <span className="text-amber-400 flex items-center gap-1">
                                        <Flame size={12} /> Auto-fill
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleQuickFill('citizen_demo', 'citizen123')}
                                        className="p-2.5 rounded-xl bg-[#141B2B] hover:bg-[#1C263D] border border-slate-800 hover:border-amber-500/50 text-left transition-all cursor-pointer group"
                                    >
                                        <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400">Citizen</div>
                                        <div className="text-[10px] text-slate-400 font-mono">citizen_demo</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleQuickFill('police_si', 'police123')}
                                        className="p-2.5 rounded-xl bg-[#141B2B] hover:bg-[#1C263D] border border-slate-800 hover:border-amber-500/50 text-left transition-all cursor-pointer group"
                                    >
                                        <div className="text-xs font-bold text-amber-400 group-hover:text-white">Police SI</div>
                                        <div className="text-[10px] text-slate-400 font-mono">police_si</div>
                                    </button>
                                </div>
                            </div>

                            {/* Register Link */}
                            <div className="pt-4 border-t border-slate-800/90 text-center">
                                <p className="text-xs text-slate-400">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register"
                                        className="font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>Register here</span>
                                        <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </section>

                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500 font-mono">
                Crime Map · Authorized Community Safety & Incident Dispatch Network
            </footer>
        </div>
    );
};

export default LoginPage;
