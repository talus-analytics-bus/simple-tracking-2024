import React from 'react'
import styled from 'styled-components'

import DimPlotParent, {
  usePlotSetup,
} from 'components/library/dim-plot/dim-plot-parent'

import Blocks from './Blocks'
import UnspecifiedBlock from './UnspecifiedBlock'
import { MapType } from '../Map'

const LegendContainer = styled.div``

const LegendTitle = styled.text`
  ${({ theme }) => theme.textStyleTinyParagraph};
  fill: ${({ theme }) => theme.common.colors.textSecondary};
  text-anchor: start;
`

export const LegendText = styled.text`
  ${({ theme }) => theme.textStyleSmallNumbers}
  fill: ${({ theme }) => theme.common.colors.textSecondary};
  text-anchor: middle;
`

interface MapLegendProps {
  mapType: MapType
  style?: React.CSSProperties
}

const width = 550
const height = 65

const MapLegend = ({ style, mapType }: MapLegendProps) => {
  const plotSetup = usePlotSetup({
    width,
    height,
    padding: {
      top: 25,
      right: 150,
      bottom: 25,
      left: 1.5,
    },
    axes: {
      x: {
        max: 6,
        ticks: 6,
      },
      y: {
        max: 1,
        ticks: 1,
      },
    },
    reference: {
      blockGap: 5,
      scaleBaseline: height - 8,
    },
  })

  return (
    <LegendContainer style={style}>
      <DimPlotParent plotSetup={plotSetup}>
        <Blocks mapType={mapType} />
        <UnspecifiedBlock />
        <LegendTitle x={0.75} y={15}>
          {mapType === MapType.Disbursed
            ? 'FUNDS DISBURSED (USD)'
            : 'FUNDS RECEIVED (USD)'}
        </LegendTitle>
      </DimPlotParent>
    </LegendContainer>
  )
}

export default MapLegend
