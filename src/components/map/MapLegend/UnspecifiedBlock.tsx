import React from 'react'
import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import styled from 'styled-components'
import { LegendText } from './MapLegend'

const BlockPath = styled.path`
  fill: darkslategray;
`

const UnspecifiedBlock = () => {
  const [dim] = useDim()

  const blockWidth =
    dim.axes.x.scale(1) - dim.axes.x.scale(0) - dim.reference.blockGap
  const rightWhitespaceCenter = dim.width - dim.padding.right / 2
  const blockStart = rightWhitespaceCenter - blockWidth / 2
  const blockEnd = rightWhitespaceCenter + blockWidth / 2

  return (
    <>
      <BlockPath
        style={{ fill: 'lightgray' }}
        d={`M ${blockStart} ${dim.axes.y.scale(0)} 
          L ${blockStart} ${dim.axes.y.scale(1)}
          L ${blockEnd} ${dim.axes.y.scale(1)}
          L ${blockEnd} ${dim.axes.y.scale(0)}
        `}
      />
      <LegendText x={rightWhitespaceCenter} y={dim.reference.scaleBaseline}>
        Unspecified
      </LegendText>
    </>
  )
}

export default UnspecifiedBlock
