module.exports = {
  siteMetadata: {
    title: `Reddit Client Project`,
    description: `An attempt at the Reddit Client Project by Codecademy using Gastby, React and Redux.`,
    author: `Eric Alain`,
    keywords: `Eric, Alain, Reddit Client Project, Codecademy, APIs`,
    locale: `en_CA`,
    siteUrl: `https://www.ericalain.ca`,
    lang: 'en'
  },
  flags: {
    PARALLEL_SOURCING: true
  },
  plugins: [
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/state/createStore',
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
          ignoreFunction: true
        },
        cleanupOnClient: true,
        windowKey: '__PRELOADED_STATE__'
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },    
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        theme_color: `#223843`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/reddit-logo.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        debug: false,
        precachePages: [`/`]
      }
    }
  ]
}
