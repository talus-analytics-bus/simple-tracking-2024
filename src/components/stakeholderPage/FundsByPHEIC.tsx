import React from 'react'

import CMS from 'components/library/airtable-cms'

import { ChartColumn, ContentBox, NoData } from './StakeholderLayout'
import BarPlot from 'components/plot/BarPlot/BarPlot'
import styled, { useTheme } from 'styled-components'
import { BarPlotBars } from 'components/plot/BarPlot/Bars'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'
import usePheicNames from 'queryHooks/usePheicNames'

const isDisbursed = (
  pheic: any
): pheic is Queries.StakeholderPageQuery['pheic_disbursed']['pheics'][0] =>
  'disbursed' in pheic

const BarLabelLink = styled(Link)`
  text-decoration: none;
  fill: ${({ theme }) => theme.common.colors.textLink};

  &:hover {
    text-decoration: underline;
  }
`

const getRestructurePheics =
  (pheicNames: Queries.UsePheicNamesQuery['allAirtable']['pheicNames']) =>
  (
    acc: BarPlotBars,
    pheic:
      | Queries.StakeholderPageQuery['pheic_disbursed']['pheics'][0]
      | Queries.StakeholderPageQuery['pheic_received']['pheics'][0]
  ) => {
    const pheicName =
      pheicNames.find(({ data }) => data?.PHEIC_database_name === pheic.pheic)
        ?.data?.PHEIC_name ?? ''

    let value = 0
    if (isDisbursed(pheic)) value = Number(pheic.disbursed ?? 0)
    else value = Number(pheic.received ?? 0)
    if (!acc[pheicName])
      acc[pheicName] = {
        label: (
          <BarLabelLink to={`/pheic/${simplifyForUrl(pheicName)}`}>
            {pheicName}
          </BarLabelLink>
        ),
        value,
      }
    else
      acc[pheicName] = {
        label: (
          <BarLabelLink to={`/pheic/${simplifyForUrl(pheicName)}`}>
            {pheicName}
          </BarLabelLink>
        ),
        value: value + acc[pheicName].value,
      }
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

  const pheicNames = usePheicNames()
  const theme = useTheme()

  let displayTotals = {
    received: {} as BarPlotBars,
    disbursed: {} as BarPlotBars,
  }

  if (selectedYear === 'All time') {
    displayTotals.received = data.pheic_received.pheics.reduce(
      getRestructurePheics(pheicNames),
      displayTotals.received
    )
    displayTotals.disbursed = data.pheic_disbursed.pheics.reduce(
      getRestructurePheics(pheicNames),
      displayTotals.disbursed
    )
  } else {
    displayTotals.received = data.pheic_received.pheics
      .filter(pheic => pheic.year === selectedYear)
      .reduce(getRestructurePheics(pheicNames), displayTotals.received)
    displayTotals.disbursed = data.pheic_disbursed.pheics
      .filter(pheic => pheic.year === selectedYear)
      .reduce(getRestructurePheics(pheicNames), displayTotals.disbursed)
  }

  const chartMax = Math.max(
    ...Object.values(displayTotals.received).map(bar => bar.value),
    ...Object.values(displayTotals.disbursed).map(bar => bar.value)
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
            {data.stakeholdersCsv?.name ?? 'Global'} | {selectedYearsLabel}
          </span>
        </h3>
        {Object.keys(displayTotals.disbursed).length > 0 ? (
          <BarPlot
            bars={displayTotals.disbursed}
            max={chartMax}
            barColor={theme.funder.colors.graphColor}
            xLabel="Funds (USD)"
            yLabel="PHEIC name"
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
            {data.stakeholdersCsv?.name ?? 'Global'} | {selectedYearsLabel}
          </span>
        </h3>
        {Object.keys(displayTotals.received).length > 0 ? (
          <BarPlot
            bars={displayTotals.received}
            max={chartMax}
            barColor={theme.recipient.colors.graphColor}
            xLabel="Funds (USD)"
            yLabel="PHEIC name"
          />
        ) : (
          <NoData />
        )}
      </ContentBox>
    </ChartColumn>
  )
}

export default FundsByPHEIC
