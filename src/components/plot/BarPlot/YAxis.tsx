import React from 'react'
import styled from 'styled-components'

import { useDim } from 'components/library/dim-plot/dim-plot-parent'

const AxisPath = styled.path`
  stroke: ${({ theme }) => theme.common.colors.surfaceGray400};
  stroke-width: 2;
  fill: none;
  transition: 250ms;
`

const YAxis = () => {
  const [dim] = useDim()

  return (
    <>
      <AxisPath
        d={`M ${dim.axes.x.start - 1} ${dim.axes.y.end - 2} L ${dim.axes.x.start - 1} ${dim.axes.y.start}`}
      />
    </>
  )
}

export default YAxis
