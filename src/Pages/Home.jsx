import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Main from "./Main";

const Home = () => {
  return (
    <>
    <Box sx={{width:"100%", background:"#EEEDEB", }}>
        <Grid container sx={{display:"flex", alignItems:'center', flexWrap:"wrap", flexGrow:"1"}}>
          <Grid item lg={6} xs={12} md={6}>
            <Typography variant="h3" sx={{fontWeight:"bold",textAlign:"start", marginLeft:"2rem"}}>FEEL THE EXPERIENCE <br/>WITH GOOD SOUND</Typography>
            <Typography gutterBottom variant="body2" sx={{textAlign:"justify",marginLeft:"2rem",paddingRight:"2rem"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores error exercitationem explicabo temporibus. Nemo ex esse aut laudantium laboriosam distinctio magnam voluptate deserunt quae temporibus eveniet, debitis ad molestias dicta? </Typography>

            <Box sx={{textAlign:"start",marginLeft:"2rem"}}><Button variant="contained" sx={{background:"black"}}>Shop Now</Button></Box>
            
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
        <img src="../jbl.png" alt="" width="500px" style={{marginTop:"20px"}}/>
        </Grid>
        </Grid>
      </Box>
<Main/>

    {/* <Link to="/productDetails">
      <Box sx={{width:"250px", height:"100%", background:"white", paddingBottom:"15px", border:"1px solid #111111"}}>
    
        <img src="https://www.beatsbydre.com/content/dam/beats/web/product/headphones/studiopro-wireless/global/serp/studiopro-pdp-global-serp-black.jpg" alt="Image" width="200px"/>
        <Typography variant="h6" sx={{fontWeight:"bold", textAlign:"start", paddingLeft:"10px",color:"black"}}>Beats Studio Pro</Typography>
        <Typography variant="subtitle1" color="error" sx={{textAlign:"start", paddingLeft:"10px", fontWeight:"bold"}}>Rs.22000<span style={{color:"lightgrey",marginLeft:"10px", fontWeight:"normal", textDecoration:"line-through"}}>Rs.25000</span></Typography>
        
        <Typography variant="subtitle2" sx={{textAlign:"start", paddingLeft:"10px",color:"black"}}>Premium Wireless Noise Cancelling Headphones</Typography>

      </Box>
      </Link> */}
      
    </>
  );
};

export default Home;
