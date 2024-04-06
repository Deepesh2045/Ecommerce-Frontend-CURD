import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";
import CustomSnackbar from "../Components/CustomSnackbar";

const MainLayput = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CustomSnackbar/>
      <Footer />
    </>
  );
};

export default MainLayput;
