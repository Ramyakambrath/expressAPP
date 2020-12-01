import React from 'react';
import { Route,Switch,BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import Home from './components/Home';
import ErrorDisplay from './components/ErrorDisplay';


function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path='/' component={Home}/>
      <Route exact path='/current-weather' component={CurrentWeather}/>
      <Route exact path='/current-weather' component={ WeatherForecast}/>
      <Route exact path='/error' component={ErrorDisplay}/>
    </div>
    </Router>
  );
}

export default App;
