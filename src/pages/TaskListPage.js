import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import TaskList from "../components/TaskList"; // ✅ Import komponen tabel

const TaskListPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Daftar Task Support
        </Typography>

        {/* ✅ Komponen daftar task */}
        <TaskList />
      </Container>
    </MainLayout>
  );
};

export default TaskListPage;
