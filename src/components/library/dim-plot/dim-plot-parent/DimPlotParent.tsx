import React from 'react'

// import * as d3 from 'd3'

import DimPlotContext from './DimPlotContext'
import calculateDim from './calculateDim'
import { PlotSetup } from './usePlotSetup'

export interface DimPlotParentProps
  extends React.ComponentPropsWithoutRef<'svg'> {
  children: React.ReactNode
  plotSetup: [PlotSetup, React.Dispatch<React.SetStateAction<PlotSetup>>]
}

const DimPlotParent = ({
  plotSetup,
  children,
  ...svgProps
}: DimPlotParentProps) => {
  console.log('dimplotparent runs')

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

  return (
    <DimPlotContext.Provider value={[dim, setPlotSetup]}>
      <svg viewBox={`0 0 ${dim.width} ${dim.height}`} {...svgProps}>
        {children}
      </svg>
    </DimPlotContext.Provider>
  )
}

export default DimPlotParent
