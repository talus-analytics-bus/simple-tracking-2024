import { useStaticQuery, graphql } from 'gatsby'

import { AirtableCMSData } from 'components/library/airtable-cms/'

// Sites will have many of these content hooks, each
// of which corresponds to one table in Airtable.
const useTechnicalAppendixLinkData = () => {
  const { cmsContent }: { cmsContent: AirtableCMSData } = useStaticQuery(
    graphql`
      query {
        cmsContent: allAirtable(
          filter: { data: { Name: { eq: "Technical appendix" } } }
        ) {
          nodes {
            data {
              Name
              Text
              Download {
                localFiles {
                  name
                  prettySize
                  publicURL
                }
              }
            }
          }
        }
      }
    `
  )

  return cmsContent
}

export default useTechnicalAppendixLinkData
