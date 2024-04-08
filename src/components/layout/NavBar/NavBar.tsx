import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import CMS from 'components/library/airtable-cms'

import LinksList from './LinksList'
import MobileMenu from './MobileMenu/MobileMenu'
import NavbarDropdown from './NavbarDropdown'
import MobileMenuDropdown from './MobileMenu/MobileMenuDropdown'
import NavBarCountrySearch from './NavBarCountrySearch'

// import useTopics from 'queryHooks/useTopics'
// import simplifyForUrl from 'utilities/simplifyForUrl'
import useIndexPageData from 'cmsHooks/useIndexPageData'
import usePheicNames from 'queryHooks/usePheicNames'
import simplifyForUrl from 'utilities/simplifyForUrl'

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.common.colors.surfaceThemeDarker};
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 50;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.24);
  border-bottom: 1px solid black;
`
const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`
const NavLink = styled(Link)`
  color: white !important;
  padding: 14px;
  text-decoration: none;
  transition: 500ms ease;
  font-weight: 400;
  &:hover {
    color: ${({ theme }) => theme.common.colors.surfaceThemeHover};
  }
`
const HomeLink = styled(NavLink)`
  font-family: 'Overpass', sans-serif !important;
  font-weight: 500 !important;
  font-size: 24px !important;
  color: white;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 10px;
  }
`
const DesktopNavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  @media (max-width: 1200px) {
    display: none;
  }
`
const NavLogo = styled(CMS.Image)`
  height: 50px;
  width: 291px;
  max-width: 65vw;
  margin-right: 30px;

  @media (max-width: 600px) {
    margin-right: 15px;
  }
`

const NavBar = () => {
  const data = useIndexPageData()

  const pheicNames = usePheicNames()
  const pheicsLinks = pheicNames.map(({ data }) => ({
    to: `/pheic/${simplifyForUrl(data?.PHEIC_name ?? '')}/`,
    children: data?.PHEIC_name,
  }))

  const aboutLinks = [
    { to: '/about/overview/', children: 'Overview' },
    { to: '/about/methods/', children: 'Methods' },
    { to: '/about/data-sources/', children: 'Data sources' },
    { to: '/about/data-access/', children: 'Data access' },
    { to: '/about/publications/', children: 'Publications' },
  ]

  return (
    <Nav>
      <Container>
        <HomeLink to="/">
          <NavLogo
            imgStyle={{ objectFit: 'contain' }}
            name="Site logo"
            data={data}
          />
        </HomeLink>
        <DesktopNavList>
          <NavLink to="/global/">Global</NavLink>
          <NavbarDropdown title="PHEICs">
            <LinksList links={pheicsLinks} />
          </NavbarDropdown>
          <NavLink to="/map/">Map</NavLink>
          <NavbarDropdown title="About">
            <LinksList links={aboutLinks} />
          </NavbarDropdown>
          <NavBarCountrySearch style={{ minWidth: 250, margin: '0' }} />
        </DesktopNavList>
        <MobileMenu>
          <MobileMenuDropdown title="PHEICs">
            <LinksList $darkMode links={pheicsLinks} />
          </MobileMenuDropdown>
          <MobileMenuDropdown title="About">
            <LinksList $darkMode links={aboutLinks} />
          </MobileMenuDropdown>
          <NavBarCountrySearch style={{ width: '100%', margin: '0' }} />
        </MobileMenu>
      </Container>
    </Nav>
  )
}

export default NavBar
