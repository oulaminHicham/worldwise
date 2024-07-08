import React from 'react';
import style from './CityItem.module.css'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useCities } from '../context/citiesContext';

const CityItem = ({city}) => {
    const {currentCity  , deleteCity} = useCities();
    const {cityName , emoji , date , id , position} = city;

    function handelDelete(e){
        e.preventDefault();
        deleteCity(id);
    }
    return (
        <li>
            <Link  className={`${style.cityItem} ${currentCity.id == id ?style['cityItem--active']:''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={style.emoji}>{emoji}</span>
                <h3 className={style.name}>{cityName}</h3>
                <time className={style.date}>{format(date, '(yyyy/MM/dd)')}</time>
                <button className={`${style.deleteBtn} d-inline`} onClick={(e)=>handelDelete(e)}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;
