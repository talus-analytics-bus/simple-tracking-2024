import React from 'react'
import styled, { useTheme } from 'styled-components'
import CMS from 'components/library/airtable-cms'
import { DocumentLink, DocumentTable } from './StakeholderLayout'

type NaphStatus =
  | 'Completed and published'
  | 'Completed'
  | 'Ongoing and planned'
  | 'No data'

const NaphStatusChip = styled.div<{ status: NaphStatus }>`
  border-radius: 5px;
  color: ${({ theme }) => theme.common.colors.textInvert};
  width: fit-content;
  padding: 5px 10px;

  background-color: ${({ theme, status }) =>
    ({
      'Completed and published': theme.recipient.colors.scoringGood,
      Completed: theme.recipient.colors.scoringGood,
      'Ongoing and planned': theme.recipient.colors.scoringOk,
      'No data': theme.recipient.colors.scoringNoData,
    })[status]};
`

interface NaphsProps {
  data: Queries.StakeholderPageQuery
}

const Naphs = ({ data }: NaphsProps) => {
  const theme = useTheme()

  if (data.stakeholdersCsv?.iso3 && !data.naphs.nodes[0]) {
    if (typeof window === 'undefined')
      console.warn(
        `NAPHS status not found for country ${data.stakeholdersCsv.name}`
      )
    return <></>
  }

  return (
    <DocumentTable>
      <thead>
        <tr>
          <th>Status</th>
          <th>Years</th>
          <th>Document</th>
        </tr>
      </thead>
      <tbody>
        {data.naphs.nodes.map(({ data: document }) => (
          <tr key={document?.Years}>
            <td>
              <NaphStatusChip status={document?.Status as NaphStatus}>
                {document?.Status}
              </NaphStatusChip>
            </td>
            <td>{document?.Years}</td>
            <td>
              {document?.PDF?.localFiles?.[0]?.publicURL ? (
                <DocumentLink href={document?.PDF?.localFiles?.[0]?.publicURL}>
                  <CMS.Icon
                    style={{
                      width: 20,
                      height: 20,
                      position: 'relative',
                      top: -1,
                    }}
                    name="Open new tab"
                    color={theme.common.colors.textLink}
                  />
                  {data.stakeholdersCsv?.name} NAPHS {document?.Years}
                </DocumentLink>
              ) : (
                <span>No document available</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </DocumentTable>
  )
}

export default Naphs
