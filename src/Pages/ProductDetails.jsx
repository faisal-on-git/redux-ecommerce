import axios from "axios";
import React, { Component } from "react";
import { Card, CardContent, CardMedia, Typography,Rating, Button } from "@mui/material";
import PriceTag from "../components/PriceTag";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import { addToCart,removeFromCart } from "../redux/actions/cartActions";



export class ProductDetails extends Component {
  state = {
    product: {},
  };
handleAddToCart=()=>{
    this.props.addToCart(this.state.product)
}
  componentDidMount() {
    console.log(this.props.match.params.id, "id");
    axios
      .get(`https://fakestoreapi.com/products/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ product: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    // console.log(this.state.product.rating?.rate, "product")
    const val=Math.floor(this.state.product.rating?.rate)
    return (
      <div>
        <Card sx={{ display:'flex',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row'} ,justifyContent:'space-between', m: 2 }}>
          <CardMedia
            component="img"
        Height="500"
            // height="300"
            image={this.state.product.image}
            alt="Paella dish"
            
            style={{ cursor: "pointer", objectFit: "contain" ,flex:4,maxHeight:400}}
          />
          <CardContent
            sx={{
             
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            flex:6
            }}
          >
            <Box >
            <Typography gutterBottom variant="h6" component="div" sx={{fontSize:'2rem'}}>
               
                {this.state.product.title}
            </Typography>
            <PriceTag price={this.state.product.price}/>
          
          
        
            <Typography variant="overline" display="block" gutterBottom sx={{fontSize:'1.2rem',m:1}}>
              {/* {this.props.product.category} */}
                {this.state.product.category}
            </Typography>
            <Rating name="read-only" value={val} readOnly  sx={{fontSize:40}}/>

          
            </Box>
            {/* <Button variant='contained' onClick={() => {
        this.props.addToCart(this.props.product)
    }
    }>Add to cart</Button> */}

    <Box>
    <Typography variant="body2" color="text.secondary">
        {this.state.product.description}
    </Typography>
    </Box>
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
        <Button variant='contained' sx={{width:{xs:'60%', lg:"30%"}}} onClick={this.handleAddToCart}>Add to cart</Button>
   </Box>

          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
     cartProducts: state.cartReducer.products,
     totalCount:state.cartReducer.totalCount
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);


