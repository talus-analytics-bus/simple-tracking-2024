import React from 'react'
import CMS from 'components/library/airtable-cms'

import { ContentBox, HorizontalColumns, TotalsTable } from './StakeholderLayout'

import formatDisplayNumber from 'utilities/formatDisplayNumber'

interface FundingTotalsProps {
  data: {
    allReceivedAndDisbursedCsv: Queries.StakeholderPageQuery['allReceivedAndDisbursedCsv']
    stakeholdersCsv?: Queries.StakeholderPageQuery['stakeholdersCsv']
  }
  selectedYear: string
  selectedYearsLabel: string
}

const FundingTotals = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: FundingTotalsProps) => {
  let displayTotals = {} as { [key: string]: number }

  if (!data.allReceivedAndDisbursedCsv?.years)
    throw new Error(
      `No years found for stakeholder ${data.stakeholdersCsv?.name} in allReceivedAndDisbursedCsv`
    )

  if (selectedYear === 'All time')
    displayTotals = data.allReceivedAndDisbursedCsv.years.reduce(
      (acc, year) => {
        Object.entries(year).forEach(([key, val]) => {
          if (key !== 'year')
            if (!acc[key]) acc[key] = Number(val)
            else acc[key] += Number(val)
        })
        return acc
      },
      {} as typeof displayTotals
    )
  else
    Object.entries(
      data.allReceivedAndDisbursedCsv.years.find(
        year => year.year === selectedYear
      ) ?? {}
    ).forEach(([key, val]) => {
      if (key !== 'year') displayTotals[key] = Number(val)
    })

  return (
    <HorizontalColumns>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Disbursed" style={{ height: 25 }} />
            Funds disbursed
          </span>
          <span>{selectedYearsLabel}</span>
        </h3>
        <TotalsTable>
          <tbody>
            <tr>
              <td>{formatDisplayNumber(displayTotals.totalDisbursed)}</td>
              <td>Total funds (USD)</td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalCapacityDisbursed)}
              </td>
              <td>
                Capacity-building funds, including JEE core capacities (USD)
              </td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalResponseDisbursed)}
              </td>
              <td>PHEIC funds (USD)</td>
            </tr>
          </tbody>
        </TotalsTable>
      </ContentBox>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Received" style={{ height: 25 }} />
            Funds received
          </span>
          <span>{selectedYearsLabel}</span>
        </h3>
        <TotalsTable>
          <tbody>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalDisbursedReceived)}
              </td>
              <td>Total funds (USD)</td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalCapacityReceived)}
              </td>
              <td>
                Capacity-building funds, including JEE core capacities (USD)
              </td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalResponseReceived)}
              </td>
              <td>PHEIC funds (USD)</td>
            </tr>
          </tbody>
        </TotalsTable>
      </ContentBox>
    </HorizontalColumns>
  )
}

export default FundingTotals
