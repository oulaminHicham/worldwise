import React from 'react';

import styles from './CityList.module.css'
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../context/citiesContext';

const CityList = () => {
    const {loading , cities}=useCities();
    if (loading) return<div className="spinner-border text-primary"></div>
    if(!cities.length) return <Message message='add your favorite city by clicking on the map'/>
    return (
        <ul className={styles.cityList}>
            {
                cities.map(city=><CityItem key={city.id} city={city}/>)
            }
        </ul>
    );
}

export default CityList;
