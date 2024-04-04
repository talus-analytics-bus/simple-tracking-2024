import React, { useState } from 'react'
import CMS from 'components/library/airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import Footer from 'components/layout/Footer'
import {
  Layout,
  MainContent,
  ScrollTarget,
  Sidebar,
  SidebarLink,
  TopBar,
  YearSelector,
} from 'components/stakeholderPage/StakeholderLayout'
import StakeholderSearch from 'components/stakeholderPage/StakeholderSearch'

import useStakeholderPageData from 'cmsHooks/useStakeholderPageData'

import formatHash from 'utilities/formatHash'
import FundingMap from 'components/map/Map'
import { PageProps, graphql } from 'gatsby'
import FundingTotals from 'components/stakeholderPage/FundingTotals'
import FundsByCategory from 'components/stakeholderPage/FundsByCategory/FundsByCategory'
import FundsByPHEIC from 'components/stakeholderPage/FundsByPHEIC'
import TopFundersAndRecipients from 'components/stakeholderPage/TopFundersAndRecipients'
import Map from 'react-map-gl/dist/esm/components/map'

const GlobalPage = ({ data }: PageProps<Queries.GlobalPageQuery>) => {
  return (
    <Providers>
      <CMS.SEO
        title="GHS Tracking Global Overview Page"
        description="Overall maps and charts for all data collected by GHS Tracking."
      />
      <NavBar />
      <FundingMap />
    </Providers>
  )
}

export default GlobalPage
