import { Box, Typography, Button, Divider } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import { clearCart } from '../redux/actions/cartActions';

const Cart = () => {
  const cartProducts = useSelector(state => state.cartReducer.products);
  const totalCount = useSelector(state => state.cartReducer.totalCount);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const calculateTotal = () => {
    return cartProducts.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  const handleContinueShopping = () => {
    history.push('/');
  };
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      m: 3,
      maxWidth: '1200px',
      mx: 'auto',
      p: 2
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          color: '#2c3e50'
        }}
      >
        Your Shopping Cart
      </Typography>
      
      {cartProducts?.length > 0 ? (
        <>
          <Box sx={{ width: '100%' }}>
            {cartProducts.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </Box>
          
          <Divider sx={{ width: '100%', my: 3 }} />
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-end' },
            gap: 2
          }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total Items: {totalCount}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
                Total: ${calculateTotal()}
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleClearCart}
                sx={{ 
                  minWidth: '150px',
                  borderRadius: '8px'
                }}
              >
                Clear Cart
              </Button>
              <Button 
                variant="contained" 
                onClick={handleContinueShopping}
                sx={{ 
                  minWidth: '150px',
                  backgroundColor: '#3498db',
                  '&:hover': {
                    backgroundColor: '#2980b9'
                  },
                  borderRadius: '8px'
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <EmptyCart />
      )}
    </Box>
  );
};

export default Cart;