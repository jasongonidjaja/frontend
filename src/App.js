// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import TaskListPage from "./pages/TaskListPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // ✅ Sembunyikan Navbar di halaman login
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ✅ Halaman Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ Halaman TaskList (untuk SQI/Admin) */}
        <Route path="/tasks" element={<TaskListPage />} />

        {/* ✅ Halaman Buat Task (untuk Developer) */}
        <Route path="/create" element={<CreateTaskPage />} />

        {/* ✅ Default route diarahkan ke /tasks */}
        <Route path="/" element={<TaskListPage />} />
      </Routes>
    </>
  );
}

export default App;
