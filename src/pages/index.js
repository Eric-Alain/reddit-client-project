//React
import * as React from 'react'
//Components
import Layout from '../components/layout'
import Scroll from '../components/Scroll/Scroll'
import Seo from '../components/Seo/Seo'
import Sidebar from '../components/Sidebar/Sidebar'
import Thread from '../components/Thread/Thread'
import registerIcons from '../icons/icons'

registerIcons();

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
