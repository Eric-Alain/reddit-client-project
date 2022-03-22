//React
import React from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { searchTyped } from '/src/state/actions/search'
import { fetchData, limitDataResults } from '/src/state/actions/data'
import { toggleExpanded, toggleThemeDropdown, setTheme } from '/src/state/actions/toggles'

//3rd party
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ author, siteUrl, title }) => {
  //Redux
  const dispatch = useDispatch()
  const dropdownActive = useSelector(state => state.toggles.dropdownActive)
  const expanded = useSelector(state => state.toggles.expanded)
  const searchString = useSelector(state => state.search.query)  

  //Handlers
  const handleDropdownToggle = () => {
    dispatch(toggleThemeDropdown(!dropdownActive))
  }

  const handleTheme = str => {
    dispatch(setTheme(str))
  }

  const handleToggle = () => {
    dispatch(toggleExpanded(!expanded))
  }

  const handleOnChange = event => {
    dispatch(searchTyped(event.target.value))
  }

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
      dispatch(searchTyped(''))
      dispatch(limitDataResults(4))
    } else return
  }

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
    dispatch(searchTyped(''))
    dispatch(limitDataResults(4))
  }

  return (
    <header>
      <Navbar collapseOnSelect expand='md'>
        <Container className='position-relative'>
          <Row className='vw-100'>
            <Col xs='12' md='6' className='px-md-0'>
              <h2 className='mb-0'>{title}</h2>
            </Col>
            <Col xs='12' md='6' className='px-md-0 pb-md-2 align-self-end'>
              <Row className='justify-content-start justify-content-md-end'>
                <Col xs='auto'>
                  <Dropdown as='div' onToggle={handleDropdownToggle}>
                    <Dropdown.Toggle id='theme-selector'>
                      <small>Themes</small>
                      <FontAwesomeIcon icon={dropdownActive ? ['fas', 'angle-up'] : ['fas', 'angle-down']} size='1x' className='ms-2' />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align={{ md: 'end' }}>
                      <Dropdown.Item as='button' onClick={() => handleTheme('light')}>
                        <FontAwesomeIcon icon={['fas', 'sun']} size='1x' className='me-2' /> Light
                      </Dropdown.Item>
                      <Dropdown.Item as='button' onClick={() => handleTheme('dark')}>
                        <FontAwesomeIcon icon={['fas', 'moon']} size='1x' className='me-2' /> Dark
                      </Dropdown.Item>
                      <Dropdown.Item as='button' onClick={() => handleTheme('unicorn')}>
                        <FontAwesomeIcon icon={['fas', 'wand-magic-sparkles']} size='1x' className='me-2' /> Unicorn
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
            <Col xs='12' sm='6' md='7' className='ps-md-0 align-self-end'>
              <Navbar.Text>
                <small>
                  Original solution by: <a href={siteUrl}>{author}</a>
                </small>
              </Navbar.Text>
            </Col>
            <Col xs='12' sm='6' md='5' className='pe-md-0 searchbar-container'>
              <Navbar.Toggle className='position-absolute top-0 right-0' aria-controls='responsive-navbar-nav' onClick={handleToggle}>
                <FontAwesomeIcon icon={expanded ? ['fas', 'times'] : ['fas', 'bars']} size='lg' />
              </Navbar.Toggle>
              <Navbar.Collapse className='justify-content-end mt-3 mt-md-auto' id='responsive-navbar-nav'>
                <Nav className='w-100'>
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
                      <button className='search-btn' onClick={handleClick}>
                        <FontAwesomeIcon icon={['fas', 'search']} />
                      </button>
                    </InputGroup.Text>
                  </InputGroup>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  author: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Header
