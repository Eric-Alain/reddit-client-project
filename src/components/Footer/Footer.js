//React
import * as React from 'react'

//3rd party
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Footer = ({ author, siteUrl }) => (
  <footer>
    <Container className='px-sm-0 rounded'>
      <Row>
        <Col xs='6'>
          <p className='mb-0 py-3 lh-1'>
            Original solution by: <a href={siteUrl}>{author}</a>
          </p>
        </Col>
        <Col xs='6' className='text-end'>
          <p className='mb-0 py-3 lh-1'>
            Challenge project by:{' '}
            <a href='https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-22-portfolio-project-reddit-client/modules/wdcp-22-reddit-client/kanban_projects/reddit-client'>
              Codecademy.com
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
)

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired
}

export default Footer
