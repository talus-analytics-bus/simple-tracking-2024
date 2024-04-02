import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'

import DimPlotParent, {
  usePlotSetup,
} from 'components/library/dim-plot/dim-plot-parent'

import XAxis from './XAxis'
import YAxis from './YAxis'
import Bar from './Bar'

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
  xLabel: string
  yLabel: string
}

const BarPlot = ({ bars, max, barColor, xLabel, yLabel }: BarPlotProps) => {
  const barCount = Object.keys(bars).slice(0, 10).length

  const [narrowLayout, setNarrowLayout] = React.useState(false)
  const [veryNarrowLayout, setVeryNarrowLayout] = React.useState(false)

  useLayoutEffect(() => {
    const handleResize = () => {
      setNarrowLayout(window.innerWidth < 1200)
      setVeryNarrowLayout(window.innerWidth < 600)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const width = narrowLayout ? (veryNarrowLayout ? 450 : 600) : 1000

  const reference = {
    barHeight: narrowLayout ? 60 : 30,
    barSep: 15,
  }

  const padding = {
    top: 70,
    right: 50,
    bottom: 5,
    left: narrowLayout ? 5 : 430,
  }

  const plotSetup = usePlotSetup({
    width,
    height:
      padding.top +
      padding.bottom +
      barCount * (reference.barHeight + reference.barSep),
    axes: {
      x: {
        max,
        ticks: 4,
        // log scale version
        // max: Math.ceil(max * 2),
        // scale: scaleLog()
        //   .domain([1, Math.ceil(max * 2)])
        //   .range([padding.left, width - padding.right]),
      },
      y: { max: barCount, ticks: barCount },
    },
    reference,
    padding,
  })

  return (
    <PlotContainer>
      <DimPlotParent plotSetup={plotSetup}>
        <YAxis yLabel={yLabel} narrowLayout={narrowLayout} />
        <XAxis xLabel={xLabel} />
        <Bar bars={bars} color={barColor} narrowLayout={narrowLayout} />
      </DimPlotParent>
    </PlotContainer>
  )
}

export default BarPlot
