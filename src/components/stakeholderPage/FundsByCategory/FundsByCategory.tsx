import React from 'react'
import { useTheme } from 'styled-components'

import CMS from 'components/library/airtable-cms'

import { ChartColumn, ContentBox, NoData } from '../StakeholderLayout'
import BarPlot from 'components/plot/BarPlot/BarPlot'

import jeeCategoryNames from 'utilities/jeeCategoryNames'
import { BarPlotBars } from 'components/plot/BarPlot/Bars'

interface FundsByCategoryProps {
  data: {
    allFundingByCapacityCsv: Queries.StakeholderPageQuery['allFundingByCapacityCsv']
    stakeholdersCsv?: Queries.StakeholderPageQuery['stakeholdersCsv']
  }
  selectedYear: string
  selectedYearsLabel: string
}

const FundsByCategory = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: FundsByCategoryProps) => {
  if (!data.allFundingByCapacityCsv?.years)
    throw new Error(
      `No years found for stakeholder ${data.stakeholdersCsv?.name} in allReceivedAndDisbursedCsv`
    )

  const theme = useTheme()

  let displayTotals = {
    received: {} as BarPlotBars,
    disbursed: {} as BarPlotBars,
  }

  let chartMax = 0

  if (selectedYear === 'All time')
    displayTotals = data.allFundingByCapacityCsv.years.reduce((acc, year) => {
      Object.entries(year).forEach(([key, val]) => {
        if (key !== 'year' && val) {
          const prettyKey = jeeCategoryNames[key]
          const direction = key.includes('_disbursed')
            ? 'disbursed'
            : 'received'
          if (!acc[direction][prettyKey])
            acc[direction][prettyKey] = {
              label: prettyKey,
              value: Number(val),
            }
          else
            acc[direction][prettyKey] = {
              label: prettyKey,
              value: Number(val) + acc[direction][prettyKey].value,
            }
          chartMax = Math.max(chartMax, acc[direction][prettyKey].value)
        }
      })
      return acc
    }, displayTotals)
  else
    Object.entries(
      data.allFundingByCapacityCsv.years.find(
        year => year.year === selectedYear
      ) ?? {}
    ).forEach(([key, val]) => {
      if (key !== 'year' && val) {
        const direction = key.includes('_disbursed') ? 'disbursed' : 'received'
        const prettyKey = jeeCategoryNames[key]
        displayTotals[direction][prettyKey] = {
          label: prettyKey,
          value: Number(val),
        }
        chartMax = Math.max(chartMax, displayTotals[direction][prettyKey].value)
      }
    })

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
            {data.stakeholdersCsv?.name ?? 'Global'} | {selectedYearsLabel}
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

export default FundsByCategory
