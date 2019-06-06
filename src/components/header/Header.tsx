import React, { FunctionComponent } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';

import Filter from '../filter/Filter';
import './Header.scss';


const Header: FunctionComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="pokedex-header">
      <Container>
        <Row>
          <Col xs={12} md={9}>
            <Filter />
          </Col>
          <Col xs={12} md={3}>
            <Navbar.Text>Filter by type</Navbar.Text>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
