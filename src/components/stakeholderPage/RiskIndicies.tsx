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
  iso3: string
}

const RiskIndicies = ({ iso3 }: RiskIndiciesProps) => {
  const riskIndicies = useRiskIndicies()
  console.log(iso3)
  console.log(riskIndicies)

  return (
    <HorizontalColumns style={{ flexWrap: 'wrap' }}>
      <HalfWidthContentBox>
        <h3>GHS Index</h3>
        <RiskIndiciesPlot
          iso3={iso3}
          data={riskIndicies.ghsi.data}
          min={0}
          max={100}
        />
      </HalfWidthContentBox>
      <HalfWidthContentBox>
        <h3>Infectious Disease Vulnerability Index</h3>
        <RiskIndiciesPlot
          iso3={iso3}
          data={riskIndicies.idvi.data}
          min={0}
          max={1}
        />
      </HalfWidthContentBox>
      <HalfWidthContentBox>
        <h3>Inform Risk Index</h3>
        <RiskIndiciesPlot
          iso3={iso3}
          data={riskIndicies.inform.data}
          min={10}
          max={0}
        />
      </HalfWidthContentBox>
      <HalfWidthContentBox>
        <h3>World Risk Index</h3>
        <RiskIndiciesPlot
          iso3={iso3}
          data={riskIndicies.wri.data}
          min={50}
          max={0}
        />
      </HalfWidthContentBox>
    </HorizontalColumns>
  )
}

export default RiskIndicies
