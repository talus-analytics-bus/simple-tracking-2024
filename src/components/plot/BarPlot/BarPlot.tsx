import DimPlotParent, {
  usePlotSetup,
} from 'components/library/dim-plot/dim-plot-parent'
import React from 'react'
import styled from 'styled-components'
import XAxis from './XAxis'
import YAxis from './YAxis'
import Bar from './Bar'

import * as d3 from 'd3'

const PlotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`

interface BarPlotProps {
  bars: { [key: string]: number }
  max: number
  barColor: string
}

const reference = {
  barHeight: 30,
  barSep: 15,
}

const padding = {
  top: 80,
  right: 20,
  bottom: 20,
  left: 415,
}

const width = 1000

const BarPlot = ({ bars, max, barColor }: BarPlotProps) => {
  const barCount = Object.keys(bars).length

  const niceDomain = d3.nice(0, Math.round(max * 1.1), 5)

  const plotSetup = usePlotSetup({
    width,
    height:
      padding.top +
      padding.bottom +
      barCount * reference.barHeight +
      barCount * reference.barSep,
    axes: {
      x: {
        min: 0,
        max: niceDomain[1],
        // log scale version
        // max: Math.ceil(max * 2),
        // scale: scaleLog()
        //   .domain([1, Math.ceil(max * 2)])
        //   .range([padding.left, width - padding.right]),
      },
      y: { min: 0, max: barCount },
    },
    reference,
    padding,
  })

  return (
    <PlotContainer>
      <DimPlotParent plotSetup={plotSetup}>
        <YAxis />
        <XAxis />
        <Bar bars={bars} color={barColor} />
      </DimPlotParent>
    </PlotContainer>
  )
}

export default BarPlot
