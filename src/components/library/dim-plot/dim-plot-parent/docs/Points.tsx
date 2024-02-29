import React from 'react'
import { useDim } from '..'

const Points = ({ dataPoints }: { dataPoints: { x: Date; y: number }[] }) => {
  const [dim] = useDim()

  return (
    <g>
      {dataPoints.map(point => (
        <circle
          cx={dim.axes.x.scale(point.x)}
          cy={dim.axes.y.scale(point.y)}
          r="1"
        />
      ))}
    </g>
  )
}

export default Points
