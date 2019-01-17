import React from 'react';
import PropTypes from 'prop-types';
import weatherShape from '../../../helpers/propz/weatherShape';


class CurrentWeather extends React.Component {
  static propTypes = {
    weather: PropTypes.func,
    weatherArrayTwo: PropTypes.arrayOf(weatherShape),
    newUid: PropTypes.string,
  }


  render() {
    return (
      <div className="locationBlock">
      <div>Current conditions at your location</div>
      <img src="https://img.icons8.com/metro/1600/storm.png" alt="storm" height="200" width="200" />
    </div>
    );
  }
}

export default CurrentWeather;
