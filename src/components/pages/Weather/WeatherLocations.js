import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import weatherShape from '../../../helpers/propz/weatherShape';
import authRequests from '../../../helpers/data/authRequests';

class WeatherLocations extends React.Component {
  static propTypes = {
    weather: weatherShape.weatherShape,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleListing, listing } = this.props;
    deleteSingleListing(listing.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEdit, listing } = this.props;
    passListingToEdit(listing.id);
  }

  render() {
    const { weather } = this.props;
    const uid = authRequests.getCurrentUid();

    return (
      <div className="locationBlock">
        <div className="citySt card mr-5 ml-5 mb-2 p-3">{weather.city}, {weather.state}
        <button className="btn btn-danger">X</button>
        <button className="btn btn-secondary">Current</button>
        </div>
      </div>
      // <Container>
      //   <Row>
      //     <Col sm="12" md={{ size: 6, offset: 3 }}> {weather.city}</Col>
      //     <Col sm="12" md={{ size: 6, offset: 3 }}> {weather.state}</Col>
      //   </Row>
      // </Container>
    );
  }
}

export default WeatherLocations;
