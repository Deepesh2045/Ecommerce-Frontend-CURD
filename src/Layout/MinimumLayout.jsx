import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomSnackbar from '../Components/CustomSnackbar'

const MinimumLayout = () => {
  return (
    <>
    <CustomSnackbar/>
    <Outlet/>
    
    </>
  )
}

export default MinimumLayout