import React from 'react'
import { renderToString } from 'react-dom/server'
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
  ContentSection,
  Layout,
  MainContent,
  ScrollTarget,
  Sidebar,
  SidebarLink,
  SourceText,
  TopBar,
  YearSelector,
} from 'components/stakeholderPage/StakeholderLayout'
import FundsByCategory from 'components/stakeholderPage/FundsByCategory/FundsByCategory'
import FundsByPHEIC from 'components/stakeholderPage/FundsByPHEIC'
import TopFundersAndRecipients from 'components/stakeholderPage/TopFundersAndRecipients'
import SparScores from 'components/stakeholderPage/SparScores'
import JeeScores from 'components/stakeholderPage/JeeScores'
import Naphs from 'components/stakeholderPage/Naphs'
import PvsPathway from 'components/stakeholderPage/pvsPathway'
import RiskIndicies from 'components/stakeholderPage/RiskIndicies'

import useStakeholderPageData from 'cmsHooks/useStakeholderPageData'

import formatHash from 'utilities/formatHash'
import useTechnicalAppendixLinkData from 'cmsHooks/useTechnicalAppendixLinkData'

const H1 = styled.h1`
  ${({ theme }) => theme.textStyleH1};
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

const StakeholderPage = ({
  data,
}: PageProps<Queries.StakeholderPageQuery>): JSX.Element => {
  const cmsData = useStakeholderPageData()
  const technicalAppendixLinkData = useTechnicalAppendixLinkData()

  const stakeholderName = data.stakeholdersCsv?.name
  const stakeholderIsCountry = data.stakeholdersCsv?.iso3 !== ''

  if (!stakeholderName)
    throw new Error('No stakeholder name found for stakeholder page')

  const yearOptions = [
    'All time',
    ...(data.allReceivedAndDisbursedCsv?.years.map(year => year.year ?? '') ??
      []),
  ]

  const [selectedYear, setSelectedYear] = React.useState(yearOptions[0])

  const selectedYearsLabel =
    selectedYear === 'All time'
      ? `${yearOptions.at(-1)}–${yearOptions.at(1)}`
      : selectedYear

  let leftNavElements = cmsData.nodes
    .filter(node => node.data.Name.includes('left nav'))
    .sort(sortHLabeledNodes)

  if (!stakeholderIsCountry) leftNavElements = leftNavElements.slice(0, 5)

  const flagImage = data.stakeholdersCsv?.flag?.childImageSharp?.gatsbyImageData

  const jeeVersion =
    { jee1: '1.0', jee2: '2.0' }[
      data.allJeeScoresCsv.nodes[0]?.risk_index ?? ''
    ] ?? ''

  if (stakeholderIsCountry && !jeeVersion)
    throw new Error(`No JEE version found for ${data.stakeholdersCsv?.name}`)

  const stakeholderNameReplacement = {
    '[STAKEHOLDER]': stakeholderName,
  }

  const linkString = renderToString(
    <CMS.Download name="Technical appendix" data={technicalAppendixLinkData} />
  ).replace(/\n|\r/g, '')

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Layout>
        <Sidebar>
          <StakeholderSearch style={{ width: '100%', marginBottom: 20 }} />
          {leftNavElements
            // temporarily remove map section
            .slice(1)
            .map(node => (
              <SidebarLink
                key={node.data.Name}
                href={`#${formatHash(node.data.Text)}`}
              >
                <CMS.Text
                  name={node.data.Name}
                  data={cmsData}
                  replace={stakeholderNameReplacement}
                />
              </SidebarLink>
            ))}
        </Sidebar>
        <TopBar>
          <H1>
            {flagImage && <Flag image={flagImage} alt={stakeholderName} />}
            {stakeholderName}
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
            // <ScrollTarget
            //   id={formatHash(leftNavElements[0].data.Text)}
            // />
            // <h2>
            //   <CMS.Text name={'H2 header'} data={cmsData} />
            // </h2>
            // <h3>
            //   <CMS.Text name={'H2 subtitle stakeholder'} data={cmsData} />
            // </h3>
            // <ContentPlaceholder />
          }
          <ContentSection>
            <ScrollTarget
              id={formatHash(leftNavElements[1].data.Text)}
              style={{ top: '-170px' }}
            />
            <h2>
              <CMS.Text name={'H3 header'} data={cmsData} />
            </h2>
            <h3>
              <CMS.Text
                name={'H3 subtitle stakeholder'}
                data={cmsData}
                replace={stakeholderNameReplacement}
              />
            </h3>
            <FundingTotals
              data={data}
              selectedYear={selectedYear}
              selectedYearsLabel={selectedYearsLabel}
            />
          </ContentSection>

          <ContentSection>
            <ScrollTarget id={formatHash(leftNavElements[2].data.Text)} />
            <h2>
              <CMS.Text name={'H4 header'} data={cmsData} />
            </h2>
            <h3
              dangerouslySetInnerHTML={{
                __html: CMS.parseRichText(
                  CMS.getText(cmsData, 'H4 subtitle stakeholder', false, {
                    ...stakeholderNameReplacement,
                    '[TECHNICAL APPENDIX LINK]': linkString,
                  })
                ),
              }}
            />
            <FundsByCategory
              data={data}
              selectedYear={selectedYear}
              selectedYearsLabel={selectedYearsLabel}
            />
          </ContentSection>

          <ContentSection>
            <ScrollTarget id={formatHash(leftNavElements[3].data.Text)} />
            <h2>
              <CMS.Text name={'H5 header'} data={cmsData} />
            </h2>
            <h3>
              <CMS.Text
                name={'H5 subtitle stakeholder'}
                data={cmsData}
                replace={stakeholderNameReplacement}
              />
            </h3>
            <FundsByPHEIC
              data={data}
              selectedYear={selectedYear}
              selectedYearsLabel={selectedYearsLabel}
            />
          </ContentSection>

          <ContentSection>
            <ScrollTarget id={formatHash(leftNavElements[4].data.Text)} />
            <h2>
              <CMS.Text name={'H6 header'} data={cmsData} />
            </h2>
            <h3>
              <CMS.Text
                name={'H6 subtitle stakeholder'}
                data={cmsData}
                replace={stakeholderNameReplacement}
              />
            </h3>
            <TopFundersAndRecipients
              data={data}
              selectedYear={selectedYear}
              selectedYearsLabel={selectedYearsLabel}
            />
          </ContentSection>

          {stakeholderIsCountry && (
            <>
              <ContentSection>
                <ScrollTarget id={formatHash(leftNavElements[5].data.Text)} />
                <h2>
                  <CMS.Text name={'H7 header'} data={cmsData} />
                </h2>
                <h3>
                  <CMS.Text
                    name={'H7 subtitle'}
                    data={cmsData}
                    replace={stakeholderNameReplacement}
                  />
                </h3>
                <SourceText>
                  <CMS.RichText name={'H7 source'} data={cmsData} />
                </SourceText>
                <SparScores data={data} />
              </ContentSection>

              <ContentSection>
                <ScrollTarget id={formatHash(leftNavElements[6].data.Text)} />
                <h2>
                  <CMS.Text
                    name={'H8 header'}
                    data={cmsData}
                    replace={{ '[1.0]': jeeVersion }}
                  />
                </h2>
                <h3>
                  <CMS.Text
                    name={'H8 subtitle'}
                    data={cmsData}
                    replace={stakeholderNameReplacement}
                  />
                </h3>
                <SourceText>
                  <CMS.RichText name={'H8 source'} data={cmsData} />
                </SourceText>
                <JeeScores data={data} />
              </ContentSection>

              <ContentSection>
                <ScrollTarget id={formatHash(leftNavElements[7].data.Text)} />
                <h2>
                  <CMS.Text name={'H9 header'} data={cmsData} />
                </h2>
                <h3>
                  <CMS.Text
                    name={'H9 subtitle'}
                    data={cmsData}
                    replace={stakeholderNameReplacement}
                  />
                </h3>
                <RiskIndicies data={data} />
              </ContentSection>

              <ContentSection>
                <ScrollTarget id={formatHash(leftNavElements[8].data.Text)} />
                <h2>
                  <CMS.Text name={'H10 header'} data={cmsData} />
                </h2>
                <h3>
                  <CMS.Text
                    name={'H10 subtitle'}
                    data={cmsData}
                    replace={stakeholderNameReplacement}
                  />
                </h3>
                <SourceText>
                  <CMS.RichText name={'H10 source'} data={cmsData} />
                </SourceText>
                <Naphs data={data} />
              </ContentSection>

              <ContentSection>
                <ScrollTarget id={formatHash(leftNavElements[9].data.Text)} />
                <h2>
                  <CMS.Text name={'H11 header'} data={cmsData} />
                </h2>
                <h3>
                  <CMS.Text
                    name={'H11 subtitle'}
                    data={cmsData}
                    replace={stakeholderNameReplacement}
                  />
                </h3>
                <SourceText>
                  <CMS.RichText name={'H11 source'} data={cmsData} />
                </SourceText>
                <PvsPathway data={data} />
              </ContentSection>
            </>
          )}
        </MainContent>
      </Layout>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query StakeholderPage($name: String, $iso3: String) {
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
        year
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
        slug
        total
      }
    }
    top10RecipientsByYear: allTop10RecipientsCsv(
      filter: { funder: { eq: $name } }
    ) {
      recipients: nodes {
        year
        name: recipient
        slug
        total
      }
    }
    allSparScores2022Csv(filter: { iso3: { eq: $iso3 } }) {
      nodes {
        metric
        metric_name
        meaning
      }
    }
    allJeeScoresCsv(filter: { iso3: { eq: $iso3 } }) {
      nodes {
        risk_index
        capacity_category
        metric
        metric_name
        meaning
      }
    }
    naphs: allAirtable(
      filter: { table: { eq: "NAPHS" }, data: { Country_ISO3: { eq: $iso3 } } }
    ) {
      nodes {
        data {
          PDF {
            localFiles {
              publicURL
            }
          }
          Years
          Status
        }
      }
    }
    pvs_pathway: allAirtable(
      filter: {
        table: { eq: "PVS Pathway" }
        data: { Country_ISO3: { eq: $iso3 } }
      }
    ) {
      nodes {
        data {
          PDF {
            localFiles {
              publicURL
            }
          }
          Year
          Report_type
        }
      }
    }
    ghsi: ghsiScores2021Csv(iso3: { eq: $iso3 }) {
      score
      rank
    }
    idvi: idviScores2016Csv(iso3: { eq: $iso3 }) {
      score: overall_score_normed
      rank
    }
    inform: informScores2022Csv(iso3: { eq: $iso3 }) {
      score: risk_score
      rank
    }
    wri: wriScores2022Csv(iso3: { eq: $iso3 }) {
      score: world_risk_index
      rank
    }
  }
`

export default StakeholderPage
