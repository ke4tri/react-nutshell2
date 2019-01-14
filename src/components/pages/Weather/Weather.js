import React from 'react';
import './Weather.scss';
import getWeather2 from '../../../helpers/data/weatherRequests';
import CurrentWeather from './CurrentWeather';
import WeatherForm from './WeatherForm';
import authRequests2 from '../../../helpers/data/authRequests';

class Weather extends React.Component {
  state = {
    newUid: '',
    weatherArray2: [],
    currentWx: false,
  }

  componentWillMount() {
    const newUid = authRequests2.getCurrentUid();
    this.setState({ newUid });
    getWeather2.getWeather(newUid)
      .then((weatherArray2) => {
        this.setState({ weatherArray2 });
      })
      .catch(err => console.error('error with getWeather', err));
  }

  render() {
    const weatherItemComponents = this.state.weatherArray2.map((weatherItem, index) => <div id={weatherItem.id} className="fas fa-city fa-2x city2 m-2 container" key={index}>
        {weatherItem.city},
        {weatherItem.state}<button className="btn btn-danger">Current Location</button>
      </div>);
    return (
      <div className='Home'>
        <h2>Weather </h2>
        <div className="container d-flex flex-row">
        <div className="wxForm"><WeatherForm /></div>
         <div className="city1 container d-flex flex-column"> {weatherItemComponents}</div>
         <div className="currentWx"><CurrentWeather /></div>
        </div>
      </div>
    );
  }
}

export default Weather;