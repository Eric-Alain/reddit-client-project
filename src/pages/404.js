//React
import * as React from 'react'

//Dank meme
import meme from '/src/images/angry.svg'

//Components
import Layout from '../components/layout'
import Seo from '../components/Seo/Seo'

//3rd party
import { Link } from 'gatsby'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faRedditSquare } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp, faBars, faList, faSearch, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faArrowUp, faBars, faCalendarDays, faList, faMessage, faRedditSquare, faSearch, faTimes, faXmark)

const NotFoundPage = () => (
  <Layout>
    <Seo title='404: Not found' />
    <Col xs='11' sm='12' className='mt-3 mt-sm-auto pt-2 bg-light rounded'>
      <h1>404: Not Found</h1>
      <p>The page you've requested doesn't exist.</p>
      <p>
        Go back to <Link to='/'>Home</Link>
      </p>
      <Row className='justify-content-center'>
        <Col xs='5'>
          <img src={meme} alt='' />
        </Col>
      </Row>
    </Col>    
  </Layout>
)

export default NotFoundPage
