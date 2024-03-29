import useRiskIndicies from 'queryHooks/useRiskIndicies'
import React from 'react'
import { ContentBox, HorizontalColumns } from './StakeholderLayout'
import styled from 'styled-components'
import RiskIndiciesPlot from 'components/plot/RiskIndiciesPlot/RiskIndiciesPlot'

const HalfWidthContentBox = styled(ContentBox)`
  flex-basis: calc(50% - 15px);

  @media (max-width: 1200px) {
    flex-basis: 100%;
  }
`

interface RiskIndiciesProps {
  data: Queries.StakeholderPageQuery
}

const RiskIndicies = ({ data }: RiskIndiciesProps) => {
  const riskIndicies = useRiskIndicies()

  return (
    <HorizontalColumns style={{ flexWrap: 'wrap' }}>
      <HalfWidthContentBox>
        <h3>GHS Index</h3>
        <RiskIndiciesPlot
          data={riskIndicies.ghsi.data}
          highlight={data.ghsi}
          min={0}
          max={100}
        />
      </HalfWidthContentBox>
      <HalfWidthContentBox>
        <h3>Infectious Disease Vulnerability Index</h3>
        <RiskIndiciesPlot
          data={riskIndicies.idvi.data}
          highlight={data.idvi}
          min={0}
          max={1}
        />
      </HalfWidthContentBox>
      <HalfWidthContentBox>
        <h3>Inform Risk Index</h3>
        <RiskIndiciesPlot
          data={riskIndicies.inform.data}
          highlight={data.inform}
          min={10}
          max={0}
        />
      </HalfWidthContentBox>
      <HalfWidthContentBox>
        <h3>World Risk Index</h3>
        <RiskIndiciesPlot
          data={riskIndicies.wri.data}
          highlight={data.wri}
          min={50}
          max={0}
        />
      </HalfWidthContentBox>
    </HorizontalColumns>
  )
}

export default RiskIndicies
