import React from 'react'
import styled from 'styled-components'
import { ContentBox } from '../StakeholderLayout'
import CMS from 'components/library/airtable-cms'

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
  return (
    <ChartColumn>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Disbursed" />
            Funds disbursed
          </span>
          <span>Global | {selectedYearsLabel}</span>
        </h3>
      </ContentBox>
      <ContentBox>
        <h3>
          <span>
            <CMS.Icon name="Received" />
            Funds received
          </span>
          <span>Global | {selectedYearsLabel}</span>
        </h3>
      </ContentBox>
    </ChartColumn>
  )
}

export default FundsByCategory
