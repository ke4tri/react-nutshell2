import React from 'react';
import PropTypes from 'prop-types';
import './Weather.scss';
import getWeather2 from '../../../helpers/data/weatherRequests';
import CurrentWeather from './CurrentWeather';
import WeatherForm from './WeatherForm';
import authRequests2 from '../../../helpers/data/authRequests';
import WeatherLocations from './WeatherLocations';

class Weather extends React.Component {
  state = {
    newUid: '',
    weatherArray2: [],
  }

  static propTypes = {
    weather: PropTypes.func,
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

  deleteOne = (weatherId) => {
    // const newUid = authRequests2.getCurrentUid();
    getWeather2.deleteWeather(weatherId)
      .then(() => {
        getWeather2.getWeather(this.state.newUid)
          .then((weatherArray2) => {
            this.setState({ weatherArray2 });
          });
      })
      .catch(err => console.error('error with deleteOne', err));
  }

  formSubmitEvent = (newWeather) => {
    getWeather2.postRequest(newWeather).then(() => {
      getWeather2.getWeather(this.state.newUid)
        .then((weatherArray2) => {
          this.setState({ weatherArray2 });
        });
    })
      .catch(err => console.error('error with weather post', err));
  }

  render() {
    const weatherItemComponents = this.state.weatherArray2.map(weather => (
      <WeatherLocations
      weather={weather}
      key={weather.id}
      deleteSingleWeather={this.deleteOne}
      weatherArray2={this.state.weatherArray2}
      />
    ));
    return (
      <div className='Home mx-auto'>
        <h3>Weather </h3>
        <div className="container d-flex flex-row">
        <div className="wxForm"><WeatherForm newUid={this.state.newUid} onSubmit={this.formSubmitEvent}/></div>
         <div className="city1">{weatherItemComponents}</div>
         <div className="currentWx"><CurrentWeather weatherArray2={this.state.weatherArray2} /></div>
        </div>
      </div>
    );
  }
}

export default Weather;
