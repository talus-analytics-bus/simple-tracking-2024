import { useStaticQuery, graphql } from 'gatsby'

import { AirtableCMSData } from 'components/library/airtable-cms/'

// Sites will have many of these content hooks, each
// of which corresponds to one table in Airtable.
const useStakeholderPageData = (replacements: { [key: string]: string | null | undefined } = {}) => {

  const { cmsContent }: { cmsContent: AirtableCMSData } =
    useStaticQuery(graphql`
      query {
        cmsContent: allAirtable(filter: { table: { eq: "Stakeholder page" } }) {
          nodes {
            data {
              Name
              Text
            }
          }
        }
      }
    `)


  for (const node of cmsContent.nodes) {
    for (const [key, value] of Object.entries(replacements)) {
      node.data.Text = node.data.Text.replaceAll(`${key}`, value ?? '')
    }
  }


  return cmsContent
}

export default useStakeholderPageData
