import React from 'react'
import { useTheme } from 'styled-components'

import CMS from 'components/library/airtable-cms'

import { ChartColumn, ContentBox, NoData } from '../StakeholderLayout'
import BarPlot from 'components/plot/BarPlot/BarPlot'

import jeeCategoryNames from 'utilities/jeeCategoryNames'

interface FundsByCategoryProps {
  data: Queries.CountryPageQuery
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
      `No years found for country ${data.stakeholdersCsv?.name} in allReceivedAndDisbursedCsv`
    )

  const theme = useTheme()

  let displayTotals = {
    received: {} as { [key: string]: number },
    disbursed: {} as { [key: string]: number },
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
            acc[direction][prettyKey] = Number(val)
          else acc[direction][prettyKey] += Number(val)
          chartMax = Math.max(chartMax, acc[direction][prettyKey])
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
      if (key !== 'Year' && val) {
        const direction = key.includes('_disbursed') ? 'disbursed' : 'received'
        const prettyKey = jeeCategoryNames[key]
        displayTotals[direction][prettyKey] = Number(val)
        chartMax = Math.max(chartMax, displayTotals[direction][prettyKey])
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
            {data.stakeholdersCsv?.name} | {selectedYearsLabel}
          </span>
        </h3>
        {Object.keys(displayTotals.disbursed).length > 0 ? (
          <BarPlot
            bars={displayTotals.disbursed}
            max={chartMax}
            barColor={theme.funder.colors.graphViz1}
            xLabel="Funds (USD)"
            yLabel="JEE 1.0 Category"
          />
        ) : (
          <NoData>No data available</NoData>
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
        <BarPlot
          bars={displayTotals.received}
          max={chartMax}
          barColor={theme.recipient.colors.graphViz1}
          xLabel="Funds (USD)"
          yLabel="JEE 1.0 Category"
        />
      </ContentBox>
    </ChartColumn>
  )
}

export default FundsByCategory
