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

  let displayTotals = {
    recipients: [] as { name: string; total: number }[],
    funders: [] as { name: string; total: number }[],
  }

  if (selectedYear === 'All time') {
    displayTotals.recipients = [{ name: 'sum', total: 100 }]
  } else {
    displayTotals.funders = data.top10FundersByYear.funders
      .filter(funder => funder.year === selectedYear)
      .map(funder => ({
        name: funder.name ?? '',
        total: Number(funder.total) ?? 0,
      }))
    displayTotals.recipients = data.top10RecipientsByYear.recipients
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
        <table>
          <tbody>
            {displayTotals.recipients.map((funder, i) => (
              <tr key={i}>
                <td>{funder.name}</td>
                <td>{formatDisplayNumber(funder.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentBox>
      <ContentBox>
        <h3>
          <span>Top 10 funders</span>
          <span>{selectedYearsLabel}</span>
        </h3>
        <table>
          <tbody>
            {displayTotals.funders.map((funder, i) => (
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
