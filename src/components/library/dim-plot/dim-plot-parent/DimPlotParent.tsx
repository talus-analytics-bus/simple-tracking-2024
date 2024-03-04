import React from 'react'

// import * as d3 from 'd3'

import DimPlotContext from './DimPlotContext'
import calculateDim from './calculateDim'
import { PlotSetup } from './usePlotSetup'

export interface DimPlotParentProps
  extends React.ComponentPropsWithoutRef<'svg'> {
  drawLayout?: boolean
  children: React.ReactNode
  plotSetup: [PlotSetup, React.Dispatch<React.SetStateAction<PlotSetup>>]
}

const DimPlotParent = ({
  plotSetup,
  drawLayout = false,
  children,
  ...svgProps
}: DimPlotParentProps) => {
  const [setup, setPlotSetup] = plotSetup

  if (!setup || Object.keys(setup).length === 0)
    throw new Error(`plotSetup object is undefined or empty.`)

  if (!setup.height || !setup.width)
    throw new Error(`plotSetup is missing width or height.`)

  // removing error; allowing padding to
  // be blank and default to zero.
  // if (
  //   !setup.padding ||
  //   !setup.padding.right ||
  //   !setup.padding.bottom ||
  //   !setup.padding.left ||
  //   !setup.padding.right
  // )
  //   throw new Error(`Missing padding dimensions in plotSetup.`)

  const dim = calculateDim(setup)

  const xTicks = dim.axes.x.scale.ticks(dim.axes.x.ticks)
  const yTicks = dim.axes.y.scale.ticks(dim.axes.y.ticks)

  return (
    <DimPlotContext.Provider value={[dim, setPlotSetup]}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dim.width} ${dim.height}`}
        {...svgProps}
      >
        {children}
        {drawLayout && (
          <g id="dimPlotLayout">
            {xTicks.map((tick, index) => (
              <React.Fragment key={tick}>
                <line
                  x1={dim.axes.x.scale(tick)}
                  y1={0}
                  x2={dim.axes.x.scale(tick)}
                  y2={dim.height}
                  stroke={
                    [0, xTicks.length - 1].includes(index)
                      ? 'blue'
                      : 'lightblue'
                  }
                  strokeDasharray="4"
                />
              </React.Fragment>
            ))}
            {yTicks.map((tick, index) => (
              <React.Fragment key={tick}>
                <line
                  x1={0}
                  y1={dim.axes.y.scale(tick)}
                  x2={dim.width}
                  y2={dim.axes.y.scale(tick)}
                  stroke={
                    [0, yTicks.length - 1].includes(index)
                      ? 'green'
                      : 'lightgreen'
                  }
                  strokeDasharray="4"
                />
              </React.Fragment>
            ))}
            <rect
              stroke="red"
              fill="none"
              strokeWidth={1}
              x={1}
              y={1}
              width={dim.width - 2}
              height={dim.height - 2}
            />
          </g>
        )}
      </svg>
    </DimPlotContext.Provider>
  )
}

export default DimPlotParent
