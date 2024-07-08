import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Popup ,Marker, useMap, useMapEvents } from 'react-leaflet'

import style from './Map.module.css'
import { useCities } from '../context/citiesContext';
import { useGeolocation } from '../hooks/useGeolocator';
import { useUrlPosition } from '../hooks/useUrlPosition';

const Map = () => {
    const {cities}=useCities();
    const [position , setPosition]=useState([31,-7]);
    const {isLoading:isLoadingPosition , position:geolocationPosition , getPosition}=useGeolocation()


    const [lat , lng]=useUrlPosition();

    useEffect(function(){
        if(lat , lng) setPosition([lat , lng])
    },[lat , lng])

    useEffect(function(){
        if(geolocationPosition) setPosition([geolocationPosition.lat , geolocationPosition.lng])
    },[geolocationPosition])

    return (
        <div  className={`${style.mapContainer} position-relative`}>
            <MapContainer center={position} zoom={5} scrollWheelZoom={false} className={style.map}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
              {
                cities.map(c=>(
                    <Marker key={c.id} position={[c.position.lat , c.position.lng]}>
                        <Popup>
                            <span>{c.emoji}</span>
                            <span>{c.cityName}</span>
                            
                        </Popup>
                    </Marker>
                ))
              }
              <ChangeCenter position={position} setPosition={setPosition}/>
              <GetForm/>
            </MapContainer>
           {
             !geolocationPosition  &&
            <button className='btn btn-success get--geolocation' onClick={getPosition}>{isLoadingPosition ? 'loading...':'use your position'}</button>
           }
        </div>
    );
}

function ChangeCenter({position}){
    const map = useMap();
    map.setView(position)
    return null;
}

function GetForm() {
    const navigate = useNavigate();
    useMapEvents({
      click: (e)=> {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      }
    })
}
export default Map;
