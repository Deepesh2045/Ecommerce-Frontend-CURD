import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from "react-query";
import $axios from '../lib/axios.instance';
import Loading from '../Components/Loading';
import { useDispatch } from 'react-redux';
import { openErrorSnackbar } from '../store/slices/snackBarSlice';
import { togglePaymentStatus } from '../store/slices/paymentSlice';


const PaymentSuccess = () => {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const pidx = searchParams.get("pidx")
  
    const {isLoading,data}=useQuery({
      queryKey:["verify-payment"],
      queryFn:async()=>{
        return await $axios.post("/payment/khalti/verify",{
          pidx,
        })
      },
      onError:(error)=>{
        dispatch(openErrorSnackbar(error?.response?.data?.message))
      },
      onSuccess:()=>{
        dispatch(togglePaymentStatus())
      }
    })
    if(isLoading){
      return <Loading/>
    }
  
  return (
    <>
    <Stack justifyContent="center" alignItems="center" spacing={3}sx={{height:"", marginTop:"auto",background:""}}>
        <img src="https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png" alt='' width="120px"/>
      <Box>
    <Typography variant='h4'> Khalti Payment is Successfully</Typography>
    <Typography> Thanks for your payment. Please keep shopping</Typography></Box>
    <Button variant='contained'onClick={()=>{
        navigate("/products")
    }}>Keep Shopping</Button>
    </Stack>

    
    </>
  )
}

export default PaymentSuccess