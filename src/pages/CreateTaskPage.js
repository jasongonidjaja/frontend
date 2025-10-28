import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const CreateTaskPage = () => {
  const [supportTypes, setSupportTypes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [sqiPics, setSqiPics] = useState([]);
  const [form, setForm] = useState({
    title: "",
    supportType: "",
    customSupportType: "",
    description: "",
    applicationId: "",
    sqiPicId: "",
  });

  const navigate = useNavigate();

  // 🔹 Ambil data dari API (SupportType, Application, SQI)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supportRes, appRes, picRes] = await Promise.all([
          axios.get("http://localhost:4000/api/support-types", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("http://localhost:4000/api/applications", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("http://localhost:4000/api/sqi-pics", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);

        setSupportTypes(supportRes.data);
        setApplications(appRes.data);
        setSqiPics(picRes.data);
      } catch (err) {
        console.error("Gagal mengambil data dropdown:", err);
        alert("Gagal memuat data. Pastikan Anda sudah login.");
      }
    };
    fetchData();
  }, []);

  // 🔹 Handle perubahan input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      supportType: form.supportType,
      customSupportType:
        form.supportType === "Other" ? form.customSupportType : null,
      applicationId: form.applicationId,
      sqiPicId: form.sqiPicId,
    };

    try {
      await axios.post("http://localhost:4000/api/tasks", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Task berhasil dibuat!");
      navigate("/tasks"); // Redirect ke daftar task
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Gagal menyimpan task. Lihat console untuk detail error.");
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Tambah Task Baru
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* 1. Judul Task */}
          <TextField
            fullWidth
            label="Judul Task"
            name="title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* 2. Bentuk Support Type */}
          <TextField
            select
            fullWidth
            label="Bentuk Support"
            name="supportType"
            value={form.supportType}
            onChange={handleChange}
            margin="normal"
            required
          >
            {supportTypes.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          {/* 2b. Custom Support Type */}
          {form.supportType === "Other" && (
            <TextField
              fullWidth
              label="Custom Support Type"
              name="customSupportType"
              value={form.customSupportType}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}

          {/* 3. Aplikasi */}
          <TextField
            select
            fullWidth
            label="Aplikasi"
            name="applicationId"
            value={form.applicationId}
            onChange={handleChange}
            margin="normal"
            required
          >
            {applications.map((app) => (
              <MenuItem key={app.id} value={app.id}>
                {app.name}
              </MenuItem>
            ))}
          </TextField>

          {/* 4. Deskripsi */}
          <TextField
            fullWidth
            label="Deskripsi"
            name="description"
            value={form.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            required
          />

          {/* 5. PIC SQI */}
          <TextField
            select
            fullWidth
            label="PIC SQI"
            name="sqiPicId"
            value={form.sqiPicId}
            onChange={handleChange}
            margin="normal"
            required
          >
            {sqiPics.map((pic) => (
              <MenuItem key={pic.id} value={pic.id}>
                {pic.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Simpan Task
            </Button>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default CreateTaskPage;
