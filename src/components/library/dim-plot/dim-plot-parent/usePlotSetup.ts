import { useState } from 'react'

export interface PlotSetup {
  height: number
  width: number
  padding?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  axes: {
    x: {
      min?: number | Date
      max: number | Date
      start?: number
      end?: number
      length?: number
      scale?: d3.ScaleLinear<number, number>
    }
    y: {
      min?: number
      max: number
      start?: number
      end?: number
      length?: number
      scale?: d3.ScaleLinear<number, number>
    }
    y2?: {
      min?: number
      max: number
      start?: number
      end?: number
      length?: number
      scale?: d3.ScaleLinear<number, number>
    }
  }
}

// Plot Setup state is in a custom hook
// for cleanliness but also because we
// may need to add a little more logic
// and error handling here in the future.

const usePlotSetup = (setup: PlotSetup) => useState(setup)

export default usePlotSetup
