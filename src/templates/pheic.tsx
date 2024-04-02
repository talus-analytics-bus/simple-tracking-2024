import React from 'react'
import { PageProps, graphql } from 'gatsby'
import Providers from 'components/layout/Providers'
import CMS from 'components/library/airtable-cms'
import NavBar from 'components/layout/NavBar/NavBar'
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
} from 'components/stakeholderPage/StakeholderLayout'
import StakeholderSearch from 'components/stakeholderPage/StakeholderSearch'
import formatHash from 'utilities/formatHash'
import usePheicPageData from 'cmsHooks/usePheicPageData'
import styled from 'styled-components'
import formatDisplayNumber from 'utilities/formatDisplayNumber'
import { commaSeparatedList } from 'utilities/grammar'
import Dropdown from 'components/library/ui/dropdown'
import TopFundersAndRecipients from 'components/pheicPage/TopFundersAndRecipients'

const PheicTopBar = styled(TopBar)`
  flex-wrap: wrap;
  justify-content: start;
  align-items: baseline;
  gap: 15px;

  > h1 {
    margin-bottom: 0px;
    ${({ theme }) => theme.textStyleH1};
    color: ${({ theme }) => theme.common.colors.textPrimary};
  }

  > h2 {
    font-family: 'Barlow Condensed';
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme }) => theme.common.colors.surfaceGray600};
  }
`

const DescriptionSection = styled.div`
  display: flex;
  align-items: start;
  gap: 15px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`
const Description = styled.div`
  ${({ theme }) => theme.textStyleParagraph};
  color: ${({ theme }) => theme.common.colors.textPrimary};
`
const Sources = styled.div`
  ${({ theme }) => theme.textStyleParagraph};
  color: ${({ theme }) => theme.common.colors.textSecondary};
  margin-top: 15px;
  font-size: 14px;
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.common.colors.textPrimary};
    text-decoration: underline;
    line-break: anywhere;
  }
  a:hover {
    color: ${({ theme }) => theme.common.colors.textSecondary};
  }
`
const PathogenBox = styled.div`
  background-color: ${({ theme }) => theme.primitives.colors.blue300};
  border-radius: 5px;
  padding: 25px;
  width: 350px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

const SourcesExpanderButton = styled.button<{ open: boolean }>`
  position: relative;
  ${({ theme }) => theme.textStyleSmallParagraph};
  background: none;
  border: none;
  color: ${({ theme }) => theme.common.colors.textSecondary};
  margin-top: 15px;
  padding: 0;

  &::after {
    content: '';
    position: relative;
    display: inline-block;
    top: 3px;
    left: 2px;
    width: 14px;
    height: 14px;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_2444_6118)'%3E%3Cpath d='M12 10.5L8 6.5L4 10.5L12 10.5Z' fill='%23767676'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_2444_6118'%3E%3Crect width='16' height='16' fill='white' transform='translate(0 0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 150%;
    transform: scaleY(${({ open }) => (open ? 1 : -1)});
    transition: 250ms;
  }
