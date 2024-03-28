import React from 'react'
import * as d3 from 'd3'
import D3 from 'd3'

import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import { useTheme } from 'styled-components'

interface BinsProps {
  bins: D3.Bin<number, number>[]
}

const Bins = ({ bins }: BinsProps) => {
  const [dim] = useDim()
  const theme = useTheme()

  const colorScale = d3
    .scaleLinear<string>()
    .domain([
      dim.axes.x.min,
      ((dim.axes.x.min as number) + (dim.axes.x.max as number)) / 2,
      dim.axes.x.max,
    ])
    .range([
      theme.recipient.colors.scoringBad,
      theme.recipient.colors.scoringOk,
      theme.recipient.colors.scoringGood,
    ])

  let gap =
    (dim.reference.barSep / 2) * (dim.axes.x.max < dim.axes.x.min ? -1 : 1)

  return bins.map((d, i) => (
    <path
      key={i}
      fill={colorScale(((d.x0 ?? 0) + (d.x1 ?? 1)) / 2)}
      d={`M ${dim.axes.x.scale(d.x0 ?? 0) + gap} ${dim.axes.y.start} 
              L ${dim.axes.x.scale(d.x0 ?? 0) + gap} ${dim.axes.y.scale(d.length)}
              L ${dim.axes.x.scale(d.x1 ?? 1) - gap} ${dim.axes.y.scale(d.length)}
              L ${dim.axes.x.scale(d.x1 ?? 1) - gap} ${dim.axes.y.start}
            `}
    />
  ))
}

export default Bins
