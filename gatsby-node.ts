import { GatsbyNode } from 'gatsby'
import * as path from 'path'

import simplifyForUrl from './src/utilities/simplifyForUrl'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const stakeholderPageTemplate = path.resolve(
    './src/templates/stakeholder.tsx'
  )

  const stakeholdersQuery = await graphql<Queries.CountriesQuery>(`
    query Stakeholders {
      stakeholders: allStakeholdersCsv {
        nodes {
          slug
          name
          iso3
        }
      }
    }
  `)

  if (!stakeholdersQuery.data?.stakeholders.nodes)
    throw new Error('No countries found to publish')

  for (const stakeholder of stakeholdersQuery.data.stakeholders.nodes) {
    if (!stakeholder.name) throw new Error(`All stakeholders must have a name`)

    actions.createPage({
      path: `/${stakeholder.slug}/${simplifyForUrl(stakeholder.name)}`,
      component: stakeholderPageTemplate,
      context: { name: stakeholder.name, iso3: stakeholder.iso3 },
    })
  }
}
