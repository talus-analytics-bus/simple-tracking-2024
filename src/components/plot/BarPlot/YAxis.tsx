import React from 'react'
import styled from 'styled-components'

import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import { textHOffset } from './Bars'

const AxisPath = styled.path`
  stroke: ${({ theme }) => theme.common.colors.surfaceGray400};
  stroke-width: 2;
  fill: none;
  transition: 250ms;
`
const AxisLabel = styled.text`
  text-anchor: end;
  ${({ theme }) => theme.textStyleSmallNumbersSemibold};
  fill: ${({ theme }) => theme.common.colors.textPrimary};
`

interface YAxisProps {
  yLabel: string
  narrowLayout: boolean
}

const YAxis = ({ yLabel, narrowLayout }: YAxisProps) => {
  const [dim] = useDim()

  return (
    <>
      {!narrowLayout && (
        <AxisLabel x={dim.axes.x.start - textHOffset} y={15}>
          {yLabel}
        </AxisLabel>
      )}
      <AxisPath
        d={`M ${dim.axes.x.start - 1} ${dim.axes.y.end - 2} L ${dim.axes.x.start - 1} ${dim.axes.y.start}`}
      />
    </>
  )
}

export default YAxis
