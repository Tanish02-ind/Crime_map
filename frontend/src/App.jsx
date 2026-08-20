import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Crime Map</Link>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.username} ({user.role})</span>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded">Register</Link>
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