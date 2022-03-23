import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from '../Header/Header'

describe('Header', () => {
  it('renders correctly', () => {
    const container = render(<Header siteTitle='Home' />)
    expect(container).toMatchSnapshot()
  })
})


