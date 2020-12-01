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
import DayCard from './DayCard'





  

const WeatherForecast=()=>{
  
    const [weatherData,setWeatherData]=useState([])
    const [dailyweather,setdailyweather]=useState([])
    const [isLoading,setloading]=useState(true)
    const [cityNotFound,setcityNotFound]=useState('')

useEffect(()=>{
    axios.get('/search-location-weather/5dayforecast')
	//	.then(res => res.json())
		.then(data => {
            console.log('forecast',data.data.data.list)
            console.log('forecast2',data.data.data.list[0].dt_txt)
           if(data.data.data.cod === '404')
           {
            setloading(false)
            setcityNotFound('City Not Found')
         
           }
           else{
        
           setWeatherData(data.data.data.list)
           const dailyweather=data.data.data.list.filter(reading=>reading.dt_txt.includes('18:00:00'))
           setdailyweather(dailyweather)
           setloading(false)
          


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

    const formatDayCards = () => {
        return dailyweather.map((reading, index) => <DayCard reading={reading} key={index} />)
      }


    const LoadingDisplay=(
       <div className="Loading">
           <img className='loadingIcon' src={LoadingIcon} alt='loading icon'/>
       </div>

    )

    const CurrentWeatherCard=(

      isLoading === true?<div>{LoadingDisplay}</div>:<fragment>{formatDayCards()}</fragment>
    )

    return (
       <div className='dayContainer' >
           {/* <Card style={{maxWidth:300}}> */}
             
           { CurrentWeatherCard } 
        {/* </Card> */}
     

       </div>
        
    )




}



export default WeatherForecast