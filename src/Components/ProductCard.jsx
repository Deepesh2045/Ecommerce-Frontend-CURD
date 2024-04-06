import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';
import { fallBackImage } from '../Constant/general.constant';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props)=> {
  const navigate =  useNavigate()
  return (

    <Box sx={{}}>
    <Card sx={{ maxWidth: 270, background:"" }}>
      <img src={props.image || fallBackImage} alt="Image" width="100%" height="250px" style={{cursor:"pointer"}} onClick={()=>{
        navigate(`/product-details/${props._id}`)
      }}/>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"start",fontWeight:"bold", display:"flex", justifyContent:"space-between"}}> 
        {props.name}
        <Chip label={props.brand} />
        </Typography>
        <Typography variant="body2" color="text.secondary"sx={{textAlign:"justify"}}>
          {props.description.trim()}...

        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained'  fullWidth onClick={()=>{
          navigate(`/product-details/${props._id}`)
        }}  sx={{background:"#282828",color:"#fff", "&:hover":{background:"none",color:"#000",boxShadow:"none",border:"1px solid #000"}}}>Explore</Button>
      </CardActions>
    </Card>
    
    </Box>
  );
}

export default ProductCard