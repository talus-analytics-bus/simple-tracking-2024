import React from 'react'

import { ContentBox, HorizontalColumns, NoData } from './StakeholderLayout'
import formatDisplayNumber from 'utilities/formatDisplayNumber'
import styled, { useTheme } from 'styled-components'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'

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

    a {
      color: ${({ theme }) => theme.common.colors.textLink};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  td:nth-child(2) {
    text-align: right;
  }
`

interface TopFundersAndRecipientsProps {
  data: {
    top10RecipientsByYear: Queries.StakeholderPageQuery['top10RecipientsByYear']
    top10FundersByYear: Queries.StakeholderPageQuery['top10FundersByYear']
  }
  selectedYear: string
  selectedYearsLabel: string
}

const TopFundersAndRecipients = ({
  data,
  selectedYear,
  selectedYearsLabel,
}: TopFundersAndRecipientsProps) => {
  const theme = useTheme()

  let displayTotals = {
    recipients: [] as { name: string; total: number; slug: string }[],
    funders: [] as { name: string; total: number; slug: string }[],
  }

  if (selectedYear === 'All time') {
    const totalsByFunder = {
      recipients: {} as {
        [key: string]: {
          value: number
          slug: string
        }
      },
      funders: {} as {
        [key: string]: {
          value: number
          slug: string
        }
      },
    }

    totalsByFunder.recipients = data.top10RecipientsByYear.recipients.reduce(
      (acc, recipient) => {
        if (!acc[recipient.name ?? ''])
          acc[recipient.name ?? ''] = {
            value: Number(recipient.total),
            slug: recipient.slug ?? '',
          }
        else
          acc[recipient.name ?? ''] = {
            value: Number(recipient.total) + acc[recipient.name ?? ''].value,
            slug: recipient.slug ?? '',
          }
        return acc
      },
      {} as typeof totalsByFunder.recipients
    )

    totalsByFunder.funders = data.top10FundersByYear.funders.reduce(
      (acc, recipient) => {
        if (!acc[recipient.name ?? ''])
          acc[recipient.name ?? ''] = {
            value: Number(recipient.total),
            slug: recipient.slug ?? '',
          }
        else
          acc[recipient.name ?? ''] = {
            value: Number(recipient.total) + acc[recipient.name ?? ''].value,
            slug: recipient.slug ?? '',
          }
        return acc
      },
      {} as typeof totalsByFunder.funders
    )

    displayTotals.funders = Object.entries(totalsByFunder.funders)
      .sort((a, b) => b[1].value - a[1].value)
      .map(([name, { value, slug }]) => ({
        name,
        total: value,
        slug,
      }))
      .slice(0, 10)

    displayTotals.recipients = Object.entries(totalsByFunder.recipients)
      .sort((a, b) => b[1].value - a[1].value)
      .map(([name, { value, slug }]) => ({
        name,
        total: value,
        slug,
      }))
      .slice(0, 10)
  } else {
    displayTotals.funders = data.top10FundersByYear.funders
      .filter(funder => funder.year === selectedYear)
      .map(funder => ({
        name: funder.name ?? '',
        total: Number(funder.total) ?? 0,
        slug: funder.slug ?? '',
      }))
    displayTotals.recipients = data.top10RecipientsByYear.recipients
      .filter(funder => funder.year === selectedYear)
      .map(funder => ({
        name: funder.name ?? '',
        total: Number(funder.total) ?? 0,
        slug: funder.slug ?? '',
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
                  <td>
                    <Link to={`/${funder.slug}/${simplifyForUrl(funder.name)}`}>
                      {funder.name}
                    </Link>
                  </td>
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
        {displayTotals.funders.length !== 0 ? (
          <Table>
            <tbody>
              {displayTotals.funders.map((funder, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/${funder.slug}/${simplifyForUrl(funder.name)}`}>
                      {funder.name}
                    </Link>
                  </td>
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
