import React, { Component } from 'react'
import { Card, CardContent, CardMedia,Box, Button, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addToCart,removeFromCart } from '../redux/actions/cartActions'
import CartButton from './CartButton'

export class CartItem extends Component {

    handleAddToCart = () => {
        this.props.addToCart(this.props.product)
    }

    handleRemoveFromCart = () => {
        this.props.removeFromCart(this.props.product)
    }
  render() {
    return (
  



<Card sx={{display:'flex',flexDirection:'row',justifyContent:'space-between' ,width:{xs:'100%',md:'80%',lg:'50%',p:1},m:1,pr:4}}>
    <CardMedia
    component="img"
    height="150"
    width={{xs:'100%',md:'80%',lg:'50%',p:1}}
    image={this.props.product.image}
    alt="Paella dish"
    style={{cursor:'pointer',objectFit:'contain',flex:1}}
    
    />
   <CardContent sx={{display:"flex" , flexDirection:'column',alignItems:'flex-start',flex:1,justifyContent:'center',m:1}}>
   <Typography sx={{fontWeight:'bold',fontSize:'1.2rem'}}>{this.props.product.title}</Typography>

    <Box sx={{display:'flex'}}>
    {/* <Button sx={{backgroundColor:'purple',height:'25px',width:'25px',color:'white',":hover":{color:'black'},fontSize:'1.4rem'}} onClick={this.handleAddToCart}>+</Button> */}
    <CartButton symbol='+' handleFunction={this.handleAddToCart}></CartButton>
    <Typography sx={{transform: 'translate(0px, -10px)',m:1,fontWeight:'bold',fontSize:'1.2rem'}} gutterBottom>{this.props.product.quantity}</Typography>
    {/* <Button onClick={this.handleRemoveFromCart}>-</Button> */}
    <CartButton symbol='-' handleFunction={this.handleRemoveFromCart}></CartButton>
    </Box>


   </CardContent>
</Card>

      
    )
  }
}


const mapStateToProps = (state) => ({
    cartProducts: state.cartReducer.products,
    total: state.cartReducer.total
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartItem))

    

// export default CartItem