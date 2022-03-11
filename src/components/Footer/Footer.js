import * as React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Footer = ({ author, siteUrl }) => (
  <footer>
    <Container className='px-0'>
      <Row>
        <Col xs='6'>
          <p>
            Original solution by: <a href={siteUrl}>{author}</a>
          </p>
        </Col>
        <Col xs='6' className='text-end'>
          <p>
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
  author: PropTypes.string,
  siteUrl: PropTypes.string
}

export default Footer
