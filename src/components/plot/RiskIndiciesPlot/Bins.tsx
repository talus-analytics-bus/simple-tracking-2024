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

  const invertedScale = dim.axes.x.max < dim.axes.x.min
  const colorScale = d3
    .scaleLinear<string>()
    .domain([0, 0.5, 1])
    .range([
      theme.recipient.colors.scoringBad,
      theme.recipient.colors.scoringOk,
      theme.recipient.colors.scoringGood,
    ])

  const bars = bins.map((d, i) => {
    let fill
    let gap = dim.reference.barSep / 2
    let barMiddle = ((d.x0 ?? 0) + (d.x1 ?? 1)) / 2
    if (invertedScale) {
      gap *= -1
      fill = colorScale(1 - barMiddle / (dim.axes.x.min as number))
    } else fill = colorScale(barMiddle / (dim.axes.x.max as number))

    return (
      <path
        key={i}
        fill={fill}
        d={`M ${dim.axes.x.scale(d.x0 ?? 0) + gap} ${dim.axes.y.start} 
              L ${dim.axes.x.scale(d.x0 ?? 0) + gap} ${dim.axes.y.scale(d.length)}
              L ${dim.axes.x.scale(d.x1 ?? 1) - gap} ${dim.axes.y.scale(d.length)}
              L ${dim.axes.x.scale(d.x1 ?? 1) - gap} ${dim.axes.y.start}
            `}
      />
    )
  })

  return bars
}

export default Bins
