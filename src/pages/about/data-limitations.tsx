import React from 'react'
import { renderToString } from 'react-dom/server'

import CMS from 'components/library/airtable-cms/'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'
import useAboutDataLimitationsPageData from 'cmsHooks/useAboutDataLimitationsPageData'

const MethodsPage = (): JSX.Element => {
  const cmsData = useAboutDataLimitationsPageData()

  const linkString = renderToString(
    <CMS.Download name="Technical appendix" data={cmsData} />
  ).replace(/\n|\r/g, '')

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
          <CMS.RichText
            name="H1 paragraph"
            data={cmsData}
            replace={{
              '[TECHNICAL APPENDIX LINK]': linkString,
            }}
          />
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default MethodsPage
