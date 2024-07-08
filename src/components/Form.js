// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./backButton";
import { useCities } from "../context/citiesContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("Morroco");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji , setEmoji]=useState("");
  const [IsLoadingGeocoding , setIsLoadingGeocoding]=useState(false);
  const [geocodingError , setGeocodingError]=useState('');
  const navigate = useNavigate()
  
  const [lat , lng] = useUrlPosition();
  const {createCity , loading}=useCities()
  
  useEffect(function(){
    async function fetchCityData(){
      if(!lat || !lng) return;
      try{
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if(!data.countryCode) throw new Error("That dosen't seem to be a city , click somewere elese !");
        setCityName(data.city || data.locality||'');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode))
      }catch(error){
        setGeocodingError(error.message)
      }finally{
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  },[lat , lng])

  // function to handel submit
  async function handelSubmit(e){
    e.preventDefault();
    if(!cityName || !date) return ;
    const newCity = {
      cityName ,
      country ,
      emoji ,
      date ,
      notes ,
      position:{lat:parseFloat(lat) , lng:parseFloat(lng)}
    }
    await createCity(newCity)
    navigate('/app')
  }

  if(!lat || !lng ) return <Message message='start by clicking to the map'/>
  if(IsLoadingGeocoding) return <div className="spinner-border text-warning"></div>
  if(geocodingError) return <Message message={geocodingError}/>
  return (
      <form className={`${styles.form} ${loading ? styles.loading : ''}`} onSubmit={handelSubmit}>
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            className="form-control"
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <DatePicker className="form-control" id="date" selected={date} onChange={(date) => setDate(date)} />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            className="form-control"
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type='primary'>Add</Button>
          <BackButton/>
        </div>
      </form>
  );
}

export default Form;
