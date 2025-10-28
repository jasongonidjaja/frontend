import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks"); // pakai baseURL dari api.js
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
      <Typography sx={{ mt: 3, textAlign: "center" }}>
        <CircularProgress size={24} /> Memuat data...
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Judul</TableCell>
            <TableCell>Deskripsi</TableCell>
            <TableCell>Bentuk Support</TableCell>
            <TableCell>Aplikasi</TableCell>
            <TableCell>PIC SQI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
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
              <TableCell colSpan={5} align="center">
                Belum ada task.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
