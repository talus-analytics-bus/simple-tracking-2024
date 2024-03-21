import { useStaticQuery, graphql } from 'gatsby'

import { AirtableCMSData } from 'components/library/airtable-cms/'

// Sites will have many of these content hooks, each
// of which corresponds to one table in Airtable.
const useAboutDataSourcesPageData = () => {
  const { cmsContent }: { cmsContent: AirtableCMSData } = useStaticQuery(
    graphql`
      query {
        cmsContent: allAirtable(
          filter: {
            table: { eq: "About CMS" }
            data: { Page: { eq: "Data sources" } }
          }
        ) {
          nodes {
            table
            data {
              Name
              Text
            }
          }
        }
      }
    `
  )

  return cmsContent
}

export default useAboutDataSourcesPageData
