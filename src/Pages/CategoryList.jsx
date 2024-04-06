import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import $axios from '../lib/axios.instance';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material';
import { fallBackImage } from '../Constant/general.constant';

const CategoryList = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = params?.id
  console.log(id)

  
 const{isLoading, data}= useQuery({
queryKey:["list-category"],
queryFn:async()=>{
  return await axios.get(`http://localhost:8000/product/category-list/${id}`)

}
  })
const productInSameCategory = data?.data?.productInSameCategory
console.log(productInSameCategory)
 
  return (
    <>
    <Grid sx={{background:"",marginTop:"2rem"}}>
<Typography variant="h4" fontWeight="light" textAlign="start" paddingLeft="3rem" sx={{ background: "",textAlign:"start",textDecoration:"underline",textUnderlineOffset:"10px",textDecorationThickness:"1px"  }}>PRODUCT BY CATEGORY</Typography>
</Grid>
<Box  className="slider-container" sx={{background:"",paddingLeft:"3rem",marginTop:"2rem", display:"flex",gap:"1rem"}}>
{productInSameCategory?.map((item)=>{
    return <Card key={item._id} sx={{ width: 270,  background:"" }}>
    <img src={item.image} alt="Image" width="100%" height="200px" style={{cursor:"pointer",background:"",padding:"1rem"}}/>
    <Typography gutterBottom variant="h6" component="div" sx={{ padding:"0rem 1rem 0rem 1rem",textAlign:"start",fontWeight:"bold", display:"flex", justifyContent:"space-between"}}> 
        {item.name}
        <Chip label={item.brand} />
        </Typography>
        <Typography variant="body2" sx={{textAlign:"justify",padding:"0rem 1rem 0rem 1rem"}}>{item.description.slice(0,80)}...</Typography>
    
    <CardActions>
    <Button variant='contained'  fullWidth onClick={()=>{
         navigate(`/product-details/${item._id}`)
    }}  sx={{background:"#282828",color:"#fff", "&:hover":{background:"none",color:"#000",boxShadow:"none",border:"1px solid #000"}}}>Explore</Button>
    </CardActions>
  </Card>

 
})}

   
  </Box> 
    
    </>
  )
}

export default CategoryList