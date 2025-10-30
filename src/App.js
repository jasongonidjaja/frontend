// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskListPage from "./pages/TaskListPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import MainLayout from "./layout/MainLayout";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Layout utama */}
        <Route
          path="/tasks"
          element={
            isAuthenticated ? (
              <MainLayout>
                <TaskListPage />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/create"
          element={
            isAuthenticated ? (
              <MainLayout>
                <CreateTaskPage />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default ke daftar tugas */}
        <Route path="/" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
};

export default App;
