import { useDim } from 'components/library/dim-plot/dim-plot-parent'
import React from 'react'
import { LegendText } from './MapLegend'

interface LegendTitleProps {
  title: string
}

const LegendTitle = ({ title }: LegendTitleProps) => {
  return (
    <LegendText x={0} y={5}>
      {title}
    </LegendText>
  )
}

export default LegendTitle
