import React, { useState } from 'react'
import CMS from 'components/library/airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import FundingMap, { MapType } from 'components/map/Map'

const GlobalPage = () => {
  const [mapType, setMapType] = useState<MapType>(MapType.Disbursed)

  console.log({ setMapType })

  return (
    <Providers>
      <CMS.SEO
        title="GHS Tracking Global Overview Page"
        description="Overall maps and charts for all data collected by GHS Tracking."
      />
      <NavBar />
      <button
        onClick={() =>
          setMapType(prev =>
            prev === MapType.Disbursed ? MapType.Recieved : MapType.Disbursed
          )
        }
      >
        Toggle map type
      </button>
      <FundingMap mapType={mapType} interactive fullscreen />
    </Providers>
  )
}

export default GlobalPage
