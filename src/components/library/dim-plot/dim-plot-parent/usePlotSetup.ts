import { SetStateAction } from 'react'
import { ScaleLinear } from 'd3-scale'

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
      ticks?: number
      start?: number
      end?: number
      length?: number
      scale?: ScaleLinear<number, number>
    }
    y: {
      min?: number
      max: number
      ticks?: number
      start?: number
      end?: number
      length?: number
      scale?: ScaleLinear<number, number>
    }
    y2?: {
      min?: number
      max: number
      start?: number
      end?: number
      length?: number
      scale?: ScaleLinear<number, number>
    }
  }
  reference?: {
    [key: string]: number
  }
}

// Plot Setup state is in a custom hook
// for cleanliness but also because we
// may need to add a little more logic
// and error handling here in the future.

const mockSetState = () => {}

const usePlotSetup = (setup: PlotSetup) =>
  [setup, mockSetState] as [
    PlotSetup,
    React.Dispatch<SetStateAction<PlotSetup>>,
  ]
// useState(setup)

export default usePlotSetup
