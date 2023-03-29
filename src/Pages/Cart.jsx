import { Card, CardContent, CardMedia,Box } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CartItem from '../components/CartItem'
import EmptyCart from '../components/EmptyCart'


export class Cart extends Component {

componentDidMount(){
    this.img=this.props.cartProducts[0]?.image
}

componentDidUpdate(prevProps,prevState){
    // this.img=this.props.cartProducts?.image
if(prevProps.cartProducts!==this.props.cartProducts){
    this.img=this.props.cartProducts[0]?.image
}
}

    
  render() {

    console.log(this.props.cartProducts,'cartProducts')  
    return (

        
      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',m:3}}>

       {this.props.cartProducts?.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
        {this.props.cartProducts?.length===0 && <EmptyCart/>}

        </Box>
    
    )
  }
}

const mapStateToProps = (state) => ({
    cartProducts: state.cartReducer.products,
    total: state.cartReducer.total
})

const mapDispatchToProps = (dispatch) => ({
    // addToCart: (product) => dispatch(addToCart(product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))


// export default withRouter(Cart)