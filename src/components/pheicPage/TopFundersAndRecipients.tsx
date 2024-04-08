import React from 'react'
import styled, { useTheme } from 'styled-components'

import CMS from 'components/library/airtable-cms'

import {
  ChartColumn,
  ContentBox,
} from 'components/stakeholderPage/StakeholderLayout'

import BarPlot from 'components/plot/BarPlot/BarPlot'
import { BarPlotBars } from 'components/plot/BarPlot/Bars'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'

interface TopFundersAndRecipientsProps {
  startYear: string | undefined
  endYear: string | undefined
  data: Queries.PheicPageQuery
}

const BarLabelLink = styled(Link)`
  text-decoration: none;
  fill: ${({ theme }) => theme.common.colors.textLink};

  &:hover {
    text-decoration: underline;
  }
`

const TopFundersAndRecipients = ({
  startYear,
  endYear,
  data,
}: TopFundersAndRecipientsProps) => {
  const theme = useTheme()

  const topFundersBars = {} as BarPlotBars
  let chartMax = 0
  for (const funder of data.top10Funders.nodes) {
    topFundersBars[funder.name ?? ''] = {
      label: (
        <BarLabelLink
          to={`/${funder.slug}/${simplifyForUrl(funder.name ?? '')}`}
        >
          {funder.name}
        </BarLabelLink>
      ),
      value: Number(funder.total),
    }
    chartMax = Math.max(Number(funder.total), chartMax)
  }

  const topRecipientsBars = {} as BarPlotBars
  for (const funder of data.top10Recipients.nodes) {
    topRecipientsBars[funder.name ?? ''] = {
      label: (
        <BarLabelLink
          to={`/${funder.slug}/${simplifyForUrl(funder.name ?? '')}`}
        >
          {funder.name}
        </BarLabelLink>
      ),
      value: Number(funder.total),
    }
    chartMax = Math.max(Number(funder.total), chartMax)
  }

  return (
    <ChartColumn>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Disbursed" />
            Top 10 funders
          </span>
          <span>
            {startYear} - {endYear}
          </span>
        </h3>
        <BarPlot
          bars={topFundersBars}
          barColor={theme.funder.colors.graphColor}
          max={chartMax}
          xLabel="Funds (USD)"
          yLabel="Funders"
        />
      </ContentBox>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Received" />
            Top 10 recipients
          </span>
          <span>
            {startYear} - {endYear}
          </span>
        </h3>
        <BarPlot
          bars={topRecipientsBars}
          barColor={theme.recipient.colors.graphColor}
          max={chartMax}
          xLabel="Funds (USD)"
          yLabel="Funders"
        />
      </ContentBox>
    </ChartColumn>
  )
}

export default TopFundersAndRecipients
