import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter,Switch,Route, withRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import './App.css'

import ProductDetails from './Pages/ProductDetails'




export class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:id" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
       
      </div>
    )
  }
}


export default withRouter(App)