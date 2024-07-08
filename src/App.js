import React, { Suspense, lazy } from 'react';
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom';
import './globalStyling.css'

import {CitiesProvider } from './context/citiesContext';
import { AuthProvider } from './context/AuthContext';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage';

const Homepage = lazy(()=>import('./pages/Homepage'));
const AppLayout = lazy(()=>import('./components/AppLayout'));
const Pricing = lazy(()=>import('./pages/Pricing'));
const Product = lazy(()=>import('./pages/Product'));
const Login = lazy(()=>import('./pages/Login'));
const PageNotFound = lazy(()=>import('./pages/PageNotFound'));

const App = () => {
    return(
        <CitiesProvider>
            <AuthProvider>
                <BrowserRouter>
                <Suspense fallback={<SpinnerFullPage/>}>
                    <Routes>
                        <Route path='*' element={<PageNotFound/>} /> 
                        <Route path='/' element={<Homepage />} /> 
                        <Route path='/login' element={<Login />} /> 
                        <Route path='/app' element={<AppLayout />} >
                            <Route index element={<Navigate replace to='cities'/>}/>
                            <Route path='cities' element={<CityList />}/>
                            <Route path='cities/:id' element={<City/>}/>
                            <Route path='countries' element={<CountryList/>}/>
                            <Route path='form' element={<Form/>}/>
                        </Route> 
                        <Route path='/pricing' element={<Pricing />} /> 
                        <Route path='/product' element={<Product />} /> 
                    </Routes>
                </Suspense>
                </BrowserRouter>
            </AuthProvider>
        </CitiesProvider>
    );
}

export default App;
