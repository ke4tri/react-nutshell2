import React from 'react';
import PropTypes from 'prop-types';
import getWeather2 from '../../../helpers/data/weatherRequests';


class ReadWeather extends React.Component {

  static propTypes = {
    uid: PropTypes.string,
  }

  render() {
    return (
      <div className='Home'>
        <h2>ReadWeather</h2>
      </div>
    );
  }
}

export default ReadWeather;
