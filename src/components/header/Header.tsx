import React, { FunctionComponent } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Filter from '../filter/Filter';
import './Header.scss';


const Header: FunctionComponent = (props: any) => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="pokedex-header">
      <Container>
        <Row>
          <Col xs={12} md={9}>
            <Filter disabled={props.location.pathname !== '/'} />
          </Col>
          <Col xs={12} md={3}>
            <Navbar.Text>Filter by type</Navbar.Text>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default withRouter((props) => <Header {...props} />);
