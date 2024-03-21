import React from 'react'

import CMS from 'components/library/airtable-cms/'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'
// import useUserGuidePageData from 'cmsHooks/useUserGuideQuery'

const PublicationsPage = (): JSX.Element => {
  // const cmsData = useUserGuidePageData()
  const cmsData = {}
  return (
    <Providers>
      <CMS.SEO
        title="GHSS Tracking Publications"
        description="Publications of the GHSS Tracking project"
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            {
              // <CMS.Text name="H1" data={cmsData} />
            }
            PUBLICATIONS PLACEHOLDER
          </h1>
          {
            // <CMS.RichText name="User guide text" data={cmsData} />
          }
          PLACEHOLDER
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default PublicationsPage
