import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import About from './components/about';
import Course from './components/course';
export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={Counter} />
    <Route path='/about' component={About} />
    <Route path='/course' component={Course} />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
