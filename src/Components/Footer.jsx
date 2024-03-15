import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <>
    
    <Grid className='footer'  sx={{background:"#111111", width:"100%"}}>
       

            <Typography variant='subtitle2' sx={{color:"white", padding:"5px"}}>Copyrights @2024 Design by Deepesh Lama</Typography>
      

    </Grid>
    
    </>
  )
}

export default Footer