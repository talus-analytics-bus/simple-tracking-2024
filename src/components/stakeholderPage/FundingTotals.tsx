import React from 'react'
import styled from 'styled-components'
import CMS from 'components/library/airtable-cms'

import { ContentBox } from './StakeholderLayout'

import formatDisplayNumber from 'utilities/formatDisplayNumber'

interface FundingTotalsProps {
  data: Queries.CountryPageQuery
  selectedYear: string
  selectedYearsLabel: string
}

const FundingColumns = styled.section`
  display: flex;
  gap: 15px;
`

const FundingTotals = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: FundingTotalsProps) => {
  let displayTotals = {} as { [key: string]: number }

  if (!data.allReceivedAndDisbursedCsv?.years)
    throw new Error(
      `No years found for country ${data.stakeholdersCsv?.name} in allReceivedAndDisbursedCsv`
    )

  if (selectedYear === 'All time')
    displayTotals = data.allReceivedAndDisbursedCsv.years.reduce(
      (acc, year) => {
        Object.entries(year).forEach(([key, val]) => {
          if (key !== 'Year')
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
        year => year.Year === selectedYear
      ) ?? {}
    ).forEach(([key, val]) => {
      if (key !== 'Year') displayTotals[key] = Number(val)
    })

  return (
    <FundingColumns>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Disbursed" style={{ height: 25 }} />
            Funds disbursed
          </span>
          <span>{selectedYearsLabel}</span>
        </h3>
        <table>
          <tbody>
            <tr>
              <td>{formatDisplayNumber(displayTotals.totalDisbursed)}</td>
              <td>Total funding (USD)</td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalCapacityDisbursed)}
              </td>
              <td>Non-PHEIC capacity building funding (USD)</td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalResponseDisbursed)}
              </td>
              <td>PHEIC funding (USD)</td>
            </tr>
          </tbody>
        </table>
      </ContentBox>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Received" style={{ height: 25 }} />
            Funds received
          </span>
          <span>{selectedYearsLabel}</span>
        </h3>
        <table>
          <tbody>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalDisbursedReceived)}
              </td>
              <td>Total funding (USD)</td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalCapacityReceived)}
              </td>
              <td>Non-PHEIC capacity building funding (USD)</td>
            </tr>
            <tr>
              <td>
                {formatDisplayNumber(displayTotals.totalResponseReceived)}
              </td>
              <td>PHEIC funding (USD)</td>
            </tr>
          </tbody>
        </table>
      </ContentBox>
    </FundingColumns>
  )
}

export default FundingTotals