`

const PheicPage = ({ data }: PageProps<Queries.PheicPageQuery>) => {
  const cmsData = usePheicPageData()

  const startYear = data.airtable?.data?.Date_PHEIC_declared?.split('-')[0]
  const endYear = data.airtable?.data?.Date_PHEIC_ended?.split('-')[0]

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
          <SidebarLink href="#pheic-overview">PHEIC Overview</SidebarLink>
          <SidebarLink
            href={`#${formatHash(CMS.getText(cmsData, 'H2 left nav'))}`}
          >
            <CMS.Text name="H2 left nav" data={cmsData} />
          </SidebarLink>
          <SidebarLink
            href={`#${formatHash(CMS.getText(cmsData, 'H3 left nav'))}`}
          >
            <CMS.Text name="H3 left nav" data={cmsData} />
          </SidebarLink>
        </Sidebar>
        <PheicTopBar>
          <h1>{data.airtable?.data?.PHEIC_name}</h1>
          <h2>Public Health Emergency of International Concern (PHEIC)</h2>
        </PheicTopBar>
        <MainContent>
          <ScrollTarget id="pheic-overview" style={{ top: -250 }} />
          <DescriptionSection>
            <Description>
              <p>{data.airtable?.data?.Description}</p>
              <table>
                <thead>
                  <tr>
                    <th>Total cases</th>
                    <th>Total deaths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.airtable?.data?.Total_cases}</td>
                    <td>{data.airtable?.data?.Total_deaths}</td>
                  </tr>
                </tbody>
              </table>
              <Dropdown
                renderButton={open => (
                  <SourcesExpanderButton open={open}>
                    Sources
                  </SourcesExpanderButton>
                )}
                floating={false}
                expanderStyle={{ width: '100%' }}
              >
                <Sources
                  dangerouslySetInnerHTML={{
                    __html: CMS.parseRichText(
                      data.airtable?.data?.Sources ?? ''
                    ),
                  }}
                />
              </Dropdown>
            </Description>
            <PathogenBox>
              <h3>Pathogen</h3>
              <p>{data.airtable?.data?.Pathogen}</p>
              <h4>Transmission</h4>
              <p>{data.airtable?.data?.Transmission}</p>
              <h4>Route of infection</h4>
              <p>
                {commaSeparatedList(
                  data.airtable?.data?.Route_of_infection as string[]
                )}
              </p>
              <h4>Medical countermeasures</h4>
              <h5>Available at onset</h5>
              <p>
                {commaSeparatedList(
                  data.airtable?.data?.MCMs_available_at_onset as string[]
                )}
              </p>
              <h5>Developed during or after event</h5>
              <p>
                {commaSeparatedList(
                  data.airtable?.data
                    ?.MCMs_developed_during_or_after_event as string[]
                )}
              </p>
            </PathogenBox>
          </DescriptionSection>
          <ScrollTarget id={formatHash(CMS.getText(cmsData, 'H2 left nav'))} />
          <h2>
            <CMS.Text name="H2 header" data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name="H2 subtitle" data={cmsData} />
          </h3>
          <HorizontalColumns>
            <ContentBox>
              <h3>
                <span>
                  <CMS.Icon name="Disbursed" style={{ height: 25 }} />
                  Funds disbursed
                </span>
                <span>
                  {startYear} - {endYear}
                </span>
              </h3>
              <TotalsTable>
                <tbody>
                  <tr>
                    <td>
                      {formatDisplayNumber(
                        Number(data.fundingTotals?.disbursed)
                      )}
                    </td>
                    <td>Total funding (USD)</td>
                  </tr>
                </tbody>
              </TotalsTable>
            </ContentBox>
            <ContentBox>
              <h3>
                <span>
                  <CMS.Icon name="Received" style={{ height: 25 }} />
                  Funds received
                </span>
                <span>
                  {startYear} - {endYear}
                </span>
              </h3>
              <TotalsTable>
                <tbody>
                  <tr>
                    <td>
                      {formatDisplayNumber(
                        Number(data.fundingTotals?.received)
                      )}
                    </td>
                    <td>Total funding (USD)</td>
                  </tr>
                </tbody>
              </TotalsTable>
            </ContentBox>
          </HorizontalColumns>
          <ScrollTarget id={formatHash(CMS.getText(cmsData, 'H3 left nav'))} />
          <h2>
            <CMS.Text name="H3 header" data={cmsData} />
          </h2>
          <h3>
            <CMS.Text name="H3 subtitle" data={cmsData} />
          </h3>
          <TopFundersAndRecipients
            startYear={startYear}
            endYear={endYear}
            data={data}
          />
        </MainContent>
      </Layout>
    </Providers>
  )
}

export const query = graphql`
  query PheicPage($name: String, $database_name: String) {
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
    fundingTotals: globalFundingByPheicCsv(pheic: { eq: $database_name }) {
      received
      disbursed
    }
    top10Funders: allPheicTop10FundersCsv(
      filter: { pheic: { eq: $database_name } }
    ) {
      nodes {
        name
        total
      }
    }
    top10Recipients: allPheicTop10RecipientsCsv(
      filter: { pheic: { eq: $database_name } }
    ) {
      nodes {
        name
        total
      }
    }
  }
`

export default PheicPage
