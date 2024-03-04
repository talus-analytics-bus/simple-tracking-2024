import * as d3 from 'd3'

import type Dim from './DimObjectType'
import { PlotSetup } from './usePlotSetup'

const calculateDim = (plotSetup: PlotSetup) => {
  const dim = { ...plotSetup }

  dim.padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...dim.padding,
  }

  dim.axes.x = {
    start: dim.padding.left ?? 0,
    end: dim.width - dim.padding.right!,
    length: dim.width - dim.padding.right! - dim.padding.left!,
    min: 0,
    // override with any passed-in keys
    ...dim.axes.x,
  }
  dim.axes.y = {
    start: dim.height - dim.padding.bottom!,
    end: dim.padding.top!,
    length: dim.height - dim.padding.bottom! - dim.padding.top!,
    min: 0,
    // override with any passed-in keys
    ...dim.axes.y,
  }

  // if dim.axes.y2 is defined in setup, copy start/end/length
  // for convenience and consistency
  if (dim.axes.y2 && Object.keys(dim.axes.y2).length !== 0) {
    dim.axes.y2 = {
      ...dim.axes.y,
      min: 0,
      // override with any passed-in keys
      ...dim.axes.y2,
    }
  }

  dim.axes.x.ticks = dim.axes.x.ticks ?? 4

  if (typeof dim.axes.x.min === 'number' && typeof dim.axes.x.max === 'number')
    [dim.axes.x.min, dim.axes.x.max] = d3.nice(
      dim.axes.x.min!,
      dim.axes.x.max,
      dim.axes.x.ticks!
    )

  dim.axes.x.scale =
    // allow scales to be overridden
    dim.axes.x.scale ??
    d3
      .scaleLinear()
      .domain([dim.axes.x.min!, dim.axes.x.max])
      .range([dim.axes.x.start!, dim.axes.x.end!])

  dim.axes.y.ticks = dim.axes.y.ticks ?? 4

  if (typeof dim.axes.y.min === 'number' && typeof dim.axes.y.max === 'number')
    [dim.axes.y.min, dim.axes.y.max] = d3.nice(
      dim.axes.y.min!,
      dim.axes.y.max,
      dim.axes.y.ticks!
    )

  dim.axes.y.scale =
    // allow scales to be overridden
    dim.axes.y.scale ??
    d3
      .scaleLinear()
      .domain([dim.axes.y.min!, dim.axes.y.max])
      .range([dim.axes.y.start!, dim.axes.y.end!])

  if (dim.axes.y2 && Object.keys(dim.axes.y2).length !== 0) {
    dim.axes.y2.scale =
      // allow scales to be overridden
      dim.axes.y2.scale ??
      d3
        .scaleLinear()
        .domain([dim.axes.y2.min!, dim.axes.y2.max])
        .range([dim.axes.y2.start!, dim.axes.y2.end!])
  }

  if (!dim.reference) {
    dim.reference = {}
  }

  return dim as Dim
}

export default calculateDim
