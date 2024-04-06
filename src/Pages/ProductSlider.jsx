import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useQuery } from "react-query";
import $axios from '../lib/axios.instance';
import { useNavigate } from 'react-router-dom';


const ProductSlider = (props) => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
      
const {isLoading,data} = useQuery({
    queryKey:["latest-product"],
    queryFn:async()=>{
        return await $axios.get("/product/list/latest") 
    }
})
const latestProducts =data?.data?.latestProducts
  return (
    <>
   
<Box  className="slider-container" style={{background:"#fbfbfa",padding:"3rem"}}>
<Box sx={{ background: "",textAlign:"start", margin: "2rem 0rem 3rem 1rem",textDecoration:"underline",textUnderlineOffset:"10px",textDecorationThickness:"1px"  }}>
          <Typography
            variant="h4"
            fontWeight="light"
            textAlign="start"           
            sx={{color:"black"}}
          >
            LATEST PRODUCT
          </Typography>
        </Box>
    <Slider {...settings}>
{latestProducts?.map((item)=>{
    return <Card key={item._id} sx={{ maxWidth: 270,maxHeight: 350, background:"" }}>
    <img src={item.image} alt="Image" width="100%" height="200px" style={{cursor:"pointer",background:"",padding:"1rem"}}/>
    <CardContent>
      <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"start",fontWeight:"bold", display:"flex", justifyContent:"space-between"}}> 
    {item.name}
      <Chip label={item.brand} />
      </Typography>
      <Typography variant="body2" color="black"  sx={{textAlign:"justify"}}>
       Rs.{item.price}

      </Typography>
    </CardContent>
    <CardActions>
    <Button variant='contained'  fullWidth onClick={()=>{
      if(userRole==="buyer"){

        navigate(`/product-details/${item._id}`)
      }else{
        navigate("/login")

      }
        }}  sx={{background:"#282828",color:"#fff", "&:hover":{background:"none",color:"#000",boxShadow:"none",border:"1px solid #000"}}}>Explore</Button>
    </CardActions>
  </Card>


  

  

  

 
})}

   
</Slider>
  </Box> 
    
    </>
  )
}

export default ProductSlider