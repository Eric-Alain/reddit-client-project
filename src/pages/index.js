import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"
import Sidebar from "../components/Sidebar/Sidebar"
import Thread from "../components/Thread/Thread"

import { config, library } from "@fortawesome/fontawesome-svg-core"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

config.autoAddCss = false
library.add(faSearch)

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Thread />
    <Sidebar />
  </Layout>
)

export default IndexPage
