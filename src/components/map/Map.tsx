import React, { useCallback } from 'react'
import styled, { useTheme } from 'styled-components'

import Map, { Layer, MapLayerMouseEvent, Source } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import useCountryLayer from './useCountryLayer'

const mapboxAccessToken = process.env.GATSBY_MAPBOX_API_KEY

if (!mapboxAccessToken)
  throw new Error(
    'Mapbox-gl-js API key must be set in ' +
      'GATSBY_MAPBOX_API_KEY environment variable'
  )

const MapContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: 600px) {
    .mapboxgl-ctrl-top-left {
      display: none;
    }
  }
`

const FundingMap = () => {
  const theme = useTheme()

  const [hoveredISO, setHoveredISO] = React.useState(' ')

  const countryLayer = useCountryLayer()

  const outlineLayer = {
    id: `countries-outline`,
    type: `line` as `line`,
    source: `countries_v13c-6uk894`,
    'source-layer': 'countries_v13c-6uk894',
    paint: {
      'line-color': theme.common.colors.strokeWhite,
      // 'rgb(65, 101, 131)',
      'line-width': 2,
    },
    beforeId: 'country-label',
  }

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    console.log(event.features?.[0]?.properties?.ISO_A3 ?? ' ')
    setHoveredISO(event.features?.[0]?.properties?.ISO_A3 ?? ' ')
  }, [])

  return (
    <MapContainer>
      <Map
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/ryan-talus/clddahzv7007j01qbgn0bba8w"
        // projection={'naturalEarth'}
        initialViewState={{
          longitude: 0,
          latitude: 15,
          zoom: 0,
          // these bounds are weird due to a bug in mapbox with non-mercator projections:
          // https://github.com/mapbox/mapbox-gl-js/issues/11284
          bounds: [
            [180, 50],
            [-150, -35],
          ],
        }}
        maxZoom={5}
        minZoom={0}
        onMouseMove={onHover}
        interactiveLayerIds={[countryLayer.id]}
      >
        {/* This source provides country shapes and their ISO codes */}
        <Source
          id="country-borders"
          type="vector"
          url="mapbox://ryan-talus.2o1iyjoj"
        >
          {/* This layer paints all colors including grey background color */}
          <Layer
            key={outlineLayer.id}
            {...outlineLayer}
            filter={['==', 'ISO_A3', hoveredISO]}
          />
          <Layer key={countryLayer.id} {...countryLayer} />
        </Source>
      </Map>
    </MapContainer>
  )
}

export default FundingMap