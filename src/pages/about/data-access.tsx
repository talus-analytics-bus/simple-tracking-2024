import React from 'react'

import CMS from 'components/library/airtable-cms/'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'
import useAboutDataAccessPageData from 'cmsHooks/useAboutDataAccessPageData'
import styled from 'styled-components'
import { PageProps, graphql } from 'gatsby'

const DownloadTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  ${({ theme }) => theme.textStyleParagraphSemibold};

  td {
    padding: 30px 20px;
    @media (max-width: 600px) {
      padding: 10px 0;
    }
  }

  tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.common.colors.surfaceGray50};
    @media (max-width: 600px) {
      background: none;
    }
  }

  tr {
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  td:nth-child(2) {
    text-align: right;

    a {
      ${({ theme }) => theme.textStyleParagraph};
      padding: 10px 20px;
      border-radius: 5px;
      color: ${({ theme }) => theme.common.colors.textInvert};
      background-color: ${({ theme }) =>
        theme.common.colors.callToActionDefault};
      transition: 150ms;
      text-decoration: none;

      &:hover {
        background-color: ${({ theme }) =>
          theme.common.colors.callToActionHover};
      }
    }
  }
`

const fileDisplayNames = {
  funding_by_pheic: 'Funding by PHEIC',
  funding_by_capacity: 'Funding by Capacity',
} as { [key: string]: string }

const DataAccessPage = ({ data }: PageProps<Queries.DataAccessPageQuery>) => {
  const cmsData = useAboutDataAccessPageData()

  console.log({ data })
  console.log('cacheing issues?')

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
          <CMS.RichText name="H2 download" data={cmsData} />
          <DownloadTable>
            <tbody>
              {data.allFile.nodes.map(node => (
                <tr key={node.name}>
                  <td>{fileDisplayNames[node.name ?? ''] ?? node.name}</td>
                  <td>
                    <a href={node.publicURL ?? ''} download>
                      Download (CSV, {node.prettySize})
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </DownloadTable>
          <CMS.RichText name="H3 citation and license" data={cmsData} />
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query DataAccessPage {
    allFile(
      filter: { name: { in: ["funding_by_pheic", "funding_by_capacity"] } }
    ) {
      nodes {
        name
        publicURL
        prettySize
        dir
      }
    }
  }
`

export default DataAccessPage
