import { Box } from '@mui/material'
import React from 'react'
import BuyerProductList from './BuyerProductList'
import SellerProductList from './SellerProductList'
import ProductCard from '../Components/ProductCard'

const ProductList = () => {
  const userRole = localStorage.getItem("userRole")
  return (
    <>
    <Box sx={{width:"100%",background:"", marginTop:"px", paddingTop:"px", paddingBottom:"30px"}}>    
      


    {userRole==="buyer"?<BuyerProductList/>:<SellerProductList/>}

    </Box>

    
    </>
  )
}

export default ProductList