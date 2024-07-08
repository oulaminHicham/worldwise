import React from 'react';

import CountryItem from './CountryItem';
import style from './CountryList.module.css'
import { useCities } from '../context/citiesContext';

const CountryList = () => {
    const {cities  , loading}=useCities();
    const uniqueCountries = Array.from(new Set(cities.map(c => c.country)))
    .map(country => {
      return cities.find(c => c.country === country)
   })
   if (loading) return<div className="spinner-border text-primary"></div>
    return (
    <ul className={style.countryList}>
        {
            uniqueCountries.map(country=><CountryItem key={country.id} country={country}/>)
        }
    </ul>
    );
}

export default CountryList;
