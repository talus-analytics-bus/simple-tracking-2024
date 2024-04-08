import React from 'react'
import { Link, navigate } from 'gatsby'
import styled, { useTheme } from 'styled-components'

import CMS from 'components/library/airtable-cms'

import Main from 'components/layout/Main'
import Typeahead, { RenderItemProps } from 'components/library/ui/typeahead'

import useIndexPageData from 'cmsHooks/useIndexPageData'
import useStakeholderSearchItems from 'hooks/useStakeholderSearchItems'

const PurpleBarContainer = styled.div`
  background-color: ${({ theme }) => theme.common.colors.surfaceThemeDarker};
`
const ColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  grid-auto-flow: column;
  justify-items: start;
  align-items: start;
  column-gap: 50px;
  row-gap: 30px;
  padding: 20px 0;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`

const PurpleBarIcon = styled(CMS.Icon)`
  height: 50px;
  align-self: center;

  @media (max-width: 1000px) {
    margin-top: 40px;
    align-self: flex-start;
  }
`

const H2 = styled.h2`
  ${({ theme }) => theme.textStyleH2}
  color: ${({ theme }) => theme.common.colors.textInvert};
  margin: 0;
`

const H3 = styled.h3`
  ${({ theme }) => theme.textStyleParagraph}
  color: ${({ theme }) => theme.common.colors.textInvert};
  margin: 0;
  margin-bottom: 10px;
`

const ButtonLink = styled(Link)`
  background-color: ${({ theme }) => theme.common.colors.surfaceThemeHazy};
  color: ${({ theme }) => theme.common.colors.textInvert};
  padding: 11px 20px;
  border-radius: 3px;
  text-decoration: none;
  transition: 250ms;

  &:hover {
    background-color: ${({ theme }) => theme.common.colors.surfaceThemeHover};
  }
`

const StyledTypeahead = styled(Typeahead)`
  margin-top: 0;
  max-width: 300px;
`

const TypeaheadResultContainer = styled.span<{ selected?: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  text-align: left;
  padding: 8px 12px;
  background-color: rgba(0, 50, 100, 0);
  transition: 150ms ease;
  &:hover {
    background-color: ${({ theme }) => theme.common.colors.surfaceThemeDarker};
  }
`

const TypeaheadResult = ({ item: { label } }: RenderItemProps) => (
  <TypeaheadResultContainer>{label}</TypeaheadResultContainer>
)

const PurpleBar = () => {
  const theme = useTheme()
  const data = useIndexPageData()

  const searchItems = useStakeholderSearchItems()
  const stakeholderSearchItems = searchItems.filter(
    item => !item.url.startsWith('/pheic/')
  )
  const pheicSearchItems = searchItems.filter(item =>
    item.url.startsWith('/pheic/')
  )

  const iconColor = theme.common.colors.textInvert.replace('#', '')

  return (
    <PurpleBarContainer>
      <Main>
        <ColumnLayout>
          <PurpleBarIcon name={`Purple bar icon 1`} />
          <H2>
            <CMS.Text name={`Highlight header 1`} data={data} />
          </H2>
          <H3>
            <CMS.Text name={`Highlight paragraph 1`} data={data} />
          </H3>
          <ButtonLink to="/map/">
            <CMS.Text name="Highlight button 1" data={data} />
          </ButtonLink>
          <PurpleBarIcon name={`Purple bar icon 2`} style={{ height: 35 }} />
          <H2>
            <CMS.Text name={`Highlight header 2`} data={data} />
          </H2>
          <H3>
            <CMS.Text name={`Highlight paragraph 2`} data={data} />
          </H3>
          <StyledTypeahead
            style={{ marginTop: 0, width: '100%' }}
            multiselect
            backgroundColor={theme.common.colors.surfaceThemeHazy}
            borderColor={theme.common.colors.surfaceThemeDarker}
            RenderItem={({ item, selected }) => (
              <TypeaheadResult {...{ item, selected }} />
            )}
            fontColor={theme.common.colors.textInvert}
            items={stakeholderSearchItems}
            placeholder={`Search by stakeholder`}
            onAdd={item => {
              navigate(item.url)
            }}
            iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23${iconColor}'/%3E%3C/svg%3E%0A`}
          />
          <PurpleBarIcon name={`Purple bar icon 3`} />
          <H2>
            <CMS.Text name={`Highlight header 3`} data={data} />
          </H2>
          <H3>
            <CMS.Text name={`Highlight paragraph 3`} data={data} />
          </H3>
          <StyledTypeahead
            style={{ marginTop: 0, width: '100%' }}
            multiselect
            backgroundColor={theme.common.colors.surfaceThemeHazy}
            RenderItem={({ item, selected }) => (
              <TypeaheadResult {...{ item, selected }} />
            )}
            borderColor={theme.common.colors.surfaceThemeDarker}
            fontColor={theme.common.colors.textInvert}
            items={pheicSearchItems}
            placeholder={`Search by PHEIC`}
            onAdd={item => {
              navigate(item.url)
            }}
            iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23${iconColor}'/%3E%3C/svg%3E%0A`}
          />
        </ColumnLayout>
      </Main>
    </PurpleBarContainer>
  )
}

export default PurpleBar
