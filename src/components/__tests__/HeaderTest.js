//React
import React from 'react'

//Redux
import * as Redux from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Header from '../Header/Header'
import Thread from '../Thread/Thread'

//Testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

//3rd party
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import registerIcons from '../../icons/icons'

const intersectObserverContext = (async () => {
  if (!('IntersectionObserver' in window)) await import('intersection-observer')
})()

const store = createStore()
registerIcons()

//Work around for GSAP bug when testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

const mockAuthor = 'Eric Alain'
const mockSiteUrl = 'https://www.ericalain.ca'
const mockTitle = 'Reddit Client Project'

describe('Header', () => {
  /******/
  /*TEXT*/
  /******/
  test("Displays the correct title, subtitle and link to author's site", () => {
    render(
      <Redux.Provider store={store}>
        <Header author={mockAuthor} siteUrl={mockSiteUrl} title={mockTitle} />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve
    return waitFor(() => {
      //Find <h2> element, test if it has appropriate value
      expect(
        screen.getByText((content, node) => {
          return node.tagName.toLowerCase() === 'h2' && content === `Reddit Client Project`
        })
      ).toBeInTheDocument()

      //Find <span> element, test if it has appropriate value
      expect(
        screen.getByText((content, node) => {
          return node.tagName.toLowerCase() === 'span' && node.textContent === `Original solution by: Eric Alain`
        })
      ).toBeInTheDocument()

      //Find <a> element that links to Eric's site, test if it has appropriate href value
      expect(screen.getByText('Eric Alain').href).toEqual(`https://www.ericalain.ca/`)
    })
  })

  /*******/
  /*ICONS*/
  /*******/
  test('Displays correct icons within the appropriate elements', async () => {
    render(
      <Redux.Provider store={store}>
        <Header author={mockAuthor} siteUrl={mockSiteUrl} title={mockTitle} />
      </Redux.Provider>
    )

    //Find the dropdown toggle button for the theme selector
    const dropdown = screen.getByText((content, node) => {
      return node.tagName.toLowerCase() === 'button' && node.getAttribute('id') === `theme-selector`
    })

    //Open it
    fireEvent.click(dropdown)

    //Find a <svg> element, check if it loads the GITHUB icon from FontAwesome
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' && node.getAttribute('data-prefix') === `fab` && node.getAttribute('data-icon') === `github` && node.classList.contains('fa-github')
        )
      })
    ).toBeInTheDocument()

    //Find a <svg> element, check if it loads the MAGNIFYING GLASS icon from FontAwesome
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' &&
          node.getAttribute('data-prefix') === `fas` &&
          node.getAttribute('data-icon') === `magnifying-glass` &&
          node.classList.contains('fa-magnifying-glass')
        )
      })
    ).toBeInTheDocument()

    //Find a <svg> element, check if it loads the SUN icon from FontAwesome
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'svg' && node.getAttribute('data-prefix') === `fas` && node.getAttribute('data-icon') === `sun` && node.classList.contains('fa-sun')
      })
    ).toBeInTheDocument()

    //Find a <svg> element, check if it loads the MOON icon from FontAwesome
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'svg' && node.getAttribute('data-prefix') === `fas` && node.getAttribute('data-icon') === `moon` && node.classList.contains('fa-moon')
      })
    ).toBeInTheDocument()

    //Find a <svg> element, check if it loads the WAND MAGIC SPARKLES icon from FontAwesome
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' &&
          node.getAttribute('data-prefix') === `fas` &&
          node.getAttribute('data-icon') === `wand-magic-sparkles` &&
          node.classList.contains('fa-wand-magic-sparkles')
        )
      })
    ).toBeInTheDocument()
  })

  /*******/
  /*STATE*/
  /*******/
  test('State changes when user types in the searchbar', () => {
    render(
      <Redux.Provider store={store}>
        <Header author={mockAuthor} siteUrl={mockSiteUrl} title={mockTitle} />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve
    return waitFor(() => {
      //Input field
      const searchBar = screen.getByPlaceholderText('Search...')

      //Assert that search query state should be empty when we begin
      expect(store.getState().search.query).toEqual('')

      //Enter new value into search bar
      fireEvent.change(searchBar, { target: { value: 'Hello world!' } })

      //Assert that search query state should match what we typed in it
      expect(store.getState().search.query).toEqual('Hello world!')
    })
  })

  test('State changes to dummy data when user types in searchbar, clicks search button', () => {
    //Create mock dispatch functions for testing
    const getData = obj =>
      store.dispatch({
        type: 'FETCH_DATA',
        payload: obj
      })

    const enterString = str =>
      store.dispatch({
        type: 'SEARCH_TYPED',
        payload: str
      })

    const limitResults = num =>
      store.dispatch({
        type: 'LIMIT_DATA_RESULTS',
        payload: num
      })

    //Create event handlers for component
    const handleOnChange = event => {
      enterString(event.target.value)
    }

    const handleClick = (obj, num) => {
      getData(obj)
      enterString('')
      limitResults(num)
    }

    //Mock fake data from file that we can pretend to fetch
    const mockData = jest.createMockFromModule('../../../__mocks__/redux-mock-data.js').state

    //Render a simplified version of header for testing redux calls
    render(
      <Redux.Provider store={store}>
        <header>
          <InputGroup>
            <FormControl value={store.getState().search.query} onChange={handleOnChange} placeholder='Search...' aria-label='Search' aria-describedby='searchBar' />
            <InputGroup.Text id='searchBar'>
              <button className='search-btn' onClick={() => handleClick(mockData.data.reddit, 10)}>
                <FontAwesomeIcon icon={['fas', 'search']} />
              </button>
            </InputGroup.Text>
          </InputGroup>
        </header>
      </Redux.Provider>
    )

    //React testing library search variables
    //Input field
    const searchBar = screen.getByPlaceholderText('Search...')

    //Search button
    const searchButton = screen.getByText((content, node) => {
      return node.tagName.toLowerCase() === 'button' && node.classList.contains('search-btn')
    })

    //Fire events in fake DOM
    //Enter new value into search bar
    fireEvent.change(searchBar, { target: { value: 'Hello world!' } })

    //Assert that search query state should match what we typed in it
    expect(store.getState().search.query).toEqual('Hello world!')

    //Click search button
    fireEvent(
      searchButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    //Assert that clicking the search button will fetch data and add it to redux store
    expect(store.getState().data.reddit).toEqual(mockData.data.reddit)

    //Assert that search query state should revert to empty when we click the search button
    expect(store.getState().search.query).toEqual('')

    //Assert that clicking the search button sets the results limit to a designated number
    expect(store.getState().data.limit).toEqual(10)

    //Reset some redux store values
    getData({})
    enterString('')
    limitResults(5)
  })

  test('State changes to dummy data when user types in searchbar, hit "Enter" key', () => {
    //Create mock dispatch functions for testing
    const getData = obj =>
      store.dispatch({
        type: 'FETCH_DATA',
        payload: obj
      })

    const enterString = str =>
      store.dispatch({
        type: 'SEARCH_TYPED',
        payload: str
      })

    const limitResults = num =>
      store.dispatch({
        type: 'LIMIT_DATA_RESULTS',
        payload: num
      })

    //Create event handlers for component
    const handleOnChange = event => {
      enterString(event.target.value)
    }

    const handleKeyDown = (obj, num) => {
      getData(obj)
      enterString('')
      limitResults(num)
    }

    //Mock fake data from file that we can pretend to fetch
    const mockData = jest.createMockFromModule('../../../__mocks__/redux-mock-data.js').state

    //Render a simplified version of header for testing redux calls
    render(
      <Redux.Provider store={store}>
        <header>
          <InputGroup>
            <FormControl
              value={store.getState().search.query}
              onChange={handleOnChange}
              onKeyDown={() => handleKeyDown(mockData.data.reddit, 10)}
              placeholder='Search...'
              aria-label='Search'
              aria-describedby='searchBar'
            />
          </InputGroup>
        </header>
      </Redux.Provider>
    )

    //React testing library search variables
    //Input field
    const searchBar = screen.getByPlaceholderText('Search...')

    //Fire events in fake DOM
    //Enter new value into search bar
    fireEvent.change(searchBar, { target: { value: 'Hello world!' } })

    //Assert that search query state should match what we typed in it
    expect(store.getState().search.query).toEqual('Hello world!')

    //Hits "Enter" key
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter', charCode: 13 })

    //Assert that clicking the search button will fetch data and add it to redux store
    expect(store.getState().data.reddit).toEqual(mockData.data.reddit)

    //Assert that search query state should revert to empty when we click the search button
    expect(store.getState().search.query).toEqual('')

    //Assert that clicking the search button sets the results limit to a designated number
    expect(store.getState().data.limit).toEqual(10)

    //Reset some redux store values
    getData({})
    enterString('')
    limitResults(5)
  })

  test('State changes when user picks theme from theme selector', () => {
    //Create mock dispatch function for testing
    const setTheme = str => {
      store.dispatch({
        type: 'SET_THEME',
        payload: str
      })
    }

    const toggleThemeDropdown = bool =>
      store.dispatch({
        type: 'TOGGLE_THEME_DROPDOWN',
        payload: bool
      })

    //Create event handler for component
    const handleTheme = str => {
      setTheme(str)
    }

    const handleDropdownToggle = () => {
      toggleThemeDropdown(!store.getState().toggles.dropdownActive)
    }

    //Render a simplified version of header for testing redux calls
    render(
      <header>
        <Dropdown as='div'>
          <Dropdown.Toggle id='theme-selector' onToggle={handleDropdownToggle}>
            <small>Themes</small>
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
      </header>
    )

    //React testing library search variables
    //Dropdown toggle button theme selector
    const dropdown = screen.getByText((content, node) => {
      return node.tagName.toLowerCase() === 'button' && node.getAttribute('id') === `theme-selector`
    })

    //Open dropdown, find and click the light theme option, assert that clicking this option sets the theme state to 'light'
    fireEvent.click(dropdown)
    const sun = document.querySelectorAll('.dropdown-item')[0]
    fireEvent.click(sun)
    expect(store.getState().toggles.theme).toEqual('light')

    //Open dropdown, find and click the dark theme option, assert that clicking this option sets the theme state to 'dark'
    fireEvent.click(dropdown)
    const moon = document.querySelectorAll('.dropdown-item')[1]
    fireEvent.click(moon)
    expect(store.getState().toggles.theme).toEqual('dark')

    //Open dropdown, find and click the unicorn theme option, assert that clicking this option sets the theme state to 'unicorn'
    fireEvent.click(dropdown)
    const wandMagicSparkles = document.querySelectorAll('.dropdown-item')[2]
    fireEvent.click(wandMagicSparkles)
    expect(store.getState().toggles.theme).toEqual('unicorn')

    //Reset redux store value
    setTheme('light')
  })
})
