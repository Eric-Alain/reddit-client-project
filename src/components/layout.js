//React
import React from 'react'

//Components
import Header from './Header/Header'
import Footer from './Footer/Footer'

//3rd party
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Layout = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
          siteUrl
        }
      }
    }
  `)

  return (
    <>
      <Header
        title={site.siteMetadata?.title || `Reddit Client Project`}
        author={site.siteMetadata?.author || `Eric Alain`}
        siteUrl={site.siteMetadata?.siteUrl || `https://www.ericalain.ca`}
      />
      <main>
        <Container>
          <Row className='justify-content-center'>{children}</Row>
        </Container>
      </main>
      <Footer author={site.siteMetadata?.author || `Eric Alain`} siteUrl={site.siteMetadata?.siteUrl || `https://www.ericalain.ca`} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
