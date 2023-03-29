import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'

export class EmptyCart extends Component {
  render() {
    return (
    <Box>
  <Typography variant='h6' sx={{fontWeight:'bold',color:'purple',textAlign:'center',m:3}}>Your Cart is Empty</Typography>
    </Box>
    )
  }
}

export default EmptyCart