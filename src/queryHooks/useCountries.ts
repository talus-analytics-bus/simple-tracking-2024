import { graphql, useStaticQuery } from "gatsby"

const useCountries = () => {
  const { allCountriesCsv: { countries } }
    = useStaticQuery<Queries.UseCountriesQuery>(graphql`
      query UseCountries {
        allCountriesCsv {
          countries: nodes {
            name
            iso3
          }
        }
      }
    `)

  return countries
}

export default useCountries
