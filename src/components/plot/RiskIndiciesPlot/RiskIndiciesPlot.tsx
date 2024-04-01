import DimPlotParent, {
  usePlotSetup,
} from 'components/library/dim-plot/dim-plot-parent'
import React from 'react'
import styled from 'styled-components'
import XAxis from './XAxis'
import Bins from './Bins'

import * as d3 from 'd3'
import ScoreHighlightLine from './ScoreHighlightLine'

interface RiskIndiciesPlotProps {
  min: number
  max: number
  name: string | null | undefined
  highlight: {
    readonly score: string | null
    readonly rank: string | null
  } | null
  data: readonly {
    readonly score: string | null
  }[]
}

const PlotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const binCount = 50

const RiskIndiciesPlot = ({
  data,
  min,
  max,
  name,
  highlight,
}: RiskIndiciesPlotProps) => {
  const histogram = d3
    .bin<number, number>()
    .domain([min < max ? min : max, min < max ? max : min])
    .thresholds(binCount)

  const values = data.map(d => parseFloat(d.score ?? ''))
  const bins = histogram(values)

  const plotSetup = usePlotSetup({
    width: 500,
    height: 330,
    padding: {
      top: 30,
      right: 15,
      bottom: 60,
      left: 15,
    },
    reference: {
      binCount,
      barSep: 1.5,
    },
    axes: {
      x: {
        min,
        max,
        ticks: 6,
      },
      y: {
        max: d3.max(bins, d => d.length) ?? 1,
      },
    },
  })

  return (
    <PlotContainer>
      <DimPlotParent plotSetup={plotSetup}>
        <Bins bins={bins} />
        <ScoreHighlightLine score={highlight?.score ?? ''} />
        <XAxis
          label={`${name} | Rank: ${highlight?.rank} | Score: ${highlight?.score}/${max}`}
        />
      </DimPlotParent>
    </PlotContainer>
  )
}

export default RiskIndiciesPlot
