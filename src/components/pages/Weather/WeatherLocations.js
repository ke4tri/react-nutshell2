import React from 'react';
import PropTypes from 'prop-types';
import weatherShape from '../../../helpers/propz/weatherShape';

class WeatherLocations extends React.Component {
  // state = {
  //   currentWx: true,
  // }

  static propTypes = {
    weather: weatherShape.weatherShape,
    weatherArray2: PropTypes.arrayOf(PropTypes.PropTypes.func),
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleWeather, weather } = this.props;
    deleteSingleWeather(weather.id);
  }


  // current = (e) => {
  //   console.log('this', e);
  //   console.log(this.props.weather);
  //   console.log(this.state.currentWx);
  // }

  render() {
    const { weather } = this.props;

    return (
      <div className="locationBlock">
        <div className="citySt card mr-5 ml-5 mb-2 p-3">{weather.city}, {weather.state}
        <button className="btn btn-danger" onClick={this.deleteEvent}>X</button>
        {/* <button className="btn btn-secondary" onClick={this.current}>Current</button> */}
        </div>
      </div>
    );
  }
}

export default WeatherLocations;
