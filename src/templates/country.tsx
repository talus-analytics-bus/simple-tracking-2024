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

const YearSelector = styled.select`
  padding: 5px 8px;
  margin-left: auto;
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
  const cmsData = useStakeholderPageData({
    '[STAKEHOLDER]': data.stakeholdersCsv?.name,
  })

  const yearOptions = [
    'All time',
    ...(data.allReceivedAndDisbursedCsv?.years.map(year => year.Year ?? '') ??
      []),
  ]

  const [selectedYear, setSelectedYear] = React.useState(yearOptions[0])

  const leftNavElements = cmsData.nodes
    .filter(node => node.data.Name.includes('left nav'))
    .sort(sortHLabeledNodes)

  // const headers = cmsData.nodes
  //   .filter(node => node.data.Name.includes('header'))
  //   .sort(sortHLabeledNodes)

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
          <YearSelector
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            {yearOptions.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </YearSelector>
        </TopBar>
        <MainContent>
          {
            // <table>
            //   <tbody>
            //     {Object.entries(data.receivedAndDisbursedCsv ?? {}).map(
            //       ([label, value]) => (
            //         <tr key={label}>
            //           <td style={{ textAlign: 'right' }}>
            //             ${new Number(value).toLocaleString()}
            //           </td>
            //           <td style={{ paddingLeft: 20, textAlign: 'left' }}>
            //             {label.replaceAll('_', ' ')}
            //           </td>
            //         </tr>
            //       )
            //     )}
            //   </tbody>
            // </table>
          }
          <ScrollTarget
            id={formatHash(leftNavElements[0].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H2 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H2 subtitle stakeholder'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[1].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H3 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H3 subtitle stakeholder'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[2].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H4 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H4 subtitle stakeholder'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[3].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H5 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H5 subtitle stakeholder'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[4].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H6 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H6 subtitle stakeholder'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[4].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H6 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H6 subtitle stakeholder'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[5].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H6 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H6 subtitle stakeholder'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[4].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H7 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H7 subtitle'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[5].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H8 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H8 subtitle'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[6].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H9 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H9 subtitle'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[7].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H10 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H10 subtitle'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          <ScrollTarget
            id={formatHash(leftNavElements[8].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H11 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H11 subtitle'} data={cmsData} />
          </h3>
          <ContentPlaceholder />

          {
            // headers.map((node, index) => (
            // <React.Fragment key={node.data.Name}>
            //   <ScrollTarget
            //     id={formatHash(leftNavElements[index].data.Text)}
            //   ></ScrollTarget>
            //   <h2>
            //     <CMS.Text name={node.data.Name} data={cmsData} />
            //   </h2>
            //   <ContentPlaceholder />
            // </React.Fragment>
            // ))
          }

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
    allReceivedAndDisbursedCsv(filter: { name: { eq: $name } }) {
      years: nodes {
        Year
        Total_Capacity_Disbursed
        Total_Capacity_Received
        Total_Disbursed
        Total_Disbursed_Received
        Total_Response_Disbursed
        Total_Response_Received
      }
    }
  }
`

export default CountryPage
