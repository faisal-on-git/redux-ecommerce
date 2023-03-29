import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import { addToCart } from '../features/cartSlice'


export class ItemCard extends Component {
  render() {
    // console.log(this.props.product)
    return (
      <div>
        <Card sx={{ width: 300,height:420,m:2 }}>
  
  <CardMedia
    component="img"
    height="300"
    image={this.props.product.image}
    alt="Paella dish"
    onClick={() => {
        this.props.history.push(`/details/${this.props.product.id}`)
    }
    }
    style={{cursor:'pointer',objectFit:'contain'}}
  />
  <CardContent sx={{height:100,display:'flex',flexDirection:'column',justifyContent:'end'}}>
<Typography gutterBottom variant="subtitle3" component="div">
        {this.props.product.title}
    </Typography>

    <Typography variant="body2" color="text.secondary">
    ₹ {this.props.product.price*50}
    </Typography>
    <Typography variant="overline" display="block" gutterBottom>
        {this.props.product.category}
      </Typography>





    <Typography variant="body2" color="text.secondary">
      {/* {this.props.product.description} */}
    </Typography>
    {/* <Button variant='contained' onClick={() => {
        this.props.addToCart(this.props.product)
    }
    }>Add to cart</Button> */}
  </CardContent>
 
  
</Card>
      </div>
    )
  }
}
// const mapStateToProps = (state) => ({
//     cart: state.cart,
   
//     })

// const mapDispatchToProps = (dispatch) => ({
//     addToCart: (product) => dispatch(addToCart(product))
//     })

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemCard))
export default withRouter(ItemCard)