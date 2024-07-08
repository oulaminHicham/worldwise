import React, { useEffect, useState } from 'react';
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import Homepage from './pages/Homepage';
import CityList from './components/CityList';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form'

const BASE_URL = 'http://localhost:8000'

const App = () => {
    const [cities , setCities] = useState([]);
    const [loading , setIsLoading] = useState(false);
    useEffect(function(){
        setIsLoading(true);
        async function fetchCities(){
           try{
                const res =await fetch(`${BASE_URL}/cities`) ;
                const data = await res.json();
                setCities(data);
           }catch (err){
                console.log(err);
           }finally{
                setIsLoading(false);
           }
        }
        fetchCities();
    },[])
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage />} /> 
                <Route path='/login' element={<Login />} /> 
                <Route path='/app' element={<AppLayout />} >
                    <Route index element={<Navigate replace to='cities'/>}/>
                    <Route path='cities' element={<CityList loading={loading} cities={cities}/>}/>
                    <Route path='cities/:id' element={<City cities={cities}/>}/>
                    <Route path='countries' element={<CountryList countries={cities} loading={loading}/>}/>
                    <Route path='form' element={<Form/>}/>
                </Route> 
                <Route path='/pricing' element={<Pricing />} /> 
                <Route path='/product' element={<Product />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;
