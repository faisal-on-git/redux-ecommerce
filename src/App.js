import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import './App.css';

const App = () => {
    const location = useLocation();

    return (
        <div className="app-container">
            <NavBar />
            <main className="main-content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/details/:id" component={ProductDetails} />
                    <Route exact path="/cart" component={Cart} />
                </Switch>
            </main>
        </div>
    );
};

export default App; 