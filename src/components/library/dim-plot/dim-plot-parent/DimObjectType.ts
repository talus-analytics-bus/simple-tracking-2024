import * as d3 from 'd3'

interface Dim {
  height: number
  width: number
  padding: {
    top: number
    right: number
    bottom: number
    left: number
  }
  axes: {
    x: {
      min: number | Date
      max: number | Date
      start: number
      end: number
      length: number
      scale: d3.ScaleLinear<number | Date, number>
    }
    y: {
      min: number
      max: number
      start: number
      end: number
      length: number
      scale: d3.ScaleLinear<number, number>
    }
    y2?: {
      min: number
      max: number
      start: number
      end: number
      length: number
      scale: d3.ScaleLinear<number, number>
    }
  }
  reference: {
    [key: string]: number
  }
}

export default Dim
