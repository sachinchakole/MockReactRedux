import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import About from './components/About';
import Login from './components/Login';
import Register from './components/register';
import PrivateRoute from './components/PrivateRoute';
import Product from './components/Product';
import NewProduct from './components/NewProduct';


export const routes = <Layout>
    <PrivateRoute exact path='/' component={Home} />
    <PrivateRoute path='/counter' component={Counter} />
    <PrivateRoute path='/about' component={About} />
    <PrivateRoute path='/product' component={Product}/>
    <PrivateRoute path='/newproduct' component={NewProduct} />
    <PrivateRoute path='/newproduct/:id' component={NewProduct} />
    <Route path='/login' component={Login} />
<Route path='/register' component={Register} />
    <PrivateRoute path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
