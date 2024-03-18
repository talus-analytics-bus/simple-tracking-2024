import React from 'react'

import styled from 'styled-components'
import { ContentBox, HorizontalColumns } from './StakeholderLayout'

interface JeeScoresProps {
  data: Queries.CountryPageQuery
}

const HalfWidthContentBox = styled(ContentBox)`
  flex-basis: calc(50% - 15px);
  background-color: ${({ theme }) => theme.common.colors.surfaceWhite};

  @media (max-width: 1200px) {
    flex-basis: 100%;
  }
`

const Table = styled.table`
  border-collapse: collapse;

  margin: 0px -25px -25px -25px;
  width: calc(100% + 50px);

  ${({ theme }) => theme.textStyleSmallNumbers};

  tbody tr {
    background-color: ${({ theme }) => theme.common.colors.surfaceWhite};
    border: 1px solid ${({ theme }) => theme.common.colors.surfaceGray100};

    @media (max-width: 600px) {
      display: grid;
      grid-template-columns: min-content 1fr;
      grid-template-areas:
        'metric metric_name'
        'meaning meaning';
    }
  }
  td {
    padding: 10px 15px;
    text-align: left;
  }
  td:first-child {
    grid-area: metric;
    color: ${({ theme }) => theme.common.colors.textSecondary};
  }
  td:nth-child(2) {
    grid-area: metric_name;
    text-align: right;
  }
  td:nth-child(3) {
    grid-area: meaning;
    text-align: center;

    width: 230px;

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`

type JEECapacity =
  | 'Demonstrated capacity'
  | 'Limited capacity'
  | 'No capacity'
  | 'No data'

const JEEMeaningChip = styled.div<{ meaning: JEECapacity }>`
  border-radius: 5px;
  width: 100%;
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

const JeeScores = ({ data }: JeeScoresProps) => {
  const scoresByCategory = {
    Prevent: [],
    Detect: [],
    Respond: [],
    'Other Hazards': [],
  } as {
    [key: string]: Writeable<typeof data.allJeeScoresCsv.nodes>
  }

  for (const node of data.allJeeScoresCsv.nodes) {
    const category = node.capacity_category ?? ''
    if (!scoresByCategory[category]) scoresByCategory[category] = [node]
    else scoresByCategory[category].push(node)
  }

  for (const category in scoresByCategory) {
    scoresByCategory[category] = scoresByCategory[category].sort(
      (a, b) =>
        Number(a.metric?.split('.')[1]) - Number(b.metric?.split('.')[1])
    )
  }

  console.log(scoresByCategory)

  return (
    <HorizontalColumns style={{ flexWrap: 'wrap' }}>
      {Object.entries(scoresByCategory).map(([category, scores]) => (
        <HalfWidthContentBox>
          <h3>{category}</h3>
          <Table>
            <tbody>
              {scores.map(score => (
                <tr key={score.metric_name}>
                  <td>{score.metric}</td>
                  <td>{score.metric_name}</td>
                  <td>
                    <JEEMeaningChip
                      meaning={(score.meaning ?? 'No data') as JEECapacity}
                    >
                      {score.meaning}
                    </JEEMeaningChip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </HalfWidthContentBox>
      ))}
    </HorizontalColumns>
  )
}

export default JeeScores
