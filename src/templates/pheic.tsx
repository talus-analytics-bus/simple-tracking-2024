import React from 'react'
import { PageProps, graphql } from 'gatsby'
import Providers from 'components/layout/Providers'
import CMS from 'components/library/airtable-cms'
import NavBar from 'components/layout/NavBar/NavBar'
import {
  Layout,
  Sidebar,
  SidebarLink,
} from 'components/stakeholderPage/StakeholderLayout'
import StakeholderSearch from 'components/stakeholderPage/StakeholderSearch'
import formatHash from 'utilities/formatHash'
import usePheicPageData from 'cmsHooks/usePheicPageData'

const PheicPage = ({ data }: PageProps<Queries.PheicPageQuery>) => {
  const cmsData = usePheicPageData()

  return (
    <Providers>
      <CMS.SEO
        title={data.airtable?.data?.PHEIC_name ?? ''}
        description={data.airtable?.data?.Description ?? ''}
      />

      <NavBar />
      <Layout>
        <Sidebar>
          <StakeholderSearch style={{ width: '100%', marginBottom: 20 }} />
          <SidebarLink href={formatHash(CMS.getText(cmsData, 'H2 left nav'))}>
            <CMS.Text name="H2 left nav" data={cmsData} />
          </SidebarLink>
        </Sidebar>
        <h1>{data.airtable?.data?.PHEIC_name}</h1>
        <p>{data.airtable?.data?.Description}</p>
        <p>{data.airtable?.data?.Date_PHEIC_declared}</p>
        <p>{data.airtable?.data?.Date_PHEIC_ended}</p>
        <p>{data.airtable?.data?.Total_cases}</p>
        <p>{data.airtable?.data?.Total_deaths}</p>
        <p>{data.airtable?.data?.Sources}</p>
        <p>{data.airtable?.data?.Pathogen}</p>
        <p>{data.airtable?.data?.Transmission}</p>
        <p>{data.airtable?.data?.Route_of_infection}</p>
        <p>{data.airtable?.data?.MCMs_available_at_onset}</p>
        <p>{data.airtable?.data?.MCMs_developed_during_or_after_event}</p>
      </Layout>
    </Providers>
  )
}

export const query = graphql`
  query PheicPage($name: String) {
    airtable(data: { PHEIC_name: { eq: $name } }) {
      data {
        PHEIC_name
        Description
        Date_PHEIC_declared
        Date_PHEIC_ended
        Total_cases
        Total_deaths
        Sources
        Pathogen
        Transmission
        Route_of_infection
        MCMs_available_at_onset
        MCMs_developed_during_or_after_event
      }
    }
  }
`

export default PheicPage
