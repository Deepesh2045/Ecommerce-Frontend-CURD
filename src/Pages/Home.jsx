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
import Slider from "react-slick";

const banner = [
  {
    title: "FEEL THE EXPERIENCE WITH GOOD SOUND",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores error exercitationem explicabo temporibus. Nemo ex esse aut laudantium laboriosam distinctio magnam voluptate deserunt quae temporibus eveniet, debitis ad molestias dicta?",
    image: "https://i.ibb.co/kgLmd7L/banner4.png",
  },
  {
    title: "FEEL THE EXPERIENCE WITH GOOD SOUND",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores error exercitationem explicabo temporibus. Nemo ex esse aut laudantium laboriosam distinctio magnam voluptate deserunt quae temporibus eveniet, debitis ad molestias dicta?",
    image: "https://i.ibb.co/3dQtV0g/banner5.png",
  },
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <>
      {/* <Box sx={{width:"100%",height:{xs:"100%",md:"100vh",lg:"100vh"}, background:"#EEEDEB",padding:{xs:"0px 0px 20px 0px",md:"0px 20px 0px 20px"}}}>
        <Grid container sx={{display:"flex",flexDirection:{xs:"column-reverse",md:"row"}, alignItems:'center', flexWrap:"wrap", flexGrow:"1"}}>
          <Grid item lg={6} xs={12} md={6}>
            <Typography variant="h3" sx={{fontWeight:"bold",textAlign:"start", marginLeft:{xs:"1rem",md:"2rem"}}}>FEEL THE EXPERIENCE <br/>WITH GOOD SOUND</Typography>
            <Typography gutterBottom variant="body2" sx={{textAlign:"justify",marginLeft:{xs:"1rem",md:"2rem"},paddingRight:{xs:"1rem",md:"2rem"}}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores error exercitationem explicabo temporibus. Nemo ex esse aut laudantium laboriosam distinctio magnam voluptate deserunt quae temporibus eveniet, debitis ad molestias dicta? </Typography>

            <Box sx={{textAlign:"start",marginLeft:{xs:"1rem",md:"2rem"}}}><Button variant="contained" sx={{background:"black"}}>Shop Now</Button></Box>
            
        </Grid>
        <Grid item lg={6} xs={12} md={6} sx={{background:""}} >
        <img src="../jbl.png" alt="" width="80%" style={{marginTop:"20px",padding:"20px"}}/>
        </Grid>
        </Grid>
      </Box> */}

      <Slider {...settings}>
        {banner.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: { xs: "100%", md: "100%", lg: "100%" },
                background: "#EEEDEB",
                paddingBottom:{xs:"2rem",md:"0"},
                
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column-reverse", md: "row" },
                  alignItems: "center",
                  flexWrap: "wrap",
                  flexGrow: "1",
                }}
              >
                <Grid item lg={6} xs={12} md={6}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "start",
                      marginLeft: { xs: "1rem", md: "3rem" },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      marginLeft: { xs: "1rem", md: "3rem" },
                      paddingRight: { xs: "1rem", md: "2rem" },
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Box
                    sx={{
                      textAlign: "start",
                      marginLeft: { xs: "1rem", md: "2rem" },
                    }}
                  >
                    <Button variant="contained" sx={{ background: "black", marginLeft:{xs:"0",md:"1rem"} }}>
                      Shop Now
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={6}
                  xs={12}
                  md={6}
                  sx={{ background: "",paddingTop:"", overflow:"hidden" }}
                >
                  <img
                    src={item.image}
                    alt=""
                    width="100%"
                    style={{ margin: "auto", paddingTop: "1rem" }}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Slider>

      <Main />
    </>
  );
};

export default Home;
