// frontend/src/layout/MainLayout.js
import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
