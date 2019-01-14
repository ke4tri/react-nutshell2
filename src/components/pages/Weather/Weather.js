// import React from 'react';
import React from 'react';
import firebase from 'firebase/app';
import './Weather.scss';
import connection from '../../../helpers/data/connection';
// import PropTypes from 'prop-types';
import ReadWeather from './ReadWeather';
import getWeather2 from '../../../helpers/data/weatherRequests';
import createUser2 from '../../../helpers/data/userRequests';

class Weather extends React.Component {
  state = {
    uid: '',
    weatherArray2: [],
  }

  getWx = (uid2) => {
    getWeather2.getWeather(uid2)
      .then((weatherArray2) => {
        this.setState({ weatherArray2 });
        console.log(weatherArray2);
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
        console.log(this.state.uid);
        this.getWx(uid);
      } else {
        this.setState({
          uid: '',
        });
      }
    });
  }

  render() {
    return (
      <div className='Home'>
        <h2>Weather Component</h2>
        <ReadWeather />
        {/* <h2>{this.getSomeWx}</h2> */}
      </div>
    );
  }
}

export default Weather;
