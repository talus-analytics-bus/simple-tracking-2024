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
`

export const TopBar = styled.div`
  grid-area: topbar;
  position: sticky;
  top: 67px;
  width: 100%;
  background-color: ${({ theme }) => theme.common.colors.surfaceWhite};
  border-bottom: 1px solid ${({ theme }) => theme.common.colors.surfaceGray600};
  padding: 15px;
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
`

export const MainContent = styled.div`
  grid-area: main;
  padding: 25px;
`
