import { graphql, useStaticQuery } from 'gatsby'

const useCountriesReceivedAndDisbursed = () => {
  // const {
  //   receivedAndDisbursed: { countries },
  // } = useStaticQuery<Queries.CountriesReceivedAndDisbursedQuery>(graphql`
  //   query CountriesReceivedAndDisbursed {
  //     receivedAndDisbursed: allReceivedAndDisbursedCsv(
  //       filter: { iso3: { ne: "" } }
  //     ) {
  //       countries: nodes {
  //         iso3
  //         totalDisbursed
  //         totalDisbursedReceived
  //       }
  //     }
  //   }
  // `)
  //
  const countries = []

  return countries
}

export default useCountriesReceivedAndDisbursed
