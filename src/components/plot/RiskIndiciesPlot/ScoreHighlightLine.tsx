import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import React from 'react'
import styled from 'styled-components'

const Line = styled.path`
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 5, 5;
  stroke: ${({ theme }) => theme.common.colors.textPrimary};
`

interface ScoreHighlightLineProps {
  score: string
}

const ScoreHighlightLine = ({ score }: ScoreHighlightLineProps) => {
  const [dim] = useDim()

  return (
    <Line
      d={`M ${dim.axes.x.scale(Number(score))} ${dim.axes.y.start}
          L ${dim.axes.x.scale(Number(score))} ${dim.axes.y.end}`}
    />
  )
}

export default ScoreHighlightLine
