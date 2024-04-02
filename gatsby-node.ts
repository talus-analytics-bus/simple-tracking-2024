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

  const stakeholdersQuery = await graphql<Queries.StakeholdersQuery>(`
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

  const pheicsQuery = await graphql<Queries.PheicsQuery>(`
    query Pheics {
      pheics: allAirtable(filter: { table: { eq: "PHEIC" } }) {
        nodes {
          data {
            PHEIC_name
            PHEIC_database_name
          }
        }
      }
    }
  `)

  if (!pheicsQuery.data?.pheics.nodes)
    throw new Error('No PHEICs found to publish')

  for (const pheic of pheicsQuery.data.pheics.nodes) {
    if (!pheic.data.PHEIC_name) throw new Error(`All PHEICs must have a name`)

    actions.createPage({
      path: `/pheic/${simplifyForUrl(pheic.data.PHEIC_name)}`,
      component: path.resolve('./src/templates/pheic.tsx'),
      context: {
        name: pheic.data.PHEIC_name,
        database_name: pheic.data.PHEIC_database_name,
      },
    })
  }
}
