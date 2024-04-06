import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoCartItem = () => {
    const navigate = useNavigate()
  return (
    <>
    
    <Stack alignItems="center" justifyContent="center" sx={{marginTop:"" ,width:"100%", background:"",height:"85vh"}}>
           <Box> <img src="https://i.ibb.co/q9WG8Lv/cart-img.png" alt="" width="300px"/></Box>
          <Typography variant="h5" sx={{fontWeight:"bold"}}>You cart is Empty</Typography>
          <Typography sx={{color:"grey"}} >Add something to make me happy</Typography>
          <Button variant="contained" sx={{marginTop:"10px",width:"15%"}} onClick={()=>{
            navigate("/products")
          }}>Continue Shopping</Button>
          </Stack>
    
    </>
  )
}

export default NoCartItem