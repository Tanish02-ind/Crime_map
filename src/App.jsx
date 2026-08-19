import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { useApp } from "./context/AppContext";

import Login from "./pages/Login";

import Layout from "./components/Layout";

import StudentDashboard from "./pages/student/StudentDashboard";
import ReportIncident from "./pages/student/ReportIncident";
import MyReports from "./pages/student/MyReports";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMap from "./pages/admin/AdminMap";
import AdminReports from "./pages/admin/AdminReports";


function ProtectedRoute({
    children,
    role,
}) {
    const { user } = useApp();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return (
            <Navigate
                to={
                    user.role === "admin"
                        ? "/admin"
                        : "/student"
                }
                replace
            />
        );
    }

    return children;
}


export default function App() {
    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />


            {/* STUDENT */}

            <Route
                element={
                    <ProtectedRoute role="student">
                        <Layout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/student"
                    element={
                        <StudentDashboard />
                    }
                />

                <Route
                    path="/student/report"
                    element={
                        <ReportIncident />
                    }
                />

                <Route
                    path="/student/reports"
                    element={
                        <MyReports />
                    }
                />

            </Route>


            {/* ADMIN */}

            <Route
                element={
                    <ProtectedRoute role="admin">
                        <Layout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/admin"
                    element={
                        <AdminDashboard />
                    }
                />

                <Route
                    path="/admin/map"
                    element={
                        <AdminMap />
                    }
                />

                <Route
                    path="/admin/reports"
                    element={
                        <AdminReports />
                    }
                />

            </Route>


            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
}