import React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import CMS, { AirtableCMSData } from 'components/library/airtable-cms/'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import Footer from 'components/layout/Footer'
import StakeholderSearch from 'components/stakeholderPage/StakeholderSearch'
import FundingTotals from 'components/stakeholderPage/FundingTotals'
import {
  Layout,
  MainContent,
  Sidebar,
  SidebarLink,
  TopBar,
} from 'components/stakeholderPage/StakeholderLayout'

import useStakeholderPageData from 'cmsHooks/useStakeholderPageData'
import FundsByCategory from 'components/stakeholderPage/FundsByCategory/FundsByCategory'
import FundsByPHEIC from 'components/stakeholderPage/FundsByPHEIC'
import TopFundersAndRecipients from 'components/stakeholderPage/TopFundersAndRecipients'

const ScrollTarget = styled.div`
  position: relative;
  top: -160px;
`

const ContentPlaceholder = styled.div`
  height: 30vh;
  width: 70px;
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

  const selectedYearsLabel =
    selectedYear === 'All time'
      ? `${yearOptions.at(-1)} – ${yearOptions.at(1)}`
      : selectedYear

  const leftNavElements = cmsData.nodes
    .filter(node => node.data.Name.includes('left nav'))
    .sort(sortHLabeledNodes)

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
          <FundingTotals
            data={data}
            selectedYear={selectedYear}
            selectedYearsLabel={selectedYearsLabel}
          />

          <ScrollTarget
            id={formatHash(leftNavElements[2].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H4 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H4 subtitle stakeholder'} data={cmsData} />
          </h3>
          <FundsByCategory
            data={data}
            selectedYear={selectedYear}
            selectedYearsLabel={selectedYearsLabel}
          />

          <ScrollTarget
            id={formatHash(leftNavElements[3].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H5 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H5 subtitle stakeholder'} data={cmsData} />
          </h3>
          <FundsByPHEIC
            data={data}
            selectedYear={selectedYear}
            selectedYearsLabel={selectedYearsLabel}
          />

          <ScrollTarget
            id={formatHash(leftNavElements[4].data.Text)}
          ></ScrollTarget>
          <h2>
            <CMS.Text name={'H6 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H6 subtitle stakeholder'} data={cmsData} />
          </h3>
          <TopFundersAndRecipients
            data={data}
            selectedYear={selectedYear}
            selectedYearsLabel={selectedYearsLabel}
          />

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
        totalCapacityDisbursed
        totalCapacityReceived
        totalDisbursed
        totalDisbursedReceived
        totalResponseDisbursed
        totalResponseReceived
      }
    }
    allFundingByCapacityCsv(filter: { name: { eq: $name } }) {
      years: nodes {
        year
        p1_received
        p2_received
        p3_received
        p4_received
        p5_received
        p6_received
        p7_received
        d1_received
        d2_received
        d3_received
        d4_received
        r1_received
        r2_received
        r3_received
        r4_received
        r5_received
        re_received
        poe_received
        ce_received
        p1_disbursed
        p2_disbursed
        p3_disbursed
        p4_disbursed
        p5_disbursed
        p6_disbursed
        p7_disbursed
        d1_disbursed
        d2_disbursed
        d3_disbursed
        d4_disbursed
        r1_disbursed
        r2_disbursed
        r3_disbursed
        r4_disbursed
        r5_disbursed
        re_disbursed
        poe_disbursed
        ce_disbursed
      }
    }
    pheic_received: allFundingByPheicCsv(
      filter: { name: { eq: $name }, received: { ne: "" } }
    ) {
      pheics: nodes {
        year
        pheic
        received
      }
    }
    pheic_disbursed: allFundingByPheicCsv(
      filter: { name: { eq: $name }, disbursed: { ne: "" } }
    ) {
      pheics: nodes {
        year
        pheic
        disbursed
      }
    }
    top10FundersByYear: allTop10FundersCsv(
      filter: { recipient: { eq: $name } }
    ) {
      funders: nodes {
        year
        name: funder
        total
      }
    }
  }
`

export default CountryPage
