import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Projects from "../pages/Projects";
import AddClient from "../pages/AddClient";
import AddProject from "../pages/AddProject";
import Support from "../pages/Support";
import Employees from "../pages/Employees";
import AddEmployee from "../pages/AddEmployee";
import ProtectedRoute from "../components/ProtectedRoute";
import MyProjects from "../pages/MyProjects";
import Profile from "../pages/Profile";
import ProjectDetails from "../pages/ProjectDetails";
import Settings from "../pages/Settings";
import EditEmployee from "../pages/EditEmployee";
import Register from "../pages/Register";
import CalendarPage from "../pages/CalendarPage";

// --- ZID HAD L-IMPORTS JDADH ---
import EditProject from "../pages/EditProject"; 
import EditClient from "../pages/EditClient";
// -------------------------------

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<CalendarPage />} />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* CLIENTS ROUTES */}
        <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/clients/add" element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
        <Route path="/edit-client/:id" element={<ProtectedRoute><EditClient /></ProtectedRoute>} />

        {/* PROJECTS ROUTES */}
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/add-project" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
        <Route path="/edit-project/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/my-projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />

        {/* EMPLOYEES ROUTES */}
        <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
        <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />

        {/* ACCOUNT & SUPPORT */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;