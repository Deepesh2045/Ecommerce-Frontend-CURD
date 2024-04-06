import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LockIcon from "@mui/icons-material/Lock";
import CallIcon from "@mui/icons-material/Call";
import { fallBackImage } from "../Constant/general.constant";

import ProductSlider from "./ProductSlider";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import { Link, useNavigate } from "react-router-dom";
import Category from "./Category";
import Banner from "./Banner";

const Main = (props) => {
 

  return (
    <>
      <Grid
        container
        spacing={2}
        className="bottomImg"
        sx={{
          height: "",
          background: "",
          padding: "30px 25px 30px 25px",
          matgin: "auto",
        }}
      >
        <Grid
          item
          lg={3}
          sx={{ display: "flex", alignItems: "center", background: "" }}
        >
          <Box
            sx={{
              width: "70px",
              height: "70px",
              background: "#000",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
            }}
          >
            <LocalShippingIcon sx={{ fontSize: "40px", color: "#fff" }} />
          </Box>

          <Box sx={{ textAlign: "start", marginLeft: "10px" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Free Shipping & Return
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              for regular customers or over $200 online orders
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          lg={3}
          sx={{ display: "flex", alignItems: "center", background: "" }}
        >
          <Box
            sx={{
              width: "70px",
              height: "70px",
              background: "#000",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
            }}
          >
            <CompareArrowsIcon sx={{ fontSize: "40px", color: "#fff" }} />
          </Box>

          <Box sx={{ textAlign: "start", marginLeft: "10px" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              15 Days Exchange
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              for regular customers or over $200 online orders
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          lg={3}
          sx={{ display: "flex", alignItems: "center", background: "" }}
        >
          <Box
            sx={{
              width: "70px",
              height: "70px",
              background: "#000",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
            }}
          >
            <LockIcon sx={{ fontSize: "40px", color: "#fff" }} />
          </Box>

          <Box sx={{ textAlign: "start", marginLeft: "10px" }}>
            <Typography sx={{ fontWeight: "bold" }}>Secure Payment</Typography>
            <Typography sx={{ fontSize: "14px" }}>
              for regular customers or over $200 online orders
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          lg={3}
          sx={{ display: "flex", alignItems: "center", background: "" }}
        >
          <Box
            sx={{
              width: "70px",
              height: "70px",
              background: "#000",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
            }}
          >
            <CallIcon sx={{ fontSize: "40px", color: "#fff" }} />
          </Box>

          <Box sx={{ textAlign: "start", marginLeft: "10px" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Customer Support 24/7
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              for regular customers or over $200 online orders
            </Typography>
          </Box>
        </Grid>
      </Grid>


<Category/>
<Banner/>

      <ProductSlider />
    </>
  );
};

export default Main;
