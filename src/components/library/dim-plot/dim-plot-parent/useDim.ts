import { useContext } from 'react'
import DimPlotContext from './DimPlotContext'

const useDim = () => {
  const dim = useContext(DimPlotContext)

  if (!dim)
    throw new Error(
      'PlotDim context not found; ' +
        'are all the plot components wrapped ' +
        'in a <DimPlotParent/> component?'
    )

  return dim
}

export default useDim
