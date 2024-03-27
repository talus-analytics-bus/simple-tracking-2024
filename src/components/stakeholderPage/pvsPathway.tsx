import React from 'react'
import { useTheme } from 'styled-components'
import CMS from 'components/library/airtable-cms'
import { DocumentLink, DocumentTable } from './StakeholderLayout'

interface PvsPathwayProps {
  data: Queries.StakeholderPageQuery
}

const PvsPathway = ({ data }: PvsPathwayProps) => {
  const theme = useTheme()

  if (data.stakeholdersCsv?.iso3 && !data.pvs_pathway.nodes[0].data?.Select)
    if (typeof window === 'undefined')
      throw new Error(
        `NAPHS data not found for country ${data.stakeholdersCsv.name}`
      )
    else return <></>

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
        {data.pvs_pathway.nodes.map(({ data: document }) => (
          <tr key={document?.PDF?.localFiles?.[0]?.publicURL}>
            <td>{document?.Select}</td>
            <td>{document?.Year}</td>
            <td>
              {document?.PDF?.localFiles?.[0]?.publicURL && (
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
                  {data.stakeholdersCsv?.name} PVS Pathway {document?.Year}
                </DocumentLink>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </DocumentTable>
  )
}

export default PvsPathway
