import React from 'react'
import { graphql, PageProps } from 'gatsby'

import CMS from 'components/library/airtable-cms/'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import Main from 'components/layout/Main'
import Footer from 'components/layout/Footer'

const CountryPage = ({
  data,
}: PageProps<Queries.OrganizationPageQuery>): JSX.Element => {
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <h1>Organization: {data.stakeholdersCsv?.name}</h1>
        <table>
          <tbody>
            {
              // {Object.entries(data.receivedAndDisbursedCsv ?? {}).map(
              //   ([label, value]) => (
              //     <tr key={label}>
              //       <td style={{ textAlign: 'right' }}>
              //         ${new Number(value).toLocaleString()}
              //       </td>
              //       <td style={{ paddingLeft: 20, textAlign: 'left' }}>
              //         {label.replaceAll('_', ' ')}
              //       </td>
              //     </tr>
              //   )
              // )}
            }
          </tbody>
        </table>
      </Main>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query OrganizationPage($name: String) {
    stakeholdersCsv(name: { eq: $name }) {
      name
      iso3
    }
  }
`

export default CountryPage
