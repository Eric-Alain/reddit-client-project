const path = require('path')
const axios = require('axios')
const crypto = require('crypto')

const unique = arr => {
  let seen = {}
  return arr.filter(item => {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime'
      }
    }
  })
}


exports.sourceNodes = async ({ actions }) => {
  
  /***********/
  /*API FETCH*/
  /***********/

  //Fetch our data
  const { data: res } = await axios.get('https://www.reddit.com/r/popular.json?geo_filter=CA&limit=50')

  //Nested fetch with result from previous fetch
  const responses = await Promise.all(
    res.data.children.map(obj => {
      return axios.get(`https://www.reddit.com/${obj.data.subreddit_name_prefixed}/about.json?limit=1`)
    })
  )

  //Filter out successful responses
  const filteredResponses = responses.filter(res => res.status === 200)

  //Map out only desired results to an array of objects
  const results = filteredResponses.map(obj => {
    return {
      name: obj.data.data.display_name,
      namePrefixed: obj.data.data.display_name_prefixed,
      image: obj.data.data.icon_img
    }
  })

  //Filter out duplicates
  let uniqueResults = [...new Map(await results.map(result => [result['namePrefixed'], result])).values()]

  //Sort in desired order
  uniqueResults.sort((a, b) => (a.namePrefixed > b.namePrefixed ? 1 : b.namePrefixed > a.namePrefixed ? -1 : 0))

  /***************/
  /*NODE CREATION*/
  /***************/

  //Destructured variable assignment
  const { createNode } = actions

  //Loop over array of data that we fetched earlier
  uniqueResults.forEach((obj, i) => {
    // Create your node object
    const node = {
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `SubbreditData` // name of the graphQL query --> allSubredditData {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      name: obj.name,
      namePrefixed: obj.namePrefixed,
      imageUrl: obj.image
      // etc...
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(node)).digest(`hex`)
    // add it to userNode
    node.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(node)
  })
}
