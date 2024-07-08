import {createContext, useContext , useEffect, useReducer, useCallback } from "react";

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext();

const initialState ={
  cities:[],
  loading:false,
  currentCity:{},
  errors :''
}

function reducer(state , action){
  switch(action.type){
    case 'LOADING':
      return {...state , loading:true};
    case 'REGECTED':
      return {...state , errors:action.payload , loading:false}
    case 'CITIES/LOADED':
      return {...state , cities:action.payload , loading:false} ;
    case 'CITY/LOADED':
      return {...state , currentCity:action.payload , loading:false}
    case 'CITIES/CREATE':
      return {...state , cities:[...state.cities , action.payload] , loading:false}
    case 'CITIES/DELETE':
      return {...state , cities:state.cities.filter((city)=>city.id != action.payload), loading:false}
    default:
      return state ;
  }
}

function CitiesProvider({children}){
  const [{cities , loading , currentCity} , dispatch]=useReducer(reducer , initialState);

    // function to get all cities from te server
    useEffect(function(){
        dispatch({type:'LOADING'});
        async function fetchCities(){
           try{
                const res =await fetch(`${BASE_URL}/cities`) ;
                const data = await res.json();
                dispatch({type:'CITIES/LOADED' , payload:data});
           }catch{
                dispatch({type:'REGECTED' , payload:'ther was an error when loading data ...'})
           }
        }
        fetchCities();
    },[])
    // function to get current city 
    const getCity = useCallback( async function getCity(id){
      dispatch({type:'LOADING'});
      try{
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data = await res.json();
        dispatch({type:'CITY/LOADED' , payload:data});
      }catch{
        dispatch({type:'REGECTED' , payload:'ther was an error when loading city ...'})
      }
    },[currentCity.id])
    // function to add new city
    async function createCity(newCity){
      dispatch({type:'LOADING'});
      try{
        const res= await fetch('http://localhost:8000/cities' , {
          method:'POST' , 
          body:JSON.stringify(newCity) ,
          headers:{"Content-Type":"application/json"}
        });
        const data = await res.json();
        dispatch({type:'CITIES/CREATE' , payload:data});
      }catch{
        dispatch({type:'REGECTED' , payload:'ther was an error when creating city ...'})
      }
    }
    // function to delete city
    async function deleteCity(id){
      dispatch({type:'LOADING'});
      try{
        await fetch(`http://localhost:8000/cities/${id}` , {
          method:'delete' ,
        })
        dispatch({type:'CITIES/DELETE' , payload:id});
      }catch{
        dispatch({type:'REGECTED' , payload:'ther was an error when deleting city ...'})
      }
    }

    return(
        <CitiesContext.Provider value={{
            cities,
            loading,
            currentCity,
            getCity,
            createCity,
            deleteCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error('the citiesContext was called ouside the context citiesProvider')
    return context;
}

export {CitiesProvider , useCities}
