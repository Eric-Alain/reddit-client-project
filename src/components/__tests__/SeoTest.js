import React from 'react'
import { render } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'

import Helmet from 'react-helmet'
import SEO from '../Seo/Seo'

import { Provider } from 'react-redux'
import createStore from '../../state/createStore'
import registerIcons from '../../icons/icons'

const store = createStore()
registerIcons()

describe('SEO component', () => {
  beforeAll(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          title: `Reddit Client Project`,
          description: `An attempt at the Reddit Client Project by Codecademy using Gastby, React and Redux.`         
        }
      }
    })
  })

  it('renders props correctly', () => {
    const mockTitle = 'Home | Reddit Client Project'
    const mockDescription = 'An attempt at the Reddit Client Project by Codecademy using Gastby, React and Redux.'
    render(
      <Provider store={store}>
        <SEO title='Home' />
      </Provider>
    )
    const { title, metaTags } = Helmet.peek()
    expect(title).toBe(mockTitle)
    expect(metaTags[0].content).toBe(mockDescription)
    expect(metaTags.length).toBe(8)
  })
})
