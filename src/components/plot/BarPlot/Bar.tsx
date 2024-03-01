import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import React from 'react'
import styled from 'styled-components'
import formatDisplayNumber from 'utilities/formatDisplayNumber'

const BarPath = styled.path<{ color: string }>`
  fill: ${({ color }) => color};
  // stroke-width: 1;
  // stroke: ${({ color }) => color};
  transition: 250ms;
`

const YLabel = styled.text<{ narrowLayout: boolean }>`
  text-anchor: ${({ narrowLayout }) => (narrowLayout ? 'start' : 'end')};
  ${({ theme }) => theme.textStyleSmallNumbers};
  fill: ${({ theme }) => theme.common.colors.textPrimary};
  transition: 250ms;
`

const BarQuanitityLabel = styled.text`
  text-anchor: start;
  ${({ theme }) => theme.textStyleSmallNumbers};
  fill: ${({ theme }) => theme.common.colors.textSecondary};
  transition: 250ms;
`

const textHOffset = 10

interface BarProps {
  bars: { [key: string]: number }
  color: string
  narrowLayout: boolean
}

const Bar = ({ bars, color, narrowLayout }: BarProps) => {
  const [dim] = useDim()

  const textVOffset = dim.reference.barHeight / 2 + 4

  return Object.entries(bars)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value], index) => {
      const topLeft = {
        x: dim.axes.x.scale(0),
        y:
          dim.axes.y.end +
          (dim.reference.barHeight + dim.reference.barSep) * index,
      }

      const barTopLeft = {
        x: topLeft.x,
        y: topLeft.y + (narrowLayout ? dim.reference.barHeight / 2 : 0),
      }

      const barEnd = Math.max(dim.axes.x.scale(value), dim.axes.x.scale(0) + 1)

      return (
        <React.Fragment key={label}>
          <YLabel
            narrowLayout={narrowLayout}
            x={topLeft.x + (narrowLayout ? textHOffset : -textHOffset)}
            y={topLeft.y + (narrowLayout ? textVOffset * 0.55 : textVOffset)}
          >
            {label}
          </YLabel>
          <BarPath
            color={color}
            d={`M ${barTopLeft.x} ${barTopLeft.y} 
              L ${barEnd} ${barTopLeft.y}
              L ${barEnd} ${barTopLeft.y + dim.reference.barHeight * (narrowLayout ? 0.5 : 1)}
              L ${barTopLeft.x} ${barTopLeft.y + dim.reference.barHeight * (narrowLayout ? 0.5 : 1)}
            `}
          />
          <BarQuanitityLabel
            x={dim.axes.x.scale(0) + textHOffset}
            y={barTopLeft.y + (narrowLayout ? textVOffset * 0.55 : textVOffset)}
            style={{
              transform: `translateX(${dim.axes.x.scale(value) - dim.axes.x.start}px)`,
            }}
          >
            {formatDisplayNumber(value)}
          </BarQuanitityLabel>
        </React.Fragment>
      )
    })
}

export default Bar
