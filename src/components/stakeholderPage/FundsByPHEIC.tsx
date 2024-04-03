import React from 'react'

import CMS from 'components/library/airtable-cms'

import { ChartColumn, ContentBox, NoData } from './StakeholderLayout'
import BarPlot from 'components/plot/BarPlot/BarPlot'
import { useTheme } from 'styled-components'

const isDisbursed = (
  pheic: any
): pheic is Queries.StakeholderPageQuery['pheic_disbursed']['pheics'][0] =>
  'disbursed' in pheic

const restructurePheics = (
  acc: { [key: string]: number },
  pheic:
    | Queries.StakeholderPageQuery['pheic_disbursed']['pheics'][0]
    | Queries.StakeholderPageQuery['pheic_received']['pheics'][0]
) => {
  const pheicName = pheic.pheic ?? ''
  let value = 0
  if (isDisbursed(pheic)) value = Number(pheic.disbursed ?? 0)
  else value = Number(pheic.received ?? 0)
  if (!acc[pheicName]) acc[pheicName] = value
  else acc[pheicName] += value
  return acc
}

interface FundsByPHEICProps {
  data: {
    pheic_received: Queries.StakeholderPageQuery['pheic_received']
    pheic_disbursed: Queries.StakeholderPageQuery['pheic_disbursed']
    stakeholdersCsv?: Queries.StakeholderPageQuery['stakeholdersCsv']
  }
  selectedYear: string
  selectedYearsLabel: string
}

const FundsByPHEIC = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: FundsByPHEICProps) => {
  if (!data.pheic_received?.pheics || !data.pheic_disbursed?.pheics)
    throw new Error(
      `Data not found for stakeholder ${data.stakeholdersCsv?.name} in pheic_received or pheic_disbursed`
    )

  const theme = useTheme()

  let displayTotals = {
    received: {} as { [key: string]: number },
    disbursed: {} as { [key: string]: number },
  }

  if (selectedYear === 'All time') {
    displayTotals.received = data.pheic_received.pheics.reduce(
      restructurePheics,
      displayTotals.received
    )
    displayTotals.disbursed = data.pheic_disbursed.pheics.reduce(
      restructurePheics,
      displayTotals.disbursed
    )
  } else {
    displayTotals.received = data.pheic_received.pheics
      .filter(pheic => pheic.year === selectedYear)
      .reduce(restructurePheics, displayTotals.received)
    displayTotals.disbursed = data.pheic_disbursed.pheics
      .filter(pheic => pheic.year === selectedYear)
      .reduce(restructurePheics, displayTotals.disbursed)
  }

  const chartMax = Math.max(
    ...Object.values(displayTotals.received),
    ...Object.values(displayTotals.disbursed)
  )

  return (
    <ChartColumn>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Disbursed" />
            Funds disbursed
          </span>
          <span>
            {data.stakeholdersCsv?.name} | {selectedYearsLabel}
          </span>
        </h3>
        {Object.keys(displayTotals.disbursed).length > 0 ? (
          <BarPlot
            bars={displayTotals.disbursed}
            max={chartMax}
            barColor={theme.funder.colors.graphColor}
            xLabel="Funds (USD)"
            yLabel="JEE 1.0 Category"
          />
        ) : (
          <NoData />
        )}
      </ContentBox>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Received" />
            Funds received
          </span>
          <span>
            {data.stakeholdersCsv?.name} | {selectedYearsLabel}
          </span>
        </h3>
        {Object.keys(displayTotals.received).length > 0 ? (
          <BarPlot
            bars={displayTotals.received}
            max={chartMax}
            barColor={theme.recipient.colors.graphColor}
            xLabel="Funds (USD)"
            yLabel="JEE 1.0 Category"
          />
        ) : (
          <NoData />
        )}
      </ContentBox>
    </ChartColumn>
  )
}

export default FundsByPHEIC
