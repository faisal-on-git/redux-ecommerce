import { Box } from '@mui/material'
import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { setProducts,fetchProducts } from '../redux/actions/productAction'
// import { getProducts ,setProducts} from '../features/productSlice'






export class Home extends Component {

  componentDidMount() {
    // axios.get('https://fakestoreapi.com/products')

    //   .then(res => {
    //     console.log(res.data)
    //     this.props.setProducts(res.data)
    //     console.log(this.props.products,'products')
    //     console.log(this.props,'props')
      
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    this.props.fetchProducts()

  }


  render() {
    return (
      <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
        {this.props?.products?.map((product) => (
          <ItemCard product={product} key={product.id} />
        ))}
      </Box>

    )
  }
}

const mapStateToProps = (state) => ({
  
  products: state.productReducer.products,
}

)

const mapDispatchToProps = (dispatch) => ({
  // getProducts: () => dispatch(getProducts()),
  setProducts: (products) => dispatch(setProducts(products)),
  fetchProducts: () => dispatch(fetchProducts())
})

const HomeWithRouter=withRouter(Home)

export default connect(mapStateToProps, mapDispatchToProps)( HomeWithRouter)
