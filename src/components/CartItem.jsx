import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  Typography, 
  IconButton,
  Divider
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart, removeFromCart, updateQuantity } from '../redux/actions/cartActions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };
  
  const handleRemoveAllFromCart = () => {
    dispatch(updateQuantity(product.id, 0));
  };
  
  const handleNavigateToDetails = () => {
    history.push(`/details/${product.id}`);
  };
  
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return (price * 50).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };
  
  const totalPrice = formatPrice(product.price * product.quantity);
  
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-between',
      width: '100%',
      mb: 2,
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        flex: 1
      }}>
        <CardMedia
          component="img"
          height="150"
          image={product.image}
          alt={product.title}
          onClick={handleNavigateToDetails}
          sx={{
            cursor: 'pointer',
            objectFit: 'contain',
            width: { xs: '100%', sm: '150px' },
            padding: '10px',
            backgroundColor: '#fff'
          }}
        />
        
        <CardContent sx={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          padding: '16px'
        }}>
          <Box>
            <Typography 
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#2c3e50',
                mb: 1,
                cursor: 'pointer'
              }}
              onClick={handleNavigateToDetails}
            >
              {product.title}
            </Typography>
            
            <Typography 
              variant="caption" 
              sx={{ 
                backgroundColor: '#3498db', 
                color: 'white', 
                padding: '2px 6px', 
                borderRadius: '4px',
                textTransform: 'capitalize',
                display: 'inline-block',
                mb: 2
              }}
            >
              {product.category}
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <IconButton 
                size="small" 
                onClick={handleRemoveFromCart}
                sx={{ 
                  borderRadius: 0,
                  backgroundColor: '#f5f5f5'
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              
              <Typography 
                sx={{ 
                  px: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                {product.quantity}
              </Typography>
              
              <IconButton 
                size="small" 
                onClick={handleAddToCart}
                sx={{ 
                  borderRadius: 0,
                  backgroundColor: '#f5f5f5'
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#e74c3c',
                  fontSize: '1.1rem'
                }}
              >
                ₹ {totalPrice}
              </Typography>
              
              <IconButton 
                size="small" 
                color="error" 
                onClick={handleRemoveAllFromCart}
                sx={{ ml: 1 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CartItem;