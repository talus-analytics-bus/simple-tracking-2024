import React from 'react'

import CMS from 'components/library/airtable-cms/'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'

import useAboutPublicationsPageData from 'cmsHooks/useAboutPublicationsPageData'

const PublicationsPage = (): JSX.Element => {
  const cmsData = useAboutPublicationsPageData()

  return (
    <Providers>
      <CMS.SEO
        title={CMS.getText(cmsData, 'Page title')}
        description={CMS.getText(cmsData, 'Page description')}
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1 title" data={cmsData} />
          </h1>
          <CMS.RichText name="H1 paragraph" data={cmsData} />
          <h2>
            <CMS.Text name="H2 title" data={cmsData} />
          </h2>
          <h2>
            <CMS.Text name="H3 title" data={cmsData} />
          </h2>
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default PublicationsPage
