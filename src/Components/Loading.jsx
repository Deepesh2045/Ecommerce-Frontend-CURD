import { Box, Grid } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <>
    <Grid container xs={12}> 
    <Grid item sx={{ width:"100%", height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Box ><img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="Loader" width="100px" /></Box>

    </Grid>

    </Grid>
    
    </>
  )
}

export default Loading