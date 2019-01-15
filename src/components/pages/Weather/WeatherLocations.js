import React from 'react';
// import PropTypes from 'prop-types';
import weatherShape from '../../../helpers/propz/weatherShape';
// import authRequests from '../../../helpers/data/authRequests';

class WeatherLocations extends React.Component {
  static propTypes = {
    weather: weatherShape.weatherShape,
    // deleteSingleWeather: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleWeather, weather } = this.props;
    deleteSingleWeather(weather.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEdit, weather } = this.props;
    passListingToEdit(weather.id);
  }

  render() {
    const { weather } = this.props;
    // const uid = authRequests.getCurrentUid();

    return (
      <div className="locationBlock">
        <div className="citySt card mr-5 ml-5 mb-2 p-3">{weather.city}, {weather.state}
        <button className="btn btn-danger" onClick={this.deleteEvent}>X</button>
        <button className="btn btn-secondary">Current</button>
        </div>
      </div>
    );
  }
}

export default WeatherLocations;
