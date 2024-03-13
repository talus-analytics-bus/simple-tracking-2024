import React from 'react'

import { ContentBox, HorizontalColumns, NoData } from './StakeholderLayout'
import formatDisplayNumber from 'utilities/formatDisplayNumber'
import styled, { useTheme } from 'styled-components'

interface TopFundersAndRecipientsProps {
  data: Queries.CountryPageQuery
  selectedYear: string
  selectedYearsLabel: string
}

const Table = styled.table`
  border-collapse: collapse;

  margin: 0px -25px -25px -25px;
  width: calc(100% + 50px);

  ${({ theme }) => theme.textStyleSmallNumbers};

  tbody tr {
    background-color: ${({ theme }) => theme.common.colors.surfaceWhite};
    border: 1px solid ${({ theme }) => theme.common.colors.surfaceGray100};
  }
  td {
    padding: 10px 15px;
    text-align: left;
  }
  td:nth-child(2) {
    text-align: right;
  }
`

const TopFundersAndRecipients = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: TopFundersAndRecipientsProps) => {
  const theme = useTheme()

  let displayTotals = {
    recipients: [] as { name: string; total: number }[],
    funders: [] as { name: string; total: number }[],
  }

  if (selectedYear === 'All time') {
    const totalsByFunder = {
      recipients: {} as { [key: string]: number },
      funders: {} as { [key: string]: number },
    }

    totalsByFunder.recipients = data.top10RecipientsByYear.recipients.reduce(
      (acc, recipient) => {
        if (!acc[recipient.name ?? ''])
          acc[recipient.name ?? ''] = Number(recipient.total)
        else acc[recipient.name ?? ''] += Number(recipient.total)
        return acc
      },
      {} as typeof totalsByFunder.recipients
    )

    totalsByFunder.funders = data.top10FundersByYear.funders.reduce(
      (acc, recipient) => {
        if (!acc[recipient.name ?? ''])
          acc[recipient.name ?? ''] = Number(recipient.total)
        else acc[recipient.name ?? ''] += Number(recipient.total)
        return acc
      },
      {} as typeof totalsByFunder.funders
    )

    displayTotals.funders = Object.entries(totalsByFunder.funders)
      .sort((a, b) => b[1] - a[1])
      .map(([name, total]) => ({
        name,
        total,
      }))
      .slice(0, 10)

    displayTotals.recipients = Object.entries(totalsByFunder.recipients)
      .sort((a, b) => b[1] - a[1])
      .map(([name, total]) => ({
        name,
        total,
      }))
      .slice(0, 10)
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
      <ContentBox style={{ background: theme.common.colors.surfaceWhite }}>
        <h3>
          <span>Top 10 recipients</span>
          <span>{selectedYearsLabel}</span>
        </h3>
        {displayTotals.recipients.length !== 0 ? (
          <Table>
            <tbody>
              {displayTotals.recipients.map((funder, i) => (
                <tr key={i}>
                  <td>{funder.name}</td>
                  <td>{formatDisplayNumber(funder.total)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoData />
        )}
      </ContentBox>
      <ContentBox style={{ background: theme.common.colors.surfaceWhite }}>
        <h3>
          <span>Top 10 funders</span>
          <span>{selectedYearsLabel}</span>
        </h3>
        {displayTotals.recipients.length !== 0 ? (
          <Table>
            <tbody>
              {displayTotals.funders.map((funder, i) => (
                <tr key={i}>
                  <td>{funder.name}</td>
                  <td>{formatDisplayNumber(funder.total)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoData />
        )}
      </ContentBox>
    </HorizontalColumns>
  )
}

export default TopFundersAndRecipients
