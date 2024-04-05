import React from 'react'
import styled from 'styled-components'

import useIndexPageData from 'cmsHooks/useIndexPageData'
import CMS from 'components/library/airtable-cms'
import Main from 'components/layout/Main'
import FundingMap, { MapType } from 'components/map/Map'

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'text map';
  align-items: stretch;
  padding: 50px 0;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'text'
      'map';
  }
`
const TextContainer = styled.div`
  grid-area: text;
  display: flex;
  flex-direction: column;
`
const MapContainer = styled.div`
  grid-area: map;
  display: flex;
  align-items: center;
  justify-content: center;
`
const H1 = styled.h1`
  ${({ theme }) => theme.textStyleBigLanding}
`
const H2 = styled.h1`
  ${({ theme }) => theme.textStyleBigParagraph}
`
const H3 = styled.h1`
  ${({ theme }) => theme.textStyleParagraph}
`

const FirstFold = () => {
  const data = useIndexPageData()

  return (
    <Main>
      <Columns>
        <TextContainer>
          <H1>
            <CMS.Text name="H1" data={data} />
          </H1>
          <H2>
            <CMS.Text name="Section 1 paragraph 1" data={data} />
          </H2>
          <H3>
            <CMS.Text name="Section 1 paragraph 2" data={data} />
          </H3>
        </TextContainer>
        <MapContainer>
          <FundingMap mapType={MapType.Received} />
        </MapContainer>
      </Columns>
    </Main>
  )
}

export default FirstFold
