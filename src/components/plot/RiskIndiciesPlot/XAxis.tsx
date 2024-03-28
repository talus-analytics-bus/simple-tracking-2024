import React from 'react'
import styled from 'styled-components'

import { useDim } from 'components/library/dim-plot/dim-plot-parent'

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
const MinLabel = styled.text`
  text-anchor: start;
  ${({ theme }) => theme.textStyleSmallNumbers};
  fill: ${({ theme }) => theme.common.colors.textSecondary};
`
const MaxLabel = styled(MinLabel)`
  text-anchor: end;
`

const XAxis = () => {
  const [dim] = useDim()

  const ticks = dim.axes.x.scale.ticks(dim.axes.x.ticks)

  return (
    <>
      {ticks.map(tick => (
        <React.Fragment key={tick}>
          <AxisPath
            d={`M ${dim.axes.x.scale(tick) - 1} ${dim.axes.y.start}
              L ${dim.axes.x.scale(tick) - 1} ${dim.axes.y.start + 10}`}
            stroke="black"
          />
          <TickLabel x={dim.axes.x.scale(tick)} y={dim.axes.y.start + 30}>
            {tick}
          </TickLabel>
        </React.Fragment>
      ))}
      <AxisPath
        d={`M ${dim.axes.x.start - 14} ${dim.axes.y.start - 1}
            L ${dim.axes.x.end + 14} ${dim.axes.y.start - 1}`}
      />
      <MinLabel x={dim.axes.x.start - 12} y={dim.axes.y.start + 60}>
        Most vulnerable
      </MinLabel>
      <MaxLabel x={dim.axes.x.end + 12} y={dim.axes.y.start + 60}>
        Least vulnerable
      </MaxLabel>
    </>
  )
}

export default XAxis
