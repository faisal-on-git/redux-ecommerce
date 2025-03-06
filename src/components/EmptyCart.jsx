import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useHistory } from 'react-router-dom';

const EmptyCart = () => {
  const history = useHistory();
  
  const handleContinueShopping = () => {
    history.push('/');
  };
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <ShoppingCartOutlinedIcon sx={{ 
        fontSize: '80px', 
        color: '#bdc3c7',
        mb: 3
      }} />
      
      <Typography 
        variant='h5' 
        sx={{
          fontWeight: 'bold',
          color: '#2c3e50',
          mb: 2
        }}
      >
        Your Cart is Empty
      </Typography>
      
      <Typography 
        variant='body1' 
        sx={{
          color: '#7f8c8d',
          mb: 4,
          maxWidth: '400px'
        }}
      >
        Looks like you haven't added anything to your cart yet. 
        Browse our products and find something you'll love!
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={handleContinueShopping}
        sx={{ 
          backgroundColor: '#3498db',
          '&:hover': {
            backgroundColor: '#2980b9'
          },
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default EmptyCart;