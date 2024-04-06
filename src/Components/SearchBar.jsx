import { Box, Button, FormControl, Input, InputAdornment, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from 'react-redux';
import { clearProductFilter, updateSearchProduct } from '../store/slices/productSlice';
import { debounce } from 'lodash';
import Filter from './Filter';
import _ from 'lodash';


const SearchBar = () => {
   const dispatch =  useDispatch()
   const {searchProduct,isFilterApplied} = useSelector((state)=>state.product)
   
  return (
    <>
    
    <Box
        sx={{
          display:"flex",
          justifyContent:"space-between",
          flexWrap:"wrap",
          gap:"1rem",
          marginBottom: "2rem",
          background: "",
          textAlign: "start",
          marginLeft: "3rem",
          marginTop:"50px"
        }}
      >
        <Box>
        <FormControl variant="contained">
          <Input
          value = {searchProduct}
          onChange={(event)=>{
            dispatch(updateSearchProduct(event?.target?.value))
          }}
            placeholder="Search Products"
            startAdornment={
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            }
          />
        
        </FormControl>
        </Box>

       
        <Filter/>

      </Box>

    
    </>
  )
}

export default SearchBar