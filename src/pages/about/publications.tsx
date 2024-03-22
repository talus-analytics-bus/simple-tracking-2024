import React from 'react'
import styled from 'styled-components'
import { Page, PageProps, graphql } from 'gatsby'

import CMS from 'components/library/airtable-cms/'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'

import useAboutPublicationsPageData from 'cmsHooks/useAboutPublicationsPageData'

const CitationText = styled.p`
  line-height: 26px;
  ${({ theme }) => theme.textStyleParagraph}

  > a {
    color: ${({ theme }) => theme.common.colors.textPrimary};
  }
`
const TitleLink = styled.a`
  ${({ theme }) => theme.textStyleParagraphSemibold};

  &:hover {
    text-decoration: underline;
  }
`
const DOILink = styled.a`
  color: ${({ theme }) => theme.common.colors.textPrimary};
`

const Citation = ({
  data,
}: PageProps<Queries.PublicationsPageQuery>['data']['publicationsByOurTeam']['nodes'][0]) => (
  <CitationText>
    {data?.Authors?.trim()}.{' '}
    <TitleLink href={data?.URL ?? ''}>
      {data?.Publication_Title?.trim()}.
    </TitleLink>{' '}
    {data?.Publication?.trim()}
    {'. '}
    {data?.Publication_Date &&
      new Date(data?.Publication_Date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    {data?.DOI && (
      <>
        {'. '}
        <DOILink href={data?.DOI}>{data?.DOI.trim()}</DOILink>
      </>
    )}
  </CitationText>
)

const PublicationsPage = ({
  data,
}: PageProps<Queries.PublicationsPageQuery>): JSX.Element => {
  const cmsData = useAboutPublicationsPageData()

  return (
    <Providers>
      <CMS.SEO
        title={CMS.getText(cmsData, 'Page title')}
        description={CMS.getText(cmsData, 'Page description')}
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1 title" data={cmsData} />
          </h1>
          <CMS.RichText name="H1 paragraph" data={cmsData} />
          <h2>
            <CMS.Text name="H2 title" data={cmsData} />
          </h2>
          {data.publicationsByOurTeam.nodes.map(({ data }) => (
            <Citation data={data} />
          ))}
          <h2>
            <CMS.Text name="H3 title" data={cmsData} />
          </h2>
          {data.publicationsCitingOurWork.nodes.map(({ data }) => (
            <Citation data={data} />
          ))}
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query PublicationsPage {
    publicationsByOurTeam: allAirtableCitations(
      filter: {
        data: {
          Project: {
            elemMatch: {
              data: { Name: { eq: "Global Health Security Tracking" } }
            }
          }
          NEW_citation_type: { ne: "By our team" }
        }
        table: { eq: "Citations" }
      }
    ) {
      nodes {
        data {
          NEW_citation_type
          Publication_Title
          Authors
          Publication_Year
          Publication_Date
          Publication
          URL
          DOI
        }
      }
    }
    publicationsCitingOurWork: allAirtableCitations(
      filter: {
        data: {
          Project: {
            elemMatch: {
              data: { Name: { eq: "Global Health Security Tracking" } }
            }
          }
          NEW_citation_type: { ne: "By our team" }
        }
        table: { eq: "Citations" }
      }
    ) {
      nodes {
        data {
          NEW_citation_type
          Publication_Title
          Authors
          Publication_Year
          Publication_Date
          Publication
          URL
          DOI
        }
      }
    }
  }
`

export default PublicationsPage
