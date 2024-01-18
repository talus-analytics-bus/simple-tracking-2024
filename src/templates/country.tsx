import React from 'react'
import { graphql, PageProps } from 'gatsby'

import CMS from 'components/library/airtable-cms/'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import Footer from 'components/layout/Footer'
import {
  Layout,
  MainContent,
  Sidebar,
  TopBar,
} from 'components/stakeholderPage/StakeholderLayout'
import StakeholderSearch from 'components/stakeholderPage/StakeholderSearch'
import styled from 'styled-components'

const ContentPlaceholder = styled.div`
  height: 300vh;
  width: 100px;
  background-color: red;
`

const CountryPage = ({
  data,
}: PageProps<Queries.CountryPageQuery>): JSX.Element => {
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Layout>
        <Sidebar>
          <StakeholderSearch style={{ width: '100%' }} />
          <button>Items</button>
          <button>Items</button>
          <button>Items</button>
          <button>Items</button>
          <button>Items</button>
          <button>Items</button>
        </Sidebar>
        <TopBar>
          <h1>Country: {data.stakeholdersCsv?.name}</h1>
        </TopBar>
        <MainContent>
          <table>
            <tbody>
              {Object.entries(data.receivedAndDisbursedCsv ?? {}).map(
                ([label, value]) => (
                  <tr key={label}>
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
          <ContentPlaceholder />
        </MainContent>
      </Layout>
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
