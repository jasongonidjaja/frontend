import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // gunakan instance axios dari api.js

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error message

    try {
      // 🔥 Panggil endpoint backend login
      const response = await api.post("/auth/login", form);

      // Ambil data dari response
      const { token, role, username } = response.data;

      // Simpan ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      // Redirect sesuai role
      if (role === "sqi") {
        navigate("/tasks"); // Halaman daftar task
      } else if (role === "developer") {
        navigate("/create"); // Halaman buat task baru
      } else {
        setError("Role tidak dikenali.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Username atau password salah.");
      } else {
        setError("Terjadi kesalahan saat login.");
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
