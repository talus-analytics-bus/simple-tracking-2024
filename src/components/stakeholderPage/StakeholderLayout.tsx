import React from 'react'
import styled from 'styled-components'

export const Layout = styled.div`
  position: relative;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'sidebar topbar'
    'sidebar main';
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'topbar' 'main';
  }
`

export const TopBar = styled.div`
  grid-area: topbar;
  position: sticky;
  top: 67px;
  width: 100%;
  background-color: ${({ theme }) => theme.common.colors.surfaceWhite};
  border-bottom: 2px solid ${({ theme }) => theme.common.colors.surfaceGray100};
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  > h1 {
    margin-bottom: 0px;
  }
`

export const Sidebar = styled.div`
  position: sticky;
  grid-area: sidebar;
  align-self: start;
  top: 67px;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-right: 25px;

  @media (max-width: 900px) {
    display: none;
  }
`

const StyledSidebarLink = styled.a<{ selected: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.common.colors.textPrimary};
  text-decoration: none;

  &:hover,
  &:active,
  &:target {
    background-color: ${({ theme }) => theme.common.colors.surfaceThemeDarker};
    color: ${({ theme }) => theme.common.colors.textInvert};
  }

  &:hover {
    background-color: ${({ theme }) => theme.common.colors.surfaceThemeHover};
  }

  ${({ selected, theme }) =>
    selected &&
    `
    background-color: ${theme.common.colors.surfaceThemeDarker};
    color: ${theme.common.colors.textInvert};
  `};
`

export const SidebarLink = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  let selected = Boolean(hash) && hash.includes(props.href ?? '')

  // show first link as selected if there is no hash
  if (hash === '' && props.href === '#1') selected = true

  return (
    <StyledSidebarLink {...props} selected={selected}>
      {props.children}
    </StyledSidebarLink>
  )
}

export const ScrollTarget = styled.div`
  position: relative;
  top: -160px;
`

export const MainContent = styled.div`
  grid-area: main;
  padding: 25px;

  > h2 {
    ${({ theme }) => theme.textStyleH2};
    margin-bottom: 15px;
  }

  > h2:not(:first-of-type) {
    border-top: 2px solid ${({ theme }) => theme.common.colors.surfaceGray100};
    padding-top: 30px;
    margin-top: 60px;
  }

  > h3 {
    ${({ theme }) => theme.textStyleParagraph};
    margin-top: 15px;
    margin-bottom: 30px;
  }
`

export const ContentBox = styled.div`
  background-color: ${({ theme }) => theme.common.colors.surfaceGray50};
  border-radius: 5px;
  padding: 25px;
  width: 100%;

  > h3 {
    margin: -25px -25px 0 -25px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
    ${({ theme }) => theme.textStyleNumbers};

    > span {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${({ theme }) => theme.common.colors.textPrimary};
    }

    > span:last-child {
      color: ${({ theme }) => theme.common.colors.textSecondary};
    }
  }
`

export const TotalsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;

  td:first-child {
    padding: 15px 20px 15px 0;
    text-align: right;
    width: 40%;
    ${({ theme }) => theme.textStyleBigNumber};
  }

  td:last-child {
    ${({ theme }) => theme.textStyleSmallNumbers};
  }

  td {
    padding: 15px 0;
  }
`

export const HorizontalColumns = styled.section`
  display: flex;
  gap: 15px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

export const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const NoDataP = styled.p`
  text-align: center;
  ${({ theme }) => theme.textStyleNumbers};
  color: ${({ theme }) => theme.common.colors.textSecondary};
  padding-top: 20px;
`

export const NoData = () => <NoDataP>No data available</NoDataP>

export const DocumentTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  ${({ theme }) => theme.textStyleSmallNumbers};

  tbody tr {
    background-color: ${({ theme }) => theme.common.colors.surfaceWhite};
    border: 1px solid ${({ theme }) => theme.common.colors.surfaceGray100};

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
    }
  }

  th {
    padding: 10px 15px;
    text-align: left;
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
  }
  th:first-child,
  td:nth-child(2),
  th:nth-child(2) {
    @media (max-width: 600px) {
      display: none;
    }
  }
  td,
  th {
    padding: 10px 15px;
    text-align: left;

    @media (max-width: 600px) {
      padding: 5px 15px;
    }
  }
  td:first-child {
    grid-area: metric;
    color: ${({ theme }) => theme.common.colors.textSecondary};
    width: 245px;

    @media (max-width: 600px) {
      margin-top: 10px;
    }
  }
  td:nth-child(2) {
    grid-area: metric_name;
  }
  td:nth-child(3) {
    grid-area: meaning;

    @media (max-width: 600px) {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`
export const DocumentLink = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 5px;

  color: ${({ theme }) => theme.common.colors.textLink};
`
