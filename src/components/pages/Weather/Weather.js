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

  formSubmitEvent = (newWeather) => {
    getWeather2.postRequest(newWeather).then(() => {
      getWeather2.getWeather(this.props.uid)
        .then((weather) => {
          this.setState({ weather });
        });
    })
      .catch(err => console.error('error with weather post', err));
  }

  render() {
    const weatherItemComponents = this.state.weatherArray2.map((weatherItem, index) => <div id={weatherItem.id} className="fas fa-city fa-2x city2 m-2 container" key={index}>
        {weatherItem.city},
        {weatherItem.state}<button className="btn btn-danger" onClick={this.currentWxState}>Current Location</button>
      </div>);
    return (
      <div className='Home'>
        <h2>Weather </h2>
        <div className="container d-flex flex-row">
        <div className="wxForm"><WeatherForm newUid={this.state.newUid} onSubmit={this.formSubmitEvent}/></div>
         <div className="city1 container d-flex flex-column"> {weatherItemComponents}</div>
         <div className="currentWx"><CurrentWeather onClick /></div>
        </div>
      </div>
    );
  }
}

export default Weather;
