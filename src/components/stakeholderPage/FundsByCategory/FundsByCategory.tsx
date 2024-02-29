import React from 'react'
import styled from 'styled-components'
import { ContentBox } from '../StakeholderLayout'
import CMS from 'components/library/airtable-cms'
import jeeCategoryNames from 'utilities/jeeCategoryNames'

interface FundsByCategoryProps {
  data: Queries.CountryPageQuery
  selectedYear: string
  selectedYearsLabel: string
}

const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const FundsByCategory = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: FundsByCategoryProps) => {
  console.log(data)

  let displayTotals = {
    received: {} as { [key: string]: number },
    disbursed: {} as { [key: string]: number },
  }

  if (!data.allFundingByCapacityCsv?.years)
    throw new Error(
      `No years found for country ${data.stakeholdersCsv?.name} in allReceivedAndDisbursedCsv`
    )

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
        displayTotals[direction][jeeCategoryNames[key]] = Number(val)
      }
    })

  console.log(displayTotals)

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
        <table>
          <tbody>
            {Object.entries(displayTotals.disbursed)
              .sort((a, b) => b[1] - a[1])
              .map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>${val.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
        <table>
          <tbody>
            {Object.entries(displayTotals.received)
              .sort((a, b) => b[1] - a[1])
              .map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>${val.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </ContentBox>
    </ChartColumn>
  )
}

export default FundsByCategory
