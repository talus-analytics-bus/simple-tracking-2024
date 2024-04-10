import React from 'react'
import styled from 'styled-components'

import { useDim } from 'components/library/dim-plot/dim-plot-parent'

import { LegendText } from './MapLegend'
import { MapType } from '../Map'

import colorPalette from 'figma/colorPalette'
import formatDisplayNumber from 'utilities/formatDisplayNumber'

const recipientScale = [
  {
    label: '-',
    color: colorPalette.recipient.colors.mapViz6,
  },
  {
    label: formatDisplayNumber(2_300_000, true),
    color: colorPalette.recipient.colors.mapViz5,
  },
  {
    label: formatDisplayNumber(35_000_000, true),
    color: colorPalette.recipient.colors.mapViz4,
  },
  {
    label: formatDisplayNumber(140_000_000, true),
    color: colorPalette.recipient.colors.mapViz3,
  },
  {
    label: formatDisplayNumber(590_000_000, true),
    color: colorPalette.recipient.colors.mapViz2,
  },
  {
    label: formatDisplayNumber(1_700_000_000, true),
    color: colorPalette.recipient.colors.mapViz1,
  },
  {
    label: '+',
    color: '',
  },
]

const funderScale = [
  {
    label: '-',
    color: colorPalette.funder.colors.mapViz6,
  },
  {
    label: formatDisplayNumber(570_000, true),
    color: colorPalette.funder.colors.mapViz5,
  },
  {
    label: formatDisplayNumber(2_300_000, true),
    color: colorPalette.funder.colors.mapViz4,
  },
  {
    label: formatDisplayNumber(19_000_000, true),
    color: colorPalette.funder.colors.mapViz3,
  },
  {
    label: formatDisplayNumber(490_000_000, true),
    color: colorPalette.funder.colors.mapViz2,
  },
  {
    label: formatDisplayNumber(1_700_000_000, true),
    color: colorPalette.funder.colors.mapViz1,
  },
  {
    label: '+',
    color: '',
  },
]

const BlockPath = styled.path``

interface BlocksProps {
  mapType: MapType
}

const Blocks = ({ mapType }: BlocksProps) => {
  const [
    {
      axes: { x, y },
      reference: { blockGap, scaleBaseline },
    },
  ] = useDim()

  const scale = mapType === MapType.Received ? recipientScale : funderScale

  return scale.map(({ label, color }, tick) => {
    let labelX
    // first
    if (tick === 0) labelX = 4
    // last
    else if (tick === scale.length - 1) labelX = x.scale(tick) - 9
    // middle
    else labelX = x.scale(tick) - blockGap / 2

    return (
      <React.Fragment key={tick}>
        {tick < scale.length - 1 && (
          <BlockPath
            style={{ fill: color }}
            d={`M ${x.scale(tick)} ${y.scale(0)} 
            L ${x.scale(tick)} ${y.scale(1)}
            L ${x.scale(tick + 1) - blockGap} ${y.scale(1)}
            L ${x.scale(tick + 1) - blockGap} ${y.scale(0)}
          `}
          />
        )}
        <LegendText x={labelX} y={scaleBaseline}>
          {label}
        </LegendText>
      </React.Fragment>
    )
  })
}

export default Blocks
