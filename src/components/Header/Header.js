//React, Redux
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { searchTyped } from '/src/state/actions/search'
import { fetchData, limitDataResults } from '/src/state/actions/data'
import { toggleExpanded } from '/src/state/actions/toggles'

//Bootstrap
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ author, siteUrl, title }) => {
  //Redux vars
  const dispatch = useDispatch()
  const searchString = useSelector(state => state.search.query)
  const expanded = useSelector(state => state.toggles.expanded)

  const handleToggle = () => {
    console.log(expanded)
    dispatch(toggleExpanded(!expanded))
  }

  //Handle search bar input change
  const handleOnChange = event => {
    dispatch(searchTyped(event.target.value))
  }

  //Handle when user hits "Enter" key in search bar
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      if (searchString === '' || searchString === undefined || searchString === null) {
        alert('Please enter a query.')
        return
      }
      fetch(encodeURI(`https://www.reddit.com/search.json?q=${searchString}`))
        .then(response => response.json())
        .then(data => {
          dispatch(fetchData(data))
        })
      dispatch(searchTyped(""))
      dispatch(limitDataResults(4))
    } else return
  }

  //Handle when user clicks search button beside search bar
  const handleClick = () => {
    if (searchString === '' || searchString === undefined || searchString === null) {
      alert('Please enter a query.')
      return
    }
    fetch(encodeURI(`https://www.reddit.com/search.json?q=${searchString}`))
      .then(response => response.json())
      .then(data => {
        dispatch(fetchData(data))
      })
    dispatch(searchTyped(""))
    dispatch(limitDataResults(4))
  }

  return (
    <header>
      <Navbar collapseOnSelect expand='md'>
        <Container className='d-flex align-items-end px-sm-0 position-relative'>
          <Row>
            <Col xs='12'>
              <h2>{title}</h2>
            </Col>
            <Col xs='12'>
              <Navbar.Text>
                <small>
                  By: <a href={siteUrl}>{author}</a>
                </small>
              </Navbar.Text>
            </Col>
          </Row>
          <Navbar.Toggle className="position-absolute top-0 right-0" aria-controls='responsive-navbar-nav' onClick={handleToggle}>
            <FontAwesomeIcon icon={expanded ? ['fas', 'times'] : ['fas', 'bars']} size='lg' />
          </Navbar.Toggle>
          <Navbar.Collapse className='justify-content-end' id='responsive-navbar-nav'>
            <Nav className='w-50'>
              <InputGroup>
                <FormControl
                  value={searchString}
                  onChange={handleOnChange}
                  onKeyDown={handleKeyDown}
                  placeholder='Search...'
                  aria-label='Search'
                  aria-describedby='searchBar'
                  className='lh-0'
                />
                <InputGroup.Text id='searchBar'>
                  <Button className='search-btn' onClick={handleClick}>
                    <FontAwesomeIcon icon={['fas', 'search']} />
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  author: PropTypes.string,
  siteUrl: PropTypes.string,
  title: PropTypes.string
}

export default Header
