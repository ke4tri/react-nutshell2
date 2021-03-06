import React from 'react';
import PropTypes from 'prop-types';
import weatherShape from '../../../helpers/propz/weatherShape';

class WeatherLocations extends React.Component {
  state = {
    isCurrent: false,
  }

  static propTypes = {
    weatherArrayTwo: PropTypes.arrayOf(weatherShape),
    newUid: PropTypes.string,
    trueFalse: PropTypes.func,
  }


  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleWeather, weather } = this.props;
    deleteSingleWeather(weather.id);
  }

  updatingCurrent = (e) => {
    e.preventDefault();
    const weatherId = this.props.weather;
    this.props.trueFalse(weatherId);
  }

  render() {
    const { weather } = this.props;

    return (
      <div className="locationBlock">
        <div className="citySt card mr-5 ml-5 mb-2 p-3">{weather.city}, {weather.state}
        <button className="btn btn-danger" onClick={this.deleteEvent}>X</button>
        <button className="btn btn-secondary" onClick={this.updatingCurrent}>Current</button>
        </div>
      </div>
    );
  }
}

export default WeatherLocations;
