import { createContext } from 'react'
import type Dim from './DimObjectType'
import { PlotSetup } from './usePlotSetup'

const DimPlotContext = createContext<
  null | [Dim, React.Dispatch<React.SetStateAction<PlotSetup>>]
>(null)

export default DimPlotContext
