import useRiskIndicies from 'queryHooks/useRiskIndicies'
import styled from 'styled-components'
import React from 'react'
import {
  ContentBox,
  HalfWidthSimpleBox,
  HorizontalColumns,
} from './StakeholderLayout'
import RiskIndiciesPlot from 'components/plot/RiskIndiciesPlot/RiskIndiciesPlot'
import CMS from 'components/library/airtable-cms'
import useStakeholderPageData from 'cmsHooks/useStakeholderPageData'

interface RiskIndiciesProps {
  data: Queries.StakeholderPageQuery
}

const RiskIndexParagraph = styled(CMS.RichText)`
  ${({ theme }) => theme.textStyleParagraph};

  a {
    color: ${({ theme }) => theme.common.colors.textLink};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const RiskIndicies = ({ data }: RiskIndiciesProps) => {
  const riskIndicies = useRiskIndicies()
  const cmsData = useStakeholderPageData()

  return (
    <HorizontalColumns style={{ flexWrap: 'wrap' }}>
      <HalfWidthSimpleBox>
        <ContentBox>
          <h3 style={{ justifyContent: 'center' }}>
            <CMS.Text name="GHS Index title" data={cmsData} />
          </h3>
          <RiskIndiciesPlot
            data={riskIndicies.ghsi.data}
            name={data.stakeholdersCsv?.name}
            highlight={data.ghsi}
            min={0}
            max={100}
          />
        </ContentBox>
        <RiskIndexParagraph name="GHS Index paragraph" data={cmsData} />
      </HalfWidthSimpleBox>
      <HalfWidthSimpleBox>
        <ContentBox>
          <h3 style={{ justifyContent: 'center' }}>
            <CMS.Text
              name="Infectious Disease Vulnerability Index title"
              data={cmsData}
            />
          </h3>
          <RiskIndiciesPlot
            data={riskIndicies.idvi.data}
            name={data.stakeholdersCsv?.name}
            highlight={data.idvi}
            min={0}
            max={1}
          />
        </ContentBox>
        <RiskIndexParagraph
          name="Infectious Disease Vulnerability Index paragraph"
          data={cmsData}
        />
      </HalfWidthSimpleBox>
      <HalfWidthSimpleBox>
        <ContentBox>
          <h3 style={{ justifyContent: 'center' }}>
            <CMS.Text name="INFORM Risk Index title" data={cmsData} />
          </h3>
          <RiskIndiciesPlot
            data={riskIndicies.inform.data}
            name={data.stakeholdersCsv?.name}
            highlight={data.inform}
            min={10}
            max={0}
          />
        </ContentBox>
        <RiskIndexParagraph name="INFORM Risk Index paragraph" data={cmsData} />
      </HalfWidthSimpleBox>
      <HalfWidthSimpleBox>
        <ContentBox>
          <h3 style={{ justifyContent: 'center' }}>
            <CMS.Text name="World Risk Index title" data={cmsData} />
          </h3>
          <RiskIndiciesPlot
            data={riskIndicies.wri.data}
            name={data.stakeholdersCsv?.name}
            highlight={data.wri}
            min={50}
            max={0}
          />
        </ContentBox>
        <RiskIndexParagraph name="World Risk Index paragraph" data={cmsData} />
      </HalfWidthSimpleBox>
    </HorizontalColumns>
  )
}

export default RiskIndicies
