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
    `gatsby-plugin-preact`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `eric-alain-reddit-client-project`,
        short_name: `ea-rcp`,
        start_url: `/`,
        theme_color: `#223843`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/reddit-logo.svg` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        debug: false,
        precachePages: [`/`]
      }
    },
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
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,

        purgeCSSOptions: {
          purgeOnly: ['node_modules/bootstrap/', 'node_modules/font-awesome/'],
          safelist: {
            greedy: [
              /___gatsby/,
              /light/,
              /dark/,
              /unicorn/,
              /align-items-center/,
              /align-items-end/,
              /align-items-start/,
              /align-self-end/,
              /bg-2/,
              /btn/,
              /btn-primary/,
              /col-10/,
              /col-12/,
              /col-6/,
              /col-auto/,
              /col-lg-3/,
              /col-lg-7/,
              /col-lg-9/,
              /col-lg-auto/,
              /col-md-4/,
              /col-md-5/,
              /col-md-7/,
              /col-md-8/,
              /col-md-auto/,
              /col-sm-12/,
              /col-sm-5/,
              /col-sm-6/,
              /col-sm-7/,
              /col-xl-10/,
              /col-xl-2/,
              /col-xl-3/,
              /col-xl-8/,
              /col-xl-9/,
              /collapse/,
              /collapsed/,
              /container/,
              /dropdown/,
              /dropdown-toggle/,
              /form-control/,
              /hide/,
              /img-container/,
              /img-undefined/,
              /img-undefined-text/,
              /input-group/,
              /input-group-text/,
              /justify-content-between/,
              /justify-content-center/,
              /justify-content-end/,
              /justify-content-lg-between/,
              /justify-content-lg-end/,
              /justify-content-md-end/,
              /justify-content-md-start/,
              /justify-content-start/,
              /lh-0/,
              /lh-1/,
              /mb-0/,
              /mb-2/,
              /mb-3/,
              /^modal/,
              /mt-0/,
              /mt-3/,
              /mt-md-auto/,
              /mx-1/,
              /my-0/,
              /my-2/,
              /navbar/,
              /navbar-collapse/,
              /navbar-expand-md/,
              /navbar-light/,
              /navbar-nav/,
              /navbar-text/,
              /navbar-toggler/,
              /order-1/,
              /order-2/,
              /order-md-1/,
              /order-md-2/,
              /order-sm-1/,
              /order-sm-2/,
              /order-xl-1/,
              /order-xl-2/,
              /p-1/,
              /p-2/,
              /pb-3/,
              /pb-md-2/,
              /pe-0/,
              /pe-2/,
              /pe-md-0/,
              /position-absolute/,
              /position-relative/,
              /ps-0/,
              /ps-2/,
              /ps-md-0/,
              /ps-md-auto/,
              /px-0/,
              /px-md-0/,
              /px-md-3/,
              /px-sm-0/,
              /py-1/,
              /py-3/,
              /rounded/,
              /row/,
              /text-center/,
              /text-end/,
              /vw-100/,
              /w-100/
            ]
          }
        }
      }
    },
    `gatsby-plugin-netlify`
  ]
}
