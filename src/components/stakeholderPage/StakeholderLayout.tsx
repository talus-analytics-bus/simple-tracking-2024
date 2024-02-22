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

export const MainContent = styled.div`
  grid-area: main;
  padding: 25px;
`

export const ContentBox = styled.div`
  background-color: ${({ theme }) => theme.common.colors.surfaceGray50};
  border-radius: 5px;
  padding: 25px;
  margin-bottom: 40px;

  > h3 {
    margin: -25px -25px 0 -25px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
    ${({ theme }) => theme.textStyleSmallLabel};

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
