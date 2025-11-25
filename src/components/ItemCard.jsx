import React from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Rating,
  CardActionArea,
  CardActions
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ItemCard = ({ product }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const handleNavigateToDetails = () => {
    history.push(`/details/${product.id}`);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    console.log("Added to cart", product);
  };

  const handleAsyncAddToCart = async (e) => {

    e.stopPropagation();
    setTimeout(() => {
      dispatch(addToCart(product));
      console.log("Added to cart", product);
    }, 1000);
    console.log("Added to cart", product);

  }
  
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return (price * 50).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };
  
  return (
    <Card 
      sx={{ 
        width: 300, 
        height: 450, 
        m: 2, 
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        },
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <CardActionArea onClick={handleNavigateToDetails}>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.title}
          sx={{
            padding: '20px',
            objectFit: 'contain',
            backgroundColor: '#fff'
          }}
        />
        <CardContent sx={{ 
          height: 140, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          backgroundColor: '#f8f9fa'
        }}>
          <Typography 
            gutterBottom 
            variant="subtitle1" 
            component="div"
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.2,
              height: '2.4em'
            }}
          >
            {product.title}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#e74c3c',
                fontSize: '1.1rem'
              }}
            >
              ₹ {formatPrice(product.price)}
            </Typography>
            
            <Typography 
              variant="caption" 
              sx={{ 
                backgroundColor: '#3498db', 
                color: 'white', 
                padding: '3px 8px', 
                borderRadius: '4px',
                textTransform: 'capitalize'
              }}
            >
              {product.category}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating 
              name="read-only" 
              value={product.rating?.rate || 0} 
              readOnly 
              size="small" 
              precision={0.5}
            />
            <Typography variant="caption" sx={{ ml: 1, color: '#7f8c8d' }}>
              ({product.rating?.count || 0})
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ mt: 'auto', padding: '8px 16px', backgroundColor: '#f8f9fa' }}>
        <Button 
          variant="contained" 
          size="small" 
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            backgroundColor: '#2ecc71',
            '&:hover': {
              backgroundColor: '#27ae60'
            },
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;