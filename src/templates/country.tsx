import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Main from 'components/layout/Main'
import Providers from 'components/layout/Providers'
import CMS from 'components/library/airtable-cms/'
import NavBar from 'components/layout/NavBar/NavBar'
import Footer from 'components/layout/Footer'

const CountryPage = ({
  data,
}: PageProps<Queries.CountryPageQuery>): JSX.Element => {
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <h1>{data.stakeholdersCsv?.name}</h1>
        <table>
          <tbody>
            {Object.entries(data.receivedAndDisbursedCsv ?? {}).map(
              ([label, value]) => (
                <tr>
                  <td style={{ textAlign: 'right' }}>
                    ${new Number(value).toLocaleString()}
                  </td>
                  <td style={{ paddingLeft: 20, textAlign: 'left' }}>
                    {label.replaceAll('_', ' ')}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Main>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query CountryPage($name: String) {
    stakeholdersCsv(name: { eq: $name }) {
      name
      iso3
    }
    receivedAndDisbursedCsv(name: { eq: $name }) {
      Total_Capacity_Disbursed
      Total_Capacity_Received
      Total_Disbursed
      Total_Disbursed_Received
      Total_Response_Disbursed
      Total_Response_Received
    }
  }
`

export default CountryPage
