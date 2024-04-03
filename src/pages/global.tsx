import React, { useState } from 'react'
import CMS from 'components/library/airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import Footer from 'components/layout/Footer'
import {
  ContentBox,
  HorizontalColumns,
  Layout,
  MainContent,
  ScrollTarget,
  Sidebar,
  SidebarLink,
  TopBar,
  TotalsTable,
  YearSelector,
} from 'components/stakeholderPage/StakeholderLayout'
import StakeholderSearch from 'components/stakeholderPage/StakeholderSearch'

import useStakeholderPageData from 'cmsHooks/useStakeholderPageData'

import formatHash from 'utilities/formatHash'
import FundingMap from 'components/map/Map'
import { PageProps, graphql } from 'gatsby'
import FundingTotals from 'components/stakeholderPage/FundingTotals'
import FundsByCategory from 'components/stakeholderPage/FundsByCategory/FundsByCategory'

const GlobalPage = ({ data }: PageProps<Queries.GlobalPageQuery>) => {
  const cmsData = useStakeholderPageData()

  const yearOptions = [
    'All time',
    ...(data.allReceivedAndDisbursedCsv?.years.map(year => year.year ?? '') ??
      []),
  ]
  const [selectedYear, setSelectedYear] = useState(yearOptions[0])

  const selectedYearsLabel =
    selectedYear === 'All time'
      ? `${yearOptions.at(-1)} – ${yearOptions.at(1)}`
      : selectedYear

  console.log(data)

  return (
    <Providers>
      <CMS.SEO
        title="GHS Tracking Global Overview Page"
        description="Overall maps and charts for all data collected by GHS Tracking."
      />
      <NavBar />
      <Layout>
        <Sidebar>
          <StakeholderSearch style={{ width: '100%', marginBottom: 20 }} />
          <SidebarLink
            href={`#${formatHash(CMS.getText(cmsData, 'H2 left nav'))}`}
          >
            {CMS.getText(cmsData, 'H2 left nav')}
          </SidebarLink>
          <SidebarLink
            href={`#${formatHash(CMS.getText(cmsData, 'H3 left nav'))}`}
          >
            {CMS.getText(cmsData, 'H3 left nav')}
          </SidebarLink>
          <SidebarLink
            href={`#${formatHash(CMS.getText(cmsData, 'H4 left nav'))}`}
          >
            {CMS.getText(cmsData, 'H4 left nav')}
          </SidebarLink>
          <SidebarLink
            href={`#${formatHash(CMS.getText(cmsData, 'H5 left nav'))}`}
          >
            {CMS.getText(cmsData, 'H5 left nav')}
          </SidebarLink>
          <SidebarLink
            href={`#${formatHash(CMS.getText(cmsData, 'H6 left nav'))}`}
          >
            {CMS.getText(cmsData, 'H6 left nav')}
          </SidebarLink>
        </Sidebar>
        <TopBar>
          <h1>Global</h1>
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
          <ScrollTarget id={formatHash(CMS.getText(cmsData, 'H2 left nav'))} />
          <h2>
            <CMS.Text name={'H2 header'} data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name={'H2 subtitle global'} data={cmsData} />
          </h3>
          <FundingMap />
          <ScrollTarget id={formatHash(CMS.getText(cmsData, 'H3 left nav'))} />
          <h2>
            <CMS.Text name="H3 header" data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name="H3 subtitle global" data={cmsData} />
          </h3>
          <FundingTotals
            data={data}
            selectedYear={selectedYear}
            selectedYearsLabel={selectedYearsLabel}
          />
          <ScrollTarget id={formatHash(CMS.getText(cmsData, 'H4 left nav'))} />
          <h2>
            <CMS.Text name="H4 header" data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name="H4 subtitle global" data={cmsData} />
          </h3>
          <FundsByCategory
            data={data}
            selectedYear={selectedYear}
            selectedYearsLabel={selectedYearsLabel}
          />
        </MainContent>
      </Layout>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query GlobalPage {
    allReceivedAndDisbursedCsv: allGlobalReceivedAndDisbursedCsv {
      years: nodes {
        year
        totalCapacityDisbursed
        totalCapacityReceived
        totalDisbursed
        totalDisbursedReceived
        totalResponseDisbursed
        totalResponseReceived
      }
    }
    top10FundersByYear: allGlobalTop10FundersCsv {
      nodes {
        year
        funder
      }
    }
    top10RecipientsByYear: allGlobalTop10RecipientsCsv {
      nodes {
        year
        recipient
      }
    }
    allGlobalFundingByPheicCsv {
      nodes {
        pheic
        received
        disbursed
      }
    }
    allFundingByCapacityCsv: allGlobalFundingByCapacityCsv {
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
  }
`

export default GlobalPage