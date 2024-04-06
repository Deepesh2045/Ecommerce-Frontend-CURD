import { Box, Button, Grid, Typography, } from '@mui/material'
import React from 'react'

const Banner = () => {
  
  return (
    <>

    <Grid container sx={{background:"#e0e0e0",paddingTop:"1rem",marginTop:"2rem"}}>
        <Grid item md={6} sx={{background:""}}>
            <img src="https://i.ibb.co/yVxjPfv/banner6.png" alt='' width="80%"/>
        </Grid>

        <Grid item  md={6}  sx={{display:"flex", alignItems:"center",padding:"2rem"}}>
            <Box><Typography variant='h3' fontWeight="bold" textAlign="start"> Exclusive Headphone Collections</Typography>
            <Typography variant='body2' textAlign="justify"> Immerse yourself in pure sound with these sleek, wireless headphones. Enjoy crisp highs and deep lows, plus noise-canceling technology for uninterrupted listening. Comfortable design for all-day wear.</Typography>
           <Box sx={{textAlign:"start",marginTop:"1rem"}}> <Button variant='outlined' sx={{color:"#000", borderColor:"black", "&:hover":{background:"#000",color:"#fff",border:"none"}}}>Shop Now</Button></Box>
            </Box>
        </Grid>
    </Grid>

    </>
  )
}

export default Banner