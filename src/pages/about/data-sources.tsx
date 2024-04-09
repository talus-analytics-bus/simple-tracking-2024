import React from 'react'
import styled from 'styled-components'
import { PageProps, graphql } from 'gatsby'

import CMS from 'components/library/airtable-cms/'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'

import useAboutDataSourcesPageData from 'cmsHooks/useAboutDataSourcesPageData'

const DataSourcesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;

  th {
    text-align: left;
    padding: 20px;
    color: ${({ theme }) => theme.common.colors.textInvert};
    background-color: ${({ theme }) => theme.common.colors.surfaceThemeDarker};
  }

  th:first-child {
    width: 30%;
  }

  td {
    padding: 20px;
    ${({ theme }) => theme.textStyleParagraph};

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.common.colors.textLink};

      &:hover {
        text-decoration: underline;
      }
    }
  }

  td:first-child {
    ${({ theme }) => theme.textStyleParagraphSemibold};
  }

  tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.common.colors.surfaceGray50};
  }
`

const DataSourcesPage = ({
  data,
}: PageProps<Queries.DataSourcesPageQuery>): JSX.Element => {
  const cmsData = useAboutDataSourcesPageData()

  return (
    <Providers>
      <CMS.SEO
        title={'GHSS Tracking' + CMS.getText(cmsData, 'H1 title')}
        description="Data Sources of the GHSS Tracking project"
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1 title" data={cmsData} />
          </h1>
          <CMS.RichText name="H1 paragraph" data={cmsData} />
        </AboutStyle>
        <DataSourcesTable>
          <thead>
            <tr>
              <th>Data Source</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.dataSources.nodes.map(node => (
              <tr key={node.source?.Data_source}>
                <td>{node.source?.Data_source}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: CMS.parseRichText(node.source?.Description ?? ''),
                  }}
                />
              </tr>
            ))}
          </tbody>
        </DataSourcesTable>
      </Main>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query DataSourcesPage {
    dataSources: allAirtable(
      filter: { table: { eq: "Data sources" } }
      sort: { data: { Order: ASC } }
    ) {
      nodes {
        source: data {
          Data_source
          Description
          Order
        }
      }
    }
  }
`

export default DataSourcesPage
