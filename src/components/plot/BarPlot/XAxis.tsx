import React from 'react'
import styled from 'styled-components'

import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import formatDisplayNumber from 'utilities/formatDisplayNumber'

const AxisPath = styled.path`
  stroke: ${({ theme }) => theme.common.colors.surfaceGray400};
  stroke-width: 2;
  fill: none;
  transition: 250ms;
`
const TickLabel = styled.text`
  text-anchor: middle;
  ${({ theme }) => theme.textStyleSmallNumbers};
  fill: ${({ theme }) => theme.common.colors.textSecondary};
`
const AxisLabel = styled.text`
  text-anchor: middle;
  ${({ theme }) => theme.textStyleSmallNumbersSemibold};
  fill: ${({ theme }) => theme.common.colors.textPrimary};
`

interface XAxisProps {
  xLabel: string
}

const XAxis = ({ xLabel }: XAxisProps) => {
  const [dim] = useDim()

  const ticks = dim.axes.x.scale.ticks(dim.axes.x.ticks)

  return (
    <>
      <AxisLabel x={dim.axes.x.scale((dim.axes.x.max as number) / 2)} y={15}>
        {xLabel}
      </AxisLabel>
      {ticks.map(tick => (
        <React.Fragment key={tick}>
          <AxisPath
            d={`M ${dim.axes.x.scale(tick) - 1} ${dim.axes.y.end}
              L ${dim.axes.x.scale(tick) - 1} ${dim.axes.y.end - 10}`}
            stroke="black"
          />
          <TickLabel x={dim.axes.x.scale(tick)} y={dim.axes.y.end - 20}>
            {formatDisplayNumber(tick)}
          </TickLabel>
        </React.Fragment>
      ))}
      <AxisPath
        d={`M ${dim.axes.x.start - 1} ${dim.axes.y.end - 1}
            L ${dim.axes.x.end} ${dim.axes.y.end - 1}`}
      />
    </>
  )
}

export default XAxis
