import React from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';


class RegionInfo extends React.Component {
  state = {
    regions: [],
    isLoading: false,
  }

  handleClick = () => {
    const API_URL = 'https://api.rootnet.in/covid19-in/stats/latest';

    this.setState({ isLoading: true });

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ regions: data['data']['regional'], isLoading: false });
      });
  }

  render() {
    const { regions, isLoading } = this.state;
    

    return (
      <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>

        <div className="container mt-5">
          <div className="text-center mb-3">
            <h1 className="display-4">COVID-19 Cases by Region in India</h1>
          </div>

          <div className="text-center mb-3">
            <button className="btn btn-primary" onClick={this.handleClick}>Show Regions</button>
          </div>

          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {regions.length > 0 && (
            <Row>
              {regions.map(region => (
                <Col key={region.loc} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{region.loc}</Card.Title>
                      <hr />
                      <Card.Text>
                        <strong>Confirmed Cases:</strong> {region.totalConfirmed}
                      </Card.Text>
                      <Card.Text>
                        <strong>Confirmed Cases (Indian Nationals):</strong> {region.confirmedCasesIndian}
                      </Card.Text>
                      <Card.Text>
                        <strong>Confirmed Cases (Foreign Nationals):</strong> {region.confirmedCasesForeign}
                      </Card.Text>
                      <Card.Text>
                        <strong>Recovered:</strong> {region.discharged}
                      </Card.Text>
                      <Card.Text>
                        <strong>Deaths:</strong> {region.deaths}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            )}
            </div>
            
          </>
        );
      }
    }
    
    export default RegionInfo;
