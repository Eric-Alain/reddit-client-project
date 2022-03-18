import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './Header/Header'
import Scroll from './Scroll/Scroll'
import Footer from './Footer/Footer'
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
      <Container>
        <Row>{children}</Row>
      </Container>
      <Scroll />
      <Footer author={site.siteMetadata?.author || `Eric Alain`} siteUrl={site.siteMetadata?.siteUrl || `https://www.ericalain.ca`} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
