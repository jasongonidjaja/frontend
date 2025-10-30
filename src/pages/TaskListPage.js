import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data.data || []);
      } catch (err) {
        console.error("❌ Gagal mengambil data task:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          marginLeft: "220px",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Konten utama */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "220px",
          minHeight: "100vh",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#1976d2", mb: 3, textAlign: "center", mt: 2 }}
        >
          Daftar Task
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            width: "90%",
            maxWidth: 900,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Judul</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Deskripsi</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Bentuk Support</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Aplikasi</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>PIC SQI</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      {task.supportType
                        ? task.supportType.name
                        : task.customSupportType || "—"}
                    </TableCell>
                    <TableCell>{task.application?.name || "—"}</TableCell>
                    <TableCell>{task.sqiPic?.name || "—"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ color: "#757575", py: 4 }}
                  >
                    Belum ada task.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TaskListPage;
