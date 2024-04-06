import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import $axios from "../lib/axios.instance";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Category = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["category"],
    queryFn: async (values) => {
      return await $axios.get("/product/category/list", values);
    },
  });
  // console.log(data)
  const uniqueCategories = data?.data?.uniqueCategories;
  return (
    <>
      <Box
        className="slider-container"
        style={{ background: "", padding: "2rem" }}
      >
        <Box sx={{ background: "",textAlign:"start", margin: "2rem 0rem 3rem 2rem",width:"200px",textDecoration:"underline",textUnderlineOffset:"10px",textDecorationThickness:"1px"  }}>
          <Typography
            variant="h4"
            fontWeight="light"
            textAlign="start"           
            sx={{color:"black"}}
          >
            CATEGORIES
          </Typography>
        </Box>
        <Slider {...settings}>
          {uniqueCategories?.map((item) => {
            return (
              <Card
              className="slider"
                key={item._id}
                sx={{ maxWidth: 245, height: "100%", background: "" }}
              >
                <img
                  src={item.image}
                  alt="Image"
                  width="100%"
                  height="200px"
                  style={{ cursor: "pointer", background: "", padding: "1rem" }}
                />

                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      navigate(`/category/list/${item._id}`);
                    }}
                  sx={{background:"#282828",color:"#fff", "&:hover":{background:"none",color:"#000",boxShadow:"none",border:"1px solid #000"},marginTop:"1rem"}}>
                    {item.category}
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Slider>
      </Box>
    </>
  );
};

export default Category;
