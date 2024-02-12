import React from 'react'
import { graphql, PageProps } from 'gatsby'

import CMS, { AirtableCMSData } from 'components/library/airtable-cms/'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import Footer from 'components/layout/Footer'
import {
  Layout,
  MainContent,
  Sidebar,
  SidebarLink,
  TopBar,
} from 'components/stakeholderPage/StakeholderLayout'
import StakeholderSearch from 'components/stakeholderPage/StakeholderSearch'
import styled from 'styled-components'
import useStakeholderPageData from 'cmsHooks/useStakeholderPageData'

const ScrollTarget = styled.div`
  position: relative;
  top: -160px;
`

const ContentPlaceholder = styled.div`
  height: 30vh;
  width: 370px;
  background-color: lightgray;
`

const sortHLabeledNodes = (
  a: AirtableCMSData['nodes'][0],
  b: AirtableCMSData['nodes'][0]
) =>
  Number(a.data.Name.split(' ')[0].replace('H', '')) -
  Number(b.data.Name.split(' ')[0].replace('H', ''))

const CountryPage = ({
  data,
}: PageProps<Queries.CountryPageQuery>): JSX.Element => {
  const cmsData = useStakeholderPageData()

  const leftNavElements = cmsData.nodes
    .filter(node => node.data.Name.includes('left nav'))
    .sort(sortHLabeledNodes)

  const headers = cmsData.nodes
    .filter(node => node.data.Name.includes('header'))
    .sort(sortHLabeledNodes)

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Layout>
        <Sidebar>
          <StakeholderSearch style={{ width: '100%', marginBottom: 20 }} />
          {leftNavElements.map(node => (
            <SidebarLink href={`#${node.data.Text}`}>
              <CMS.Text name={node.data.Name} data={cmsData} />
            </SidebarLink>
          ))}
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
          {headers.map((node, index) => (
            <>
              <ScrollTarget
                id={leftNavElements[index].data.Text}
              ></ScrollTarget>
              <h2>
                <CMS.Text name={node.data.Name} data={cmsData} />
              </h2>
              <ContentPlaceholder />
            </>
          ))}
          <a id={'1'}>Section 1</a>
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
