import { GatsbyNode } from 'gatsby'
import * as path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {

  const countryPageTemplate = path.resolve('./src/templates/country.tsx')

  const countryQuery = await graphql<Queries.CountriesQuery>(`
    query Countries {
      allCountriesCsv {
        nodes {
          name
          iso3
        }
      }
    }
  `)

  if (!countryQuery.data?.allCountriesCsv.nodes)
    throw new Error('No countries found to publish')

  for (const country of countryQuery.data.allCountriesCsv.nodes) {
    if (!country?.name || !country?.iso3)
      throw new Error(`All countries must have both a name and an ISO3`)

    actions.createPage({
      path: `/countries/${country.iso3.toLowerCase()}`,
      component: countryPageTemplate,
      context: { name: country.name }
    })
  }



}



