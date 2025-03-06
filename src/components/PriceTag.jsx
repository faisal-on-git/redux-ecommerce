import React from 'react';
import { Box, Typography } from '@mui/material';

const PriceTag = ({ price }) => {
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return (price * 50).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
      <Box sx={{
        color: 'white',
        backgroundColor: '#e74c3c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        borderRadius: '4px 0 0 4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          ₹ {formatPrice(price)}
        </Typography>
      </Box>
      
      <Box sx={{
        color: '#7f8c8d',
        backgroundColor: '#f8f9fa',
        padding: '8px 12px',
        borderRadius: '0 4px 4px 0',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
          {Math.round(10 + Math.random() * 20)}% OFF
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceTag; 