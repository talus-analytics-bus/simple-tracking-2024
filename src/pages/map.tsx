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
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
  padding: 5px;
  display: flex;
  gap: 5px;
`
const MapControlButton = styled.button<{ mapType: MapType; selected: boolean }>`
  border: none;
  background: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 200ms;
  ${({ selected }) => selected && `box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3)`};

  ${({ theme }) => theme.textStyleParagraph}

  background-color: ${({ theme, selected, mapType }) =>
    selected
      ? mapType === MapType.Disbursed
        ? theme.funder.colors.mapViz2
        : theme.recipient.colors.mapViz2
      : theme.common.colors.surfaceGray100};

  color: ${({ theme, selected }) =>
    selected
      ? theme.common.colors.textInvert
      : theme.common.colors.textPrimary};

  &:hover {
    background-color: ${({ theme, selected, mapType }) =>
      selected
        ? mapType === MapType.Disbursed
          ? theme.funder.colors.mapViz3
          : theme.recipient.colors.mapViz3
        : theme.common.colors.surfaceGray200};
  }
`

const GlobalPage = () => {
  const [mapType, setMapType] = useState(MapType.Received)

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
          mapType={MapType.Disbursed}
          selected={mapType === MapType.Disbursed}
          onClick={() => setMapType(MapType.Disbursed)}
        >
          Funder
        </MapControlButton>
        <MapControlButton
          mapType={MapType.Received}
          selected={mapType === MapType.Received}
          onClick={() => setMapType(MapType.Received)}
        >
          Recipient
        </MapControlButton>
      </MapControlContainer>
    </Providers>
  )
}

export default GlobalPage
