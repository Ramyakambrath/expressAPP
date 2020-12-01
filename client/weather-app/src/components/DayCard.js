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
import moment from 'moment'



const initialState = {     
        currentTemp:'',
        humidity:'',
        wind:'',
        windDirection:'',
        currentCondition:'',
        currentConditionDescription:'',
        weatherIcon:'',
        date:'',
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
      case 'UpdateData':
      return { ...state, 
            currentTemp: Math.round(action.value.main.temp) + '°',
            humidity: action.value.main.humidity + '%',
            wind: Math.round(action.value.wind.speed) + ' mph',
            windDirection: action.value.wind.deg,
            currentCondition: action.value.weather[0].main,
            currentConditionDescription: action.value.weather[0].description,
            date: moment(action.value.dt_txt).format('ll'),
            day:moment(action.value.dt_txt).format('dddd'),
            country:action.value.sys.country
    };
    default:
     return null
  }
}

const DayCard=(props)=>{
    const [state, dispatch] = useReducer(reducer, initialState);

useEffect(()=>{
   
        console.log('props',props.reading.dt_txt)
         
        //    if(data.data.data.cod === '404')
        //    {
        //     dispatch({type:'Loading'})
        //     dispatch({type:'CityNotFound'})
         
        //    }
        //    else{
            
            let weatherId=props.reading.weather[0].id;
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
           dispatch({type:'UpdateData',value:props.reading})

           


        //    }


    


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
               
          </div>

          <div className="weatherCardContainer">
            <div className="weatherCard">
            <h4 style ={{color:'beige', fontWeight: 'normal'}}>{state.date}</h4>
            <h5 style ={{color:'beige',font:"10px"}} >{state.day}</h5>
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

 

    return (
        <div className="weatherContainerDay">
        <Card style={{maxWidth:300}}>
            { WeatherConditions } 
        </Card>
        </div>
    )




}



export default DayCard