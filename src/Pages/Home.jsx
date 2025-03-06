import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { fetchProducts } from '../redux/actions/productAction'
// import { getProducts ,setProducts} from '../features/productSlice'

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { products, loading, error } = useSelector(state => state.productReducer)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px',
      gap: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      {products?.map((product) => (
        <ItemCard product={product} key={product.id} />
      ))}
    </Box>
  )
}

export default Home
