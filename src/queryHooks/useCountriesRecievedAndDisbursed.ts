import { graphql, useStaticQuery } from 'gatsby'

const useCountriesReceivedAndDisbursed = () => {
  const {
    receivedAndDisbursed: { countries },
  } = useStaticQuery<Queries.CountriesReceivedAndDisbursedQuery>(graphql`
    query CountriesReceivedAndDisbursed {
      receivedAndDisbursed: allCountryRecievedAndDisbursedCsv {
        countries: nodes {
          iso3
          totalDisbursed
          totalDisbursedReceived
        }
      }
    }
  `)

  return countries
}

export default useCountriesReceivedAndDisbursed
