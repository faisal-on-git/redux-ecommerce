import { Button } from '@mui/material'
import React, { Component } from 'react'

export class CartButton extends Component {
  render() {
    return (
        <Button sx={{backgroundColor:'purple',height:'30px',width:'25px',color:'white',":hover":{color:'black'},fontSize:'1.4rem',fontWeight:'500',padding:'5px'}} onClick={this.props.handleFunction}>{this.props.symbol}</Button>

    )
  }
}

export default CartButton