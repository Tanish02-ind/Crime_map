import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Hide the global navbar on auth pages (LoginPage and RegisterPage have their own dedicated header)
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
  return (
    <nav className="bg-[#0C1017] border-b border-slate-800 px-6 py-4 text-white flex justify-between items-center shadow-lg">
      <Link to="/" className="font-black text-lg tracking-wider uppercase flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 text-xs font-black shadow-[0_0_12px_rgba(245,158,11,0.35)]">
          CM
        </span>
        Crime Map
      </Link>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-300">Welcome, <strong className="text-white">{user.username}</strong> <span className="text-xs px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">({user.role})</span></span>
            <button onClick={logout} className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer">Logout</button>
          </div>
        ) : (
          <div className="space-x-3">
            <Link to="/login" className="text-xs font-bold px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors">Login</Link>
            <Link to="/register" className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_16px_rgba(245,158,11,0.35)] border border-amber-400/50 transition-all">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Crime Map</h1>
      <p>This is the public home page where anyone can see the map.</p>
      
      <div className="mt-8 space-x-4">
        <Link to="/citizen-dashboard" className="text-blue-500 underline">Go to Citizen Dashboard</Link>
        <Link to="/police-dashboard" className="text-blue-500 underline">Go to Police Dashboard</Link>
      </div>
    </div>
  );
};

const CitizenDashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">Citizen Dashboard</h1>
    <p>Only logged in citizens (and police) can access this to file reports.</p>
  </div>
);

const PoliceDashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-red-600">Police Dashboard</h1>
    <p>Only Police SI or Inspectors can view this dashboard to manage reports.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route path="/citizen-dashboard" element={
          <ProtectedRoute>
            <CitizenDashboard />
          </ProtectedRoute>
        } />
        
        {/* RBAC Protected Route */}
        <Route path="/police-dashboard" element={
          <ProtectedRoute allowedRoles={['POLICE_SI', 'POLICE_INSPECTOR']}>
            <PoliceDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;