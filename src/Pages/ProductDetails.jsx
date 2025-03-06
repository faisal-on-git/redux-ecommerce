import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Rating, Button, CircularProgress, Box } from "@mui/material";
import PriceTag from "../components/PriceTag";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { fetchProductById } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const cartProducts = useSelector(state => state.cartReducer.products);
  
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await dispatch(fetchProductById(id));
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [dispatch, id]);
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }
  
  const ratingValue = Math.floor(product.rating?.rate) || 0;
  
  return (
    <div>
      <Card sx={{ 
        display: 'flex', 
        flexDirection: {xs: 'column', sm: 'column', md: 'row', lg: 'row'}, 
        justifyContent: 'space-between', 
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          style={{ 
            cursor: "pointer", 
            objectFit: "contain", 
            flex: 4, 
            maxHeight: 400,
            padding: '20px',
            backgroundColor: '#fff'
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            flex: 6,
            padding: '30px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <Box>
            <Typography 
              gutterBottom 
              variant="h6" 
              component="div" 
              sx={{
                fontSize: '2rem',
                fontWeight: 600,
                color: '#2c3e50',
                marginBottom: '15px'
              }}
            >
              {product.title}
            </Typography>
            <PriceTag price={product.price} />
            
            <Typography 
              variant="overline" 
              display="block" 
              gutterBottom 
              sx={{
                fontSize: '1.2rem',
                m: 1,
                color: '#7f8c8d',
                textTransform: 'uppercase'
              }}
            >
              {product.category}
            </Typography>
            <Rating name="read-only" value={ratingValue} readOnly sx={{ fontSize: 40 }} />
          </Box>
          
          <Box sx={{ my: 3 }}>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                color: '#34495e'
              }}
            >
              {product.description}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button 
              variant='contained' 
              sx={{
                width: {xs: '60%', lg: "30%"},
                backgroundColor: '#3498db',
                '&:hover': {
                  backgroundColor: '#2980b9'
                },
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 'bold'
              }} 
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails; 