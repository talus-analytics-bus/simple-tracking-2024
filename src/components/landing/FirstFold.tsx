import React from 'react'
import styled from 'styled-components'

import useIndexPageData from 'cmsHooks/useIndexPageData'
import CMS from 'components/library/airtable-cms'

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
  border: 1px solid ${({ theme }) => theme.common.colors.surfaceGray200};
  background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
`
const H1 = styled.h1``

const FirstFold = () => {
  const data = useIndexPageData()

  return (
    <Columns>
      <TextContainer>
        <H1>
          <CMS.Text name="H1" data={data} />
        </H1>
        <h2>
          <CMS.Text name="Section 1 paragraph 1" data={data} />
        </h2>
        <h3>
          <CMS.Text name="Section 1 paragraph 2" data={data} />
        </h3>
      </TextContainer>
      <MapContainer>
        <em>map placeholder</em>
      </MapContainer>
    </Columns>
  )
}

export default FirstFold
