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

  let displayTotals = {} as { [key: string]: number }

  if (!data.allFundingByCapacityCsv?.years)
    throw new Error(
      `No years found for country ${data.stakeholdersCsv?.name} in allReceivedAndDisbursedCsv`
    )

  if (selectedYear === 'All time')
    displayTotals = data.allFundingByCapacityCsv.years.reduce(
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
      data.allFundingByCapacityCsv.years.find(
        year => year.year === selectedYear
      ) ?? {}
    ).forEach(([key, val]) => {
      if (key !== 'Year') displayTotals[key] = Number(val)
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
            {Object.entries(displayTotals)
              .filter(([key, val]) => key.includes('_disbursed') && val)
              .sort((a, b) => b[1] - a[1])
              .map(([key, val]) => (
                <tr key={key}>
                  <td>{jeeCategoryNames[key]}</td>
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
            {Object.entries(displayTotals)
              .filter(([key, val]) => key.includes('_received') && val)
              .sort((a, b) => b[1] - a[1])
              .map(([key, val]) => (
                <tr key={key}>
                  <td>{jeeCategoryNames[key]}</td>
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
