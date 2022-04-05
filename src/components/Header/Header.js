//React
import React from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { searchTyped } from '../../state/actions/search'
import { fetchData, limitDataResults } from '../../state/actions/data'
import { toggleExpanded, toggleThemeDropdown, setTheme, isLoading } from '../../state/actions/toggles'

//Utils
import { threadFetch } from '../../utils/fetches'

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
    dispatch(toggleExpanded(false))
    dispatch(setTheme(str))
  }

  const handleToggle = () => {
    dispatch(toggleExpanded(!expanded))
  }

  const handleOnChange = event => {
    dispatch(searchTyped(event.target.value))
  }

  const handleFetch = () => {
    dispatch(isLoading(true))
    threadFetch(searchString).then(res => {
      dispatch(fetchData(res))
      dispatch(searchTyped(''))
      dispatch(limitDataResults(4))
      //Search result is too quick, add timeout to reverting loading component, so user knows the search is working
      setTimeout(() => dispatch(isLoading(false)), 500)
    })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      if (searchString === '' || searchString === undefined || searchString === null) {
        alert('Please enter a query.')
        return
      }
      handleFetch()
    } else return
  }

  const handleClick = () => {
    if (searchString === '' || searchString === undefined || searchString === null) {
      alert('Please enter a query.')
      return
    }
    handleFetch()
  }

  return (
    <header>
      <Navbar collapseOnSelect expand='md'>
        <Container className='position-relative'>
          <Row className='vw-100'>
            <Col xs='12' md='8' lg='9' xl='10' className='px-md-0'>
              <h2 className='mb-0'>{title}</h2>
            </Col>
            <Col xs='12' md='4' lg='3' xl='2' className='px-md-0 pb-md-2 align-self-end'>
              <Row className='justify-content-start justify-content-md-end align-items-end'>
                <Col xs={{ span: '6', order: 2 }} md={{ span: 'auto', order: 1 }} className='px-md-0'>
                  <a href='https://github.com/Eric-Alain/reddit-client-project'>
                    <FontAwesomeIcon icon={['fab', 'github']} size='2x' className='github-icon mx-2' />
                  </a>
                </Col>
                <Col xs={{ span: 'auto', order: 1 }} md={{ span: 'auto', order: 2 }} className='pe-0 px-md-3'>
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
              <Navbar.Collapse className='justify-content-end mt-md-auto' id='responsive-navbar-nav'>
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
