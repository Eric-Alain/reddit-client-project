//React
import * as React from 'react'
//Components
import Layout from '../components/layout'
import Scroll from '../components/Scroll/Scroll'
import Seo from '../components/Seo/Seo'
import Sidebar from '../components/Sidebar/Sidebar'
import Thread from '../components/Thread/Thread'

//3rd party
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faRedditSquare } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp, faBars, faList, faSearch, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faArrowUp, faBars, faCalendarDays, faList, faMessage, faRedditSquare, faSearch, faTimes, faXmark)

const IndexPage = () => (
  <>
    <Layout>
      <Seo title='Home' />
      <Thread />
      <Sidebar />
    </Layout>
    <Scroll />
  </>
)

export default IndexPage
