import Footer from 'components/layout/Footer'
import NavBar from 'components/layout/NavBar/NavBar'
import Providers from 'components/layout/Providers'
import CMS from 'components/library/airtable-cms'
import React from 'react'

const GlobalPage = () => {
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Footer />
    </Providers>
  )
}

export default GlobalPage
