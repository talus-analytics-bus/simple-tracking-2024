import { GatsbyNode } from 'gatsby'
import * as path from 'path'

import simplifyForUrl from './src/utilities/simplifyForUrl'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {

  const countryPageTemplate = path.resolve('./src/templates/country.tsx')

  const countryQuery = await graphql<Queries.CountriesQuery>(`
    query Stakeholders {
      stakeholders: allStakeholdersCsv {
        nodes {
          name
          iso3
        }
      }
    }
  `)

  console.log(`Country Query`)
  console.log(countryQuery)

  if (!countryQuery.data?.stakeholders.nodes)
    throw new Error('No countries found to publish')

  for (const country of countryQuery.data.stakeholders.nodes) {
    if (!country.name)
      throw new Error(`All stakeholders must have a name`)

    // if it has an iso3 code, it's a country
    if (country.iso3 !== "") {
      actions.createPage({
        path: `/countries/${simplifyForUrl(country.iso3)}`,
        component: countryPageTemplate,
        context: { name: country.name }
      })
    }

    // otherwise it's an organization
    else {
      actions.createPage({
        path: `/organizations/${simplifyForUrl(country.name)}`,
        component: countryPageTemplate,
        context: { name: country.name }
      })
    }

  }


}



