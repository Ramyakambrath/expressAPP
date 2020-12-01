import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import ThunderStormIcon from '../views/assets/weather_icons/01W.svg';
import RainIcon from '../views/assets/weather_icons/Rain-Icon.svg';
import SnowIcon from '../views/assets/weather_icons/03W.svg';
import ClearIcon from '../views/assets/weather_icons/04W-DAY.svg';
import CloudsIcon from '../views/assets/weather_icons/05W.svg';
import NoLocationFound from '../views/assets/no-location.svg';
import LoadingIcon from '../views/assets/loading.svg';
import {useEffect, useState,useReducer} from 'react';
import axios from 'axios';
import {Card} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';



const initialState = {
        isLoading:true,
        currentTemp:'',
        humidity:'',
        wind:'',
        windDirection:'',
        currentCondition:'',
        currentConditionDescription:'',
        weatherIcon:'',
        cityName:'',
        cityNotFound:'',
        country:''
    };

function reducer(state, action) {
  switch (action.type) {
      case 'ThunderStorm':
          return { ...state, weatherIcon: ThunderStormIcon };
      case 'Rain':
          return { ...state, weatherIcon: RainIcon };
      case 'Clear':
          return { ...state, weatherIcon: ClearIcon };
      case 'Snow':
          return { ...state, weatherIcon: SnowIcon };
      case 'Clouds':
          return { ...state, weatherIcon: CloudsIcon };
      case 'Loading':
      return { ...state, isLoading: !state.isLoading};
      case 'CityNotFound':
      return { ...state, cityNotFound: '404'};
      case 'UpdateData':
      return { ...state, 
            currentTemp: Math.round(action.value.data.main.temp) + '°',
            humidity: action.value.data.main.humidity + '%',
            wind: Math.round(action.value.data.wind.speed) + ' mph',
            windDirection: action.value.data.wind.deg,
            currentCondition: action.value.data.weather[0].main,
            currentConditionDescription: action.value.data.weather[0].description,
            cityName: action.value.data.name,
            country:action.value.data.sys.country
    };
    default:
      throw new Error();
  }
}

const CurrentWeather=()=>{
    const [state, dispatch] = useReducer(reducer, initialState);

useEffect(()=>{
    axios.get('/search-location-weather')
	//	.then(res => res.json())
		.then(data => {
         
           if(data.data.data.cod === '404')
           {
            dispatch({type:'Loading'})
            dispatch({type:'CityNotFound'})
         
           }
           else{
            
            let weatherId=data.data.data.weather[0].id;
            console.log('weatherId',weatherId)
            if(weatherId <= 232) {
               dispatch({type:'ThunderStorm'  })
              
           } else if(weatherId >= 300 && weatherId <= 531) {
                dispatch({type:'Rain'  })
              
           } else if(weatherId >= 600 && weatherId <= 622 ) {
            dispatch({type:'Snow'  })
                
           } else if(weatherId === 800) {
            dispatch({type:'Clear'})

            
           } else if(weatherId >= 801 && weatherId <= 804) {
            dispatch({type:'Clouds'})
               
           }
            
           dispatch({type:'Loading'})
           dispatch({type:'UpdateData',value:data.data})

           


           }


    })
    .catch(err=>{
        console.log(err)
    })


},[])



    const WeatherCardError=(

        <div className="weatherCardContainer">
          <div className="weatherCardError">
              <img src={NoLocationFound} alt='no location found'/>
                <p>Whoa! Looks like there was an error with your zipcode.</p>
                <Link to='/'><button>Try again</button></Link>
          </div>
        </div>
    )

    const WeatherConditions=(
      state.cityNotFound === 404 ?{WeatherCardError}:
       <div>
          <div className='homeBtn'>
          <Link to='/'><button style={{backgroundColor:'#4148F2',color:'white'}}>Home</button></Link>         
          </div>

          <div className="weatherCardContainer" >
            <div className="weatherCard">
            <h4 style ={{color:'beige'}}> Location | {state.cityName} , {state.country}</h4>
              <img src={state.weatherIcon} alt='weather icon'/>
              <div className="conditionsOverview" style={{fontSize:"20px"}}>
                  <p>{state.currentTemp}</p>
                  <p>{state.currentConditionDescription}</p>
              </div>
              <div className="conditionDetails"  style={{fontSize:"10px"}}>
                 <p>Humidity {state.humidity}</p>
                 <p>Wind {state.wind}</p>

              </div>
            </div>
           

          </div>
      </div>
      

    )

    const LoadingDisplay=(
       <div className="Loading">
           <img className='loadingIcon' src={LoadingIcon} alt='loading icon'/>
       </div>

    )

    const CurrentWeatherCard=(

        state.isLoading === true?<div>{LoadingDisplay}</div>:<div>{WeatherConditions}</div>
    )

    return (
        <div className="weatherContainer">
            {/* <h2>Weather Forecast</h2> */}
        <Card style={{Width:300}}>
            { CurrentWeatherCard } 
        </Card>
        </div>
    )




}



export default CurrentWeather