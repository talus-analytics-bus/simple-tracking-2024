import React from 'react'

import { createGlobalStyle, ThemeProvider } from 'styled-components'

import CMS from 'components/library/airtable-cms/'

import textStyles from 'figma/textStyles'
import colorPalette from 'figma/colorPalette'

import useIconsQuery from 'cmsHooks/useIconsQuery'
import useSiteMetadataQuery from 'cmsHooks/useSiteMetadataQuery'
import getTrackingId from 'utilities/trackingId'

import '../../../static/assets/fonts/fonts.css'

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  @supports (-moz-appearance:none) {
    html {
      scroll-behavior: unset;
    }
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
    color: ${({ theme }) => theme.common.colors.textPrimary};
  }
  * {
    box-sizing: border-box;
  }
`

// site-wide contexts for themes, icons, and metadata
const Providers = ({ children }: { children: React.ReactNode }) => {
  const icons = useIconsQuery()
  const siteMetadata = useSiteMetadataQuery()
  // get GA tracking ID
  const trackingId = getTrackingId()

  return (
    <CMS.IconProvider data={icons}>
      <CMS.SiteMetadataProvider data={siteMetadata} trackingId={trackingId}>
        <ThemeProvider theme={{ ...textStyles, ...colorPalette }}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </CMS.SiteMetadataProvider>
    </CMS.IconProvider>
  )
}

export default Providers
