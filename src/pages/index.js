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
import { faGithub, faRedditSquare } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faAngleDown, faAngleUp, faArrowUp, faBars, faList, faMoon, faSearch, faSun, faTimes, faWandMagicSparkles, faXmark } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faAngleDown, faAngleUp, faArrowUp, faBars, faCalendarDays, faGithub, faList, faMessage, faMoon, faRedditSquare, faSearch, faSun, faTimes, faWandMagicSparkles, faXmark)

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
