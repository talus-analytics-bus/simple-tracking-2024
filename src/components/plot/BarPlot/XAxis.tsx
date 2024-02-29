import React from 'react'
import styled from 'styled-components'

import { useDim } from 'components/library/dim-plot/dim-plot-parent'

const AxisPath = styled.path`
  stroke: ${({ theme }) => theme.common.colors.surfaceGray400};
  stroke-width: 1;
  fill: none;
`

// const DebugFrame = styled.rect`
//   stroke: red;
//   stroke-width: 1;
//   fill: none;
// `

const XAxis = () => {
  const [dim] = useDim()

  return (
    <>
      {
        // <DebugFrame x={0} y={0} width={dim.width} height={dim.height} />
      }
      <AxisPath
        d={`M ${dim.axes.x.start} ${dim.axes.y.end} L ${dim.axes.x.end} ${dim.axes.y.end}`}
      />
    </>
  )
}

export default XAxis
