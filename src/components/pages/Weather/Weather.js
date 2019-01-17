import React from 'react';
import PropTypes from 'prop-types';
import './Weather.scss';
import getWeather2 from '../../../helpers/data/weatherRequests';
import CurrentWeather from './CurrentWeather';
import WeatherForm from './WeatherForm';
import authRequests2 from '../../../helpers/data/authRequests';
import WeatherLocations from './WeatherLocations';
import weatherShape from '../../../helpers/propz/weatherShape';

class Weather extends React.Component {
  state = {
    newUid: '',
    weatherArrayTwo: [],
  }

  static propTypes = {
    weather: PropTypes.arrayOf(weatherShape),
  }

  getSomeData = () => {
    const newUid = authRequests2.getCurrentUid();
    this.setState({ newUid });
    getWeather2.getWeather(newUid)
      .then((weatherArrayTwo) => {
        this.setState({ weatherArrayTwo });
        console.log('State at start', this.state.weatherArrayTwo);
      })
      .catch(err => console.error('error with getWeather', err));
  }

  componentWillMount() {
    this.getSomeData();
  }

  deleteOne = (weatherId) => {
    getWeather2.deleteWeather(weatherId)
      .then(() => {
        getWeather2.getWeather(this.state.newUid)
          .then((weatherArrayTwo) => {
            this.setState({ weatherArrayTwo });
          });
      })
      .catch(err => console.error('error with deleteOne', err));
  }

  formSubmitEvent = (newWeather) => {
    getWeather2.postRequest(newWeather).then(() => {
      getWeather2.getWeather(this.state.newUid)
        .then((weatherArrayTwo) => {
          this.setState({ weatherArrayTwo });
        });
    })
      .catch(err => console.error('error with weather post', err));
  }

  trueFalse = (weatherId) => {
    const newerArray = this.state.weatherArrayTwo;
    newerArray.forEach((newer) => {
      if (newer.isCurrent === true) {
        getWeather2.patchIsCurrent(newer.id, false);
      }
    });
    getWeather2.patchIsCurrent(weatherId.id, true);
    this.getSomeData()
      .catch(err => console.error('error with deleteOne', err));
  }

  render() {
    const weatherItemComponents = this.state.weatherArrayTwo.map(weather => (
      <WeatherLocations
      weather={weather}
      key={weather.id}
      deleteSingleWeather={this.deleteOne}
      weatherArrayTwo={this.state.weatherArrayTwo}
      newUid={this.state.newUid}
      trueFalse={this.trueFalse}
      />
    ));
    return (
      <div className='Home mx-auto'>
        <h3>Weather </h3>
        <div className="container d-flex flex-row">
        <div className="wxForm"><WeatherForm newUid={this.state.newUid} onSubmit={this.formSubmitEvent}/></div>
         <div className="city1">{weatherItemComponents}</div>
         <div className="currentWx"><CurrentWeather weatherArrayTwo={this.state.weatherArrayTwo} newUid={this.state.newUid}/></div>
        </div>
      </div>
    );
  }
}

export default Weather;
