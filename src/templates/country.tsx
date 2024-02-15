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
import { GatsbyImage } from 'gatsby-plugin-image'

const ScrollTarget = styled.div`
  position: relative;
  top: -160px;
`

const ContentPlaceholder = styled.div`
  height: 30vh;
  width: 370px;
  background-color: lightgray;
`

const H1 = styled.h1`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Flag = styled(GatsbyImage)`
  width: 46px;
  height: 46px;
  filter: drop-shadow(0.5px 0.5px 1px rgba(0, 0, 0, 0.35));
`

const sortHLabeledNodes = (
  a: AirtableCMSData['nodes'][0],
  b: AirtableCMSData['nodes'][0]
) =>
  Number(a.data.Name.split(' ')[0].replace('H', '')) -
  Number(b.data.Name.split(' ')[0].replace('H', ''))

const formatHash = (str: string) => str.replaceAll(' ', '-').toLowerCase()

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

  console.log(data)

  const flagImage = data.stakeholdersCsv?.flag?.childImageSharp?.gatsbyImageData

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Layout>
        <Sidebar>
          <StakeholderSearch style={{ width: '100%', marginBottom: 20 }} />
          {leftNavElements.map(node => (
            <SidebarLink
              key={node.data.Name}
              href={`#${formatHash(node.data.Text)}`}
            >
              <CMS.Text name={node.data.Name} data={cmsData} />
            </SidebarLink>
          ))}
        </Sidebar>
        <TopBar>
          <H1>
            {flagImage && (
              <Flag image={flagImage} alt={data.stakeholdersCsv?.name ?? ''} />
            )}
            Country: {data.stakeholdersCsv?.name}
          </H1>
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
            <React.Fragment key={node.data.Name}>
              <ScrollTarget
                id={formatHash(leftNavElements[index].data.Text)}
              ></ScrollTarget>
              <h2>
                <CMS.Text name={node.data.Name} data={cmsData} />
              </h2>
              <ContentPlaceholder />
            </React.Fragment>
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
      flag {
        childImageSharp {
          gatsbyImageData(
            width: 92
            placeholder: BLURRED
            blurredOptions: { width: 46 }
          )
        }
      }
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
