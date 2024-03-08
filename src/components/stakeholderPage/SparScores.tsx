import React from 'react'
import styled, { useTheme } from 'styled-components'
import { ContentBox, HorizontalColumns, NoData } from './StakeholderLayout'

interface SparScoresProps {
  data: Queries.CountryPageQuery
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
  td:first-child {
    color: ${({ theme }) => theme.common.colors.textSecondary};
  }
  td:nth-child(2) {
    text-align: right;
  }
  td:nth-child(3) {
    text-align: center;
  }
`

type SparMeaning =
  | 'Demonstrated capacity'
  | 'Limited capacity'
  | 'No capacity'
  | 'No data'

const SparMeaningChip = styled.div<{ meaning: SparMeaning }>`
  border-radius: 5px;
  width: 210px;
  color: ${({ theme }) => theme.common.colors.textInvert};
  padding: 5px 10px;
  background-color: ${({ theme, meaning }) =>
    ({
      'Demonstrated capacity': theme.recipient.colors.scoringGood,
      'Limited capacity': theme.recipient.colors.scoringOk,
      'No capacity': theme.recipient.colors.scoringBad,
      'No data': theme.recipient.colors.scoringNoData,
    })[meaning]};
`

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

const SparScores = ({ data }: SparScoresProps) => {
  console.log(data)

  const theme = useTheme()

  const sparScoreColumns = (
    data.allSparScores2022Csv.nodes as Writeable<
      typeof data.allSparScores2022Csv.nodes
    >
  ).sort(
    (a, b) => Number(a.metric?.split('.')[1]) - Number(b.metric?.split('.')[1])
  )

  return (
    <HorizontalColumns>
      <ContentBox style={{ background: theme.common.colors.surfaceWhite }}>
        <h3>SPAR</h3>
        {sparScoreColumns.length !== 0 ? (
          <Table>
            <tbody>
              {sparScoreColumns
                .slice(0, sparScoreColumns.length / 2)
                .map(column => (
                  <tr key={column.metric}>
                    <td>{column.metric}</td>
                    <td>{column.metric_name}</td>
                    <td>
                      <SparMeaningChip
                        meaning={(column.meaning ?? 'No data') as SparMeaning}
                      >
                        {column.meaning}
                      </SparMeaningChip>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <NoData />
        )}
      </ContentBox>
      <ContentBox style={{ background: theme.common.colors.surfaceWhite }}>
        <h3>SPAR</h3>
        {sparScoreColumns.length !== 0 ? (
          <Table>
            <tbody>
              {sparScoreColumns
                .slice(sparScoreColumns.length / 2, sparScoreColumns.length)
                .map(column => (
                  <tr key={column.metric}>
                    <td>{column.metric}</td>
                    <td>{column.metric_name}</td>
                    <td>
                      <SparMeaningChip
                        meaning={(column.meaning ?? 'No data') as SparMeaning}
                      >
                        {column.meaning}
                      </SparMeaningChip>
                    </td>
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

export default SparScores
