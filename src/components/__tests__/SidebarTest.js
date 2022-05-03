//React
import React from 'react'

//Redux
import * as Redux from 'react-redux'
import createStore from '../../state/createStore'

//Gastby
import * as Gatsby from 'gatsby'

//Components
import Sidebar from '../Sidebar/Sidebar'

//Testing
import { sidebarQueryData } from '../../../__mocks__/sidebar-mock'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const intersectObserverContext = (async () => {
  if (!('IntersectionObserver' in window)) await import('intersection-observer')
})()

const store = createStore()

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')

useStaticQuery.mockImplementation(() => {
  return sidebarQueryData()
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Sidebar', () => {
  test('Component has correct heading', () => {
    render(
      <Redux.Provider store={store}>
        <Sidebar />
      </Redux.Provider>
    )

    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'h2' && content === 'Subreddits'
      })
    ).toBeInTheDocument()
  })

  test('Generates 20 "pill" buttons', () => {
    render(
      <Redux.Provider store={store}>
        <Sidebar />
      </Redux.Provider>
    )
    const subredditPills = screen.queryAllByText((content, node) => {
      return node.tagName.toLowerCase() === 'div' && node.classList.contains('subreddit-pill')
    })
    expect(subredditPills.length).toEqual(20)
  })

  test(`All 20 "pills" should:\n\t\u2022 Have text\n\t\u2022 Have a gatsby image component`, () => {
    render(
      <Redux.Provider store={store}>
        <Sidebar />
      </Redux.Provider>
    )

    //Define array of "pills"
    const subredditPills = screen.queryAllByText((content, node) => {
      return node.tagName.toLowerCase() === 'div' && node.classList.contains('subreddit-pill')
    })

    //Run through each "pill"
    subredditPills.forEach(pill => {
      //Define text element
      const pillText = pill.querySelector('div.ps-2.ps-md-auto.pe-0.col-auto').querySelector('small').innerHTML
      //Assert that text is defined
      expect(pillText).toBeDefined()

      //Define text element
      const pillImage = pill.querySelector('div.gatsby-image-wrapper picture img')
      //Assert that image data is defined
      expect(pillImage.getAttribute('data-src')).toBeDefined()
    })
  })

  test(`Clicking any of the 20 "pills" should call click handler`, async () => {
    const subreddits = sidebarQueryData().allImageSharp.edges

    //Filter out duplicates
    let uniqueSubreddits = [...new Map(subreddits.map(result => [result.node.parent.parent['namePrefixed'], result])).values()]

    //Set desired length of array
    uniqueSubreddits.length = 20

    //Sort in desired order
    uniqueSubreddits.sort((a, b) =>
      a.node.parent.parent.name.toLowerCase() > b.node.parent.parent.name.toLowerCase()
        ? 1
        : b.node.parent.parent.name.toLowerCase() > a.node.parent.parent.name.toLowerCase()
        ? -1
        : 0
    )

    const handleClick = jest.fn()

    //Render simplified version of component, add mock click handler to button for testing purposes
    render(
      <Redux.Provider store={store}>
        <Col xs={{ span: 10, order: 1 }} sm={{ span: 5, order: 2 }} md={{ span: 4, order: 2 }} xl={{ span: 3, order: 2 }} id='sidebar' className='sidebar-border bg-2 pb-3'>
          <aside>
            <Row className='mx-1 justify-content-between justify-content-md-start'>
              {uniqueSubreddits.map((subreddit, i) => {
                return (
                  <Col xs='6' sm='12' key={i} className='mb-3 px-1 subreddit-pill'>
                    <button className='w-100' onClick={handleClick}></button>
                  </Col>
                )
              })}
            </Row>
          </aside>
        </Col>
      </Redux.Provider>
    )

    //Define array of "pills"
    const subredditPills = screen.queryAllByText((content, node) => {
      return node.tagName.toLowerCase() === 'div' && node.classList.contains('subreddit-pill')
    })

    //Run through each "pill"
    subredditPills.forEach((pill, i) => {
      //Define button element
      const pillButton = pill.querySelector('button.w-100')
      fireEvent.click(pillButton)
      expect(handleClick).toHaveBeenCalledTimes(i + 1)
    })
  })
})
