import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Expression } from 'mapbox-gl'

import useCountriesReceivedAndDisbursed from 'queryHooks/useCountriesRecievedAndDisbursed'
import { MapType } from './Map'

const getColor = (value: string, theme: ReturnType<typeof useTheme>) => {
  switch (true) {
    case value === '':
      return theme.recipient.colors.mapUnspecified
    case value === '0':
      return theme.recipient.colors.mapUnspecified
    case Number(value) < 2_300_000:
      return theme.recipient.colors.mapViz6
    case Number(value) < 35_000_000:
      return theme.recipient.colors.mapViz5
    case Number(value) < 140_000_000:
      return theme.recipient.colors.mapViz4
    case Number(value) < 590_000_000:
      return theme.recipient.colors.mapViz3
    case Number(value) < 1_700_000_000:
      return theme.recipient.colors.mapViz2
    default:
      return theme.recipient.colors.mapViz1
  }
}

const getColorFunder = (value: string, theme: ReturnType<typeof useTheme>) => {
  switch (true) {
    case value === '':
      return theme.funder.colors.mapUnspecified
    case value === '0':
      return theme.funder.colors.mapUnspecified
    case Number(value) < 570_000:
      return theme.funder.colors.mapViz5
    case Number(value) < 2_300_000:
      return theme.funder.colors.mapViz4
    case Number(value) < 19_000_000:
      return theme.funder.colors.mapViz3
    case Number(value) < 490_000_000:
      return theme.funder.colors.mapViz3
    case Number(value) < 1_700_000_000:
      return theme.funder.colors.mapViz1
    default:
      return theme.funder.colors.mapViz1
  }
}

const useCountryLayer = (mapType: MapType) => {
  const theme = useTheme()

  const countriesReceivedAndDisbursed = useCountriesReceivedAndDisbursed()

  const countryLayer = useMemo(() => {
    // find max value for received and disbursed

    //     const maxReceivedAndDisbursed = Math.max(
    //       ...countriesReceivedAndDisbursed.map(
    //         country => Number(country.Total_Disbursed) ?? 0
    //       )
    //     )

    //     console.log(maxReceivedAndDisbursed)

    // create a string array of [iso, color, iso, color] for all countries
    // to populate the mapbox fill-color match statement format
    const countryColorMatch: string[] = []
    for (const country of countriesReceivedAndDisbursed) {
      const iso = country.iso3 ?? ''
      const received = country.totalDisbursedReceived ?? ''
      const disbursed = country.totalDisbursed ?? ''

      if (mapType === MapType.Received)
        countryColorMatch.push(iso, getColor(received, theme))
      else countryColorMatch.push(iso, getColorFunder(disbursed, theme))
    }

    const countryLayer = {
      id: `countries-highlight`,
      type: `fill` as `fill`,
      source: `countries_v13c-6uk894`,
      'source-layer': 'countries_v13c-6uk894',
      paint: {
        'fill-outline-color': theme.common.colors.surfaceWhite,
        'fill-color': [
          'match',
          ['get', 'ISO_A3'],
          ...countryColorMatch,
          // last color in the array is the "default color"
          theme.recipient.colors.mapUnspecified,
        ] as Expression,
      },
      beforeId: 'countries-outline',
    }

    return countryLayer
  }, [mapType, countriesReceivedAndDisbursed, theme])

  return countryLayer
}

export default useCountryLayer
