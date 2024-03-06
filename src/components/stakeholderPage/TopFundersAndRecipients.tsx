import React from 'react'

import { ContentBox, HorizontalColumns } from './StakeholderLayout'
import formatDisplayNumber from 'utilities/formatDisplayNumber'

interface TopFundersAndRecipientsProps {
  data: Queries.CountryPageQuery
  selectedYear: string
  selectedYearsLabel: string
}

const TopFundersAndRecipients = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: TopFundersAndRecipientsProps) => {
  console.log(data)

  let displayTotals = [] as { name: string; total: number }[]

  if (selectedYear === 'All time') {
    displayTotals = [{ name: 'sum', total: 100 }]
  } else {
    displayTotals = data.top10FundersByYear.funders
      .filter(funder => funder.year === selectedYear)
      .map(funder => ({
        name: funder.name ?? '',
        total: Number(funder.total) ?? 0,
      }))
  }

  return (
    <HorizontalColumns>
      <ContentBox>
        <h3>
          <span>Top 10 recipients</span>
          <span>{selectedYearsLabel}</span>
        </h3>
      </ContentBox>
      <ContentBox>
        <h3>
          <span>Top 10 funders</span>
          <span>{selectedYearsLabel}</span>
        </h3>
        <table>
          <tbody>
            {displayTotals.map((funder, i) => (
              <tr key={i}>
                <td>{funder.name}</td>
                <td>{formatDisplayNumber(funder.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentBox>
    </HorizontalColumns>
  )
}

export default TopFundersAndRecipients
