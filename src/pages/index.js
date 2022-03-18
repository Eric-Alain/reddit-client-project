import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo/Seo'
import Sidebar from '../components/Sidebar/Sidebar'
import Thread from '../components/Thread/Thread'

import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faList, faBars, faTimes, faArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faRedditSquare } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faMessage } from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false
library.add(faSearch, faRedditSquare, faList, faCalendarDays, faMessage, faBars, faTimes, faArrowUp, faXmark)

const IndexPage = () => (
  <Layout>
    <Seo title='Home' />
    <Thread />
    <Sidebar />
  </Layout>
)

export default IndexPage
