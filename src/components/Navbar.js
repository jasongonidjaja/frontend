import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

// Menu berdasarkan role
const menuItems =
  role === "sqi"
    ? [
        { text: "Lihat Tugas", icon: <AssignmentIcon />, path: "/tasks" },
      ]
    : [
        { text: "Buat Tugas", icon: <AddCircleIcon />, path: "/create" },
        { text: "Lihat Tugas", icon: <AssignmentIcon />, path: "/tasks" },
      ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer (Side Navigation) */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            SQI Support
          </Typography>
        </Toolbar>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* Logout di bagian bawah */}
        <Box sx={{ p: 2 }}>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="secondary"
            startIcon={<LogoutIcon />}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
