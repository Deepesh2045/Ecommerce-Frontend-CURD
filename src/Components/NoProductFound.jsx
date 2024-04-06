import { Box, Typography } from '@mui/material'
import React from 'react'

const NoProductFound = () => {
  return (
    <>
    <Box>
        <Typography variant='h4'sx={{color:"red"}}>No Item Found</Typography>
    </Box>
    </>
  )
}

export default NoProductFound