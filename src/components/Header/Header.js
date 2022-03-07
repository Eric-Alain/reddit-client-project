import * as React from "react"
import PropTypes from "prop-types"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Row from "react-bootstrap/Row"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = ({ author, siteUrl, title }) => (
  <header>
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container className="d-flex align-items-end px-0">
        <Row>
          <Col xs="12">
            <Navbar.Brand href="#top">{title}</Navbar.Brand>
          </Col>
          <Col xs="12">
            <Navbar.Text>
              <small>
                By: <a href={siteUrl}>{author}</a>
              </small>
            </Navbar.Text>
          </Col>
        </Row>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="w-50">
            <InputGroup>
              <FormControl
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="searchBar"
              />
              <InputGroup.Text id="searchBar">
                <FontAwesomeIcon icon={["fas", "search"]} />
              </InputGroup.Text>
            </InputGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
)

Header.propTypes = {
  author: PropTypes.string,
  siteUrl: PropTypes.string,
  title: PropTypes.string,
}

export default Header
