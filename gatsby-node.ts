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

    // if it has an iso3 code, it's a country
    if (stakeholder.iso3 !== '') {
      actions.createPage({
        path: `/countries/${simplifyForUrl(stakeholder.iso3)}`,
        component: stakeholderPageTemplate,
        context: { name: stakeholder.name, iso3: stakeholder.iso3 },
      })
    }

    // otherwise it's an organization
    else {
      actions.createPage({
        path: `/organizations/${simplifyForUrl(stakeholder.name)}`,
        component: stakeholderPageTemplate,
        context: { name: stakeholder.name, iso3: '' },
      })
    }
  }
}
