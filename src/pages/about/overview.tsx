import React from 'react'

import CMS from 'components/library/airtable-cms/'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'
import useAboutOverviewPageData from 'cmsHooks/useAboutOverviewPageData'

const OverviewPage = (): JSX.Element => {
  const cmsData = useAboutOverviewPageData()
  return (
    <Providers>
      <CMS.SEO
        title="GHSS Tracking Overview"
        description="Overview of the GHSS Tracking project"
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1 title" data={cmsData} />
          </h1>
          <CMS.RichText name="H1 paragraph" data={cmsData} />
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default OverviewPage
