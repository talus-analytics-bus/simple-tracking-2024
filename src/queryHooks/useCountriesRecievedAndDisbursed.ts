
import { graphql, useStaticQuery } from "gatsby"

const useCountriesReceivedAndDisbursed = () => {
  const { receivedAndDisbursed: { countries } }
    = useStaticQuery<Queries.CountriesReceivedAndDisbursedQuery>(graphql`
      query CountriesReceivedAndDisbursed {
        receivedAndDisbursed: allCountryReceivedAndDisbursedCsv {
          countries: nodes {
              ISO3
              Total_Disbursed
              Total_Disbursed_Received
          }
        }
      }
    `)

  return countries
}

export default useCountriesReceivedAndDisbursed
