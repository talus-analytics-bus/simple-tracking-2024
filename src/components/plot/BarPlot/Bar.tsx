import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import React from 'react'
import styled from 'styled-components'
import formatDisplayNumber from 'utilities/formatDisplayNumber'

const BarPath = styled.path<{ color: string }>`
  fill: ${({ color }) => color};
  // stroke-width: 1;
  // stroke: ${({ color }) => color};
`

const YLabel = styled.text`
  text-anchor: end;
  ${({ theme }) => theme.textStyleSmallNumbers};
  fill: ${({ theme }) => theme.common.colors.textPrimary};
`

const BarQuanitityLabel = styled.text`
  text-anchor: start;
  ${({ theme }) => theme.textStyleSmallNumbers};
  fill: ${({ theme }) => theme.common.colors.textSecondary};
`

const textHOffset = 10

interface BarProps {
  bars: { [key: string]: number }
  color: string
}

const Bar = ({ bars, color }: BarProps) => {
  const [dim] = useDim()

  const textVOffset = dim.reference.barHeight / 2 + 3

  return Object.entries(bars)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value], index) => {
      const topLeft = {
        x: dim.axes.x.scale(1),
        y:
          dim.axes.y.end +
          dim.reference.barSep +
          (dim.reference.barHeight + dim.reference.barSep) * index,
      }
      return (
        <>
          <YLabel x={topLeft.x - textHOffset} y={topLeft.y + textVOffset}>
            {label}
          </YLabel>
          <BarPath
            color={color}
            d={`M ${topLeft.x} ${topLeft.y} 
              L ${dim.axes.x.scale(value)} ${topLeft.y}
              L ${dim.axes.x.scale(value)} ${topLeft.y + dim.reference.barHeight}
              L ${topLeft.x} ${topLeft.y + dim.reference.barHeight}
            `}
          />
          <BarQuanitityLabel
            x={dim.axes.x.scale(value) + textHOffset}
            y={topLeft.y + textVOffset}
          >
            {formatDisplayNumber(value)}
          </BarQuanitityLabel>
        </>
      )
    })
}

export default Bar
