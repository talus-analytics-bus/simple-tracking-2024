import React, { useState } from 'react'
import CMS from 'components/library/airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import FundingMap, { MapType } from 'components/map/Map'

const GlobalPage = () => {
  const [mapType, setMapType] = useState<MapType>(MapType.Recieved)

  console.log({ setMapType })

  return (
    <Providers>
      <CMS.SEO
        title="GHS Tracking Global Overview Page"
        description="Overall maps and charts for all data collected by GHS Tracking."
      />
      <NavBar />
      <FundingMap type={mapType} interactive />
    </Providers>
  )
}

export default GlobalPage
