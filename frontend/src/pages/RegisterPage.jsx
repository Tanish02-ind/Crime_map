import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    Shield,
    Lock,
    User,
    Mail,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    ShieldAlert,
    UserPlus,
    CheckCircle2,
    ShieldCheck,
} from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    // Password strength check
    const calculateStrength = (pass) => {
        if (!pass) return 0;
        let score = 0;
        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass) || /[a-z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return score;
    };

    const strength = calculateStrength(formData.password);
    const strengthLabels = ['Too Weak', 'Fair', 'Strong', 'Max Security'];
    const strengthColors = ['bg-amber-600', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            if (err.response?.data) {
                const data = err.response.data;
                if (typeof data === 'string') {
                    setError(data);
                } else if (typeof data === 'object') {
                    const messages = Object.entries(data).map(([field, msgs]) => {
                        const fieldName = field.replace('_', ' ');
                        const content = Array.isArray(msgs) ? msgs.join(', ') : msgs;
                        return `${fieldName}: ${content}`;
                    });
                    setError(messages.join(' | '));
                } else {
                    setError('Registration failed. Please check your information.');
                }
            } else {
                setError('Registration failed. Server connection error.');
            }
        } finally {
            setIsLoading(false);
        }
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
                                Onboarding
                            </span>
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase -mt-0.5">
                            Citizen Registry
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
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-colors"
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

            {/* ================= MAIN ONBOARDING CONTAINER ================= */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl grid lg:grid-cols-12 rounded-3xl border border-slate-800/80 bg-[#0E1118]/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
                    
                    {/* LEFT — Showcase Panel */}
                    <section className="lg:col-span-6 p-8 sm:p-11 bg-gradient-to-b from-[#131B2A] via-[#0E1522] to-[#090D15] border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
                        
                        {/* Caution Yellow & Blue Flare in Background */}
                        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/16 via-blue-700/12 to-transparent blur-[90px] pointer-events-none" />

                        <div className="space-y-6 relative">
                            {/* Eyebrow */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-blue-900/30 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(245,158,11,0.2)]">
                                <ShieldCheck size={14} className="text-amber-400" />
                                <span>Citizen Protection Grid</span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-2.5">
                                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15]">
                                    Join the safety grid.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-blue-200">
                                        Empower your community.
                                    </span>
                                </h1>
                                <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                                    Enlist as an authorized citizen to receive immediate proximity danger alerts, pin local safety reports, and access real-time dispatch tracking.
                                </p>
                            </div>

                            {/* Caution Yellow & Muted Blue Stat Chips */}
                            <div className="grid grid-cols-3 gap-2.5 pt-2">
                                <div className="p-3.5 rounded-xl bg-[#141B2B] border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
                                    <div className="text-xl sm:text-2xl font-black text-white font-mono">100%</div>
                                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mt-1">Encrypted</div>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-700/80 shadow-inner">
                                    <div className="text-xl sm:text-2xl font-black text-white font-mono">&lt;2min</div>
                                    <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wider mt-1">Alert Dispatch</div>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-700/80 shadow-inner">
                                    <div className="text-xl sm:text-2xl font-black text-amber-200 font-mono">PostGIS</div>
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">GPS Verified</div>
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-2 pt-1">
                                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                    <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                                    <span>Confidential reporting with optional anonymous identity</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                    <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                                    <span>Real-time investigation status directly from Police SI</span>
                                </div>
                            </div>
                        </div>

                        {/* Showcase Footer */}
                        <div className="pt-8 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                            <span className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                Encrypted Session
                            </span>
                            <span className="text-slate-500">CITIZEN PORTAL · VGEC</span>
                        </div>
                    </section>

                    {/* RIGHT — Registration Form */}
                    <section className="lg:col-span-6 p-8 sm:p-11 flex flex-col justify-center bg-[#0C0F16]">
                        <div className="max-w-md w-full mx-auto space-y-5">
                            
                            {/* Card Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-blue-900/30 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                                        <UserPlus size={16} />
                                    </span>
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                                        Citizen Enlistment
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    Create your account
                                </h2>
                                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                                    Enter your details to register on the crime intelligence grid.
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
                            <form className="space-y-3.5" onSubmit={handleSubmit}>
                                
                                {/* First & Last Name */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                                            First Name
                                        </label>
                                        <div className="relative rounded-xl border border-slate-700/80 bg-[#07090E] focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/25 focus-within:shadow-[0_0_18px_rgba(245,158,11,0.25)] transition-all">
                                            <input
                                                type="text"
                                                name="first_name"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 outline-none rounded-xl font-medium"
                                                placeholder="John"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                                            Last Name
                                        </label>
                                        <div className="relative rounded-xl border border-slate-700/80 bg-[#07090E] focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/25 focus-within:shadow-[0_0_18px_rgba(245,158,11,0.25)] transition-all">
                                            <input
                                                type="text"
                                                name="last_name"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 outline-none rounded-xl font-medium"
                                                placeholder="Doe"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Username */}
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                                        Username
                                    </label>
                                    <div className="relative rounded-xl border border-slate-700/80 bg-[#07090E] focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/25 focus-within:shadow-[0_0_18px_rgba(245,158,11,0.25)] transition-all">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <User size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 outline-none rounded-xl font-medium"
                                            placeholder="Choose a username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            autoComplete="username"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                                        Email Address
                                    </label>
                                    <div className="relative rounded-xl border border-slate-700/80 bg-[#07090E] focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/25 focus-within:shadow-[0_0_18px_rgba(245,158,11,0.25)] transition-all">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Mail size={16} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 outline-none rounded-xl font-medium"
                                            placeholder="you@domain.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                                        Password
                                    </label>
                                    <div className="relative rounded-xl border border-slate-700/80 bg-[#07090E] focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/25 focus-within:shadow-[0_0_18px_rgba(245,158,11,0.25)] transition-all">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Lock size={16} />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            className="w-full pl-10 pr-11 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 outline-none rounded-xl font-medium"
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>

                                    {/* Password Strength Meter */}
                                    {formData.password && (
                                        <div className="pt-1 space-y-1">
                                            <div className="flex items-center justify-between text-[11px] font-mono">
                                                <span className="text-slate-400">Strength:</span>
                                                <span className="font-semibold text-amber-300">
                                                    {strengthLabels[strength - 1] || 'Too weak'}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-4 gap-1.5 h-1.5">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-full rounded-full transition-all ${
                                                            level <= strength
                                                                ? strengthColors[strength - 1]
                                                                : 'bg-slate-800'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-500 active:scale-[0.99] text-slate-950 text-sm font-black tracking-wider uppercase shadow-[0_0_28px_rgba(245,158,11,0.45)] border border-amber-300/60 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-950 rounded-full animate-spin" />
                                            <span>Enlisting Citizen…</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Register as Citizen</span>
                                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 text-slate-900" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Switch to Login Link */}
                            <div className="pt-3 border-t border-slate-800/90 text-center">
                                <p className="text-xs text-slate-400">
                                    Already registered?{' '}
                                    <Link
                                        to="/login"
                                        className="font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>Sign in to your account</span>
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

export default RegisterPage;
