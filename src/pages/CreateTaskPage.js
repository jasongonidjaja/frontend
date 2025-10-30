import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, MenuItem, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        console.error("Gagal memuat data dropdown:", err);
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
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/* Konten utama */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "220px", // jarak sesuai lebar Drawer
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start", // Menyesuaikan dengan yang kamu inginkan (tidak center vertikal)
          minHeight: "100vh",
          backgroundColor: "transparent", // tetap bening
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: 400,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              textAlign: "center",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Tambah Task Baru
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Judul Task"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            />

            <TextField
              select
              label="Bentuk Support"
              name="supportType"
              value={form.supportType}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            >
              {supportTypes.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            {/* Custom Support Type hanya muncul jika "Other" dipilih */}
            {form.supportType === "Other" && (
              <TextField
                label="Custom Support Type"
                name="customSupportType"
                value={form.customSupportType}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
            )}

            <TextField
              select
              label="Aplikasi"
              name="applicationId"
              value={form.applicationId}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            >
              {applications.map((app) => (
                <MenuItem key={app.id} value={app.id}>
                  {app.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Deskripsi"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
              required
            />

            <TextField
              select
              label="PIC SQI"
              name="sqiPicId"
              value={form.sqiPicId}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            >
              {sqiPics.map((pic) => (
                <MenuItem key={pic.id} value={pic.id}>
                  {pic.name}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" fullWidth type="submit">
              Simpan Task
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateTaskPage;
