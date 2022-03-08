import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

const Layout = ({ children }) => {

  const data = useStaticQuery(graphql`
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
        title={data.site.siteMetadata?.title || `Reddit Client Project`}
        author={data.site.siteMetadata?.author || `Eric Alain`}
        siteUrl={data.site.siteMetadata?.siteUrl || `https://www.ericalain.ca`}
      />
      <Container>
        <Row>{children}</Row>
      </Container>

      <Footer
        author={data.site.siteMetadata?.author || `Eric Alain`}
        siteUrl={data.site.siteMetadata?.siteUrl || `https://www.ericalain.ca`}
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
