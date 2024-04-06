import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        className="footer"
        sx={{
          background: "#111111",
          width: "100%",
          zIndex: "15000",
          marginTop: "auto",
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "white", padding: "5px" }}>
          Copyrights @2024 Design by Deepesh Lama
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
