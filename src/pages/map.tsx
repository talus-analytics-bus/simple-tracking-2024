import React, { useState } from 'react'
import styled from 'styled-components'
import CMS from 'components/library/airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import FundingMap, { MapType } from 'components/map/Map'

const MapControlContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
  padding: 5px;
  display: flex;
  gap: 5px;
`
const MapControlButton = styled.button<{ selected?: boolean }>`
  border: none;
  background: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 200ms;

  ${({ theme }) => theme.textStyleParagraph}

  background-color: ${({ theme, selected }) =>
    selected
      ? theme.common.colors.surfaceThemeDarker
      : theme.common.colors.surfaceGray100};

  color: ${({ theme, selected }) =>
    selected
      ? theme.common.colors.textInvert
      : theme.common.colors.textPrimary};
`

const GlobalPage = () => {
  const [mapType, setMapType] = useState<MapType>(MapType.Disbursed)

  return (
    <Providers>
      <CMS.SEO
        title="GHS Tracking Global Overview Page"
        description="Overall maps and charts for all data collected by GHS Tracking."
      />
      <NavBar />
      <FundingMap mapType={mapType} interactive fullscreen />
      <MapControlContainer>
        <MapControlButton
          selected={mapType === MapType.Disbursed}
          onClick={() => setMapType(MapType.Disbursed)}
        >
          Funder
        </MapControlButton>
        <MapControlButton
          selected={mapType === MapType.Recieved}
          onClick={() => setMapType(MapType.Recieved)}
        >
          Recipient
        </MapControlButton>
      </MapControlContainer>
    </Providers>
  )
}

export default GlobalPage
