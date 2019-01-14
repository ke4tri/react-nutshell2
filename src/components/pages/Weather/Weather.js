import React from 'react';
import firebase from 'firebase/app';
import './Weather.scss';
import connection from '../../../helpers/data/connection';
import getWeather2 from '../../../helpers/data/weatherRequests';
import CurrentWeather from './CurrentWeather';
import WeatherForm from './WeatherForm';


class Weather extends React.Component {
  state = {
    uid: '',
    weatherArray2: [],
  }

  getWx = (uid2) => {
    getWeather2.getWeather(uid2)
      .then((weatherArray2) => {
        this.setState({ weatherArray2 });
      })
      .catch(err => console.error('error with getWeather', err));
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // eslint-disable-next-line prefer-destructuring
        const uid = user.uid;
        this.setState({
          uid,
        });
        this.getWx(uid);
      } else {
        this.setState({
          uid: '',
        });
      }
    });
  }

  render() {
    const weatherItemComponents = this.state.weatherArray2.map((weatherItem, index) => <div id={weatherItem.id} className="fas fa-city fa-2x city2 m-2" key={index}>
        {weatherItem.city}, 
        {weatherItem.state}
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
