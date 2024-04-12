import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://example.talusanalytics.com/',
    title: 'Talus Analytics',
    cookieConsent: {
      cookieMessage:
        'Talus sites use cookies to ensure you get the best experience possible.',
      buttonColor: 'rgb(15, 35, 75)',
      backgroundColor: '#edf2f2',
    },
  },
  graphqlTypegen: true,
  plugins: [
    {
      // site will not build without a valid
      // airtable api key; delete this plugin
      // if airtable isn't going to be used.
      resolve: `gatsby-source-airtable`,
      options: {
        // eslint-disable-next-line
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `Landing page`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `Stakeholder page`,
            tableView: `CMS`,
            // mapping: { Image: `fileNode` },
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `NAPHS`,
            tableView: `CMS`,
            mapping: { PDF: `fileNode` },
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `PHEIC`,
            tableView: `CMS`,
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `PHEIC CMS`,
            tableView: `CMS`,
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `PVS Pathway`,
            tableView: `CMS`,
            mapping: { PDF: `fileNode` },
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `Data sources`,
            tableView: `CMS`,
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `About CMS`,
            tableView: `CMS`,
            mapping: { Download: `fileNode` },
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `Site metadata`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appD0BHXtft0HSTNM`,
            tableName: `Icons`,
            tableView: `CMS`,
            mapping: { SVG: `fileNode` },
          },
          {
            baseId: `appVIQlFfFn7aqzMh`,
            tableName: `Projects`,
            tableView: `CMS`,
            queryName: `Citations`,
            separateNodeType: true,
            // mapping: { Image: `fileNode` },
            // tableLinks: [`Logo`, `Icon`],
          },
          {
            baseId: `appVIQlFfFn7aqzMh`,
            tableName: `Citations`,
            tableView: `CMS`,
            queryName: `Citations`,
            separateNodeType: true,
            tableLinks: [`Publication_Cited`, `Project`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./data/csv/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./data/risk_index/`,
      },
    },
    `gatsby-transformer-csv`,
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'AirtableDatabase',
    //     imagePath: 'data.PDF[].thumbnails.large.url',
    //     // ** ALL OPTIONAL BELOW HERE: **
    //     name: 'documentThumbnail',
    //     skipUndefinedUrls: true,
    //     prepareUrl: (url: string) => {
    //       if (!url || url === 'N/A') return undefined
    //       return url
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'StakeholdersCsv',
        imagePath: 'iso2',
        // ** ALL OPTIONAL BELOW HERE: **
        name: 'flag',
        skipUndefinedUrls: true,
        prepareUrl: (url: string) => {
          if (!url || url === 'N/A' || url === 'AP') return undefined
          return `https://flags.talusanalytics.com/300px/${url.toLowerCase()}.png`
        },
      },
    },
    {
      // filling in the gtag here
      // will set up both the gatsby
      // google analytics plugin and
      // the cookieconsent opt-in system.
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `G-XXXXXXXXXX`,
        anonymize: true,
        head: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `tracking.ghscosting.org`,
      },
    },
    'talus-gatsby-transformer-svg',
    'gatsby-plugin-styled-components',
    'talus-gatsby-transformer-svg',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-mdx',
  ],
}

export default config
