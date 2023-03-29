import { Box, Typography } from '@mui/material';

const PriceTag = ({ price }) => {
  return (

    <Box sx={{display:'flex'}}>
        <Box sx={{color:'white',width:'300px',height:'60px',backgroundColor:'purple',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <Typography variant='h6' sx={{fontWeight:'bold'}}>   ₹{price*50} </Typography>
        </Box>
    <Box sx={{color:'white', borderTop: '30px solid transparent',
    borderLeft: '70px solid purple',
    borderBottom: '30px solid transparent'}}>
        

    </Box>
    </Box>
  );
};

export default PriceTag;