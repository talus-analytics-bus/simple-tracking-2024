import React from 'react'

import CMS from 'components/library/airtable-cms/'
import Providers from '../components/layout/Providers'

import Main from '../components/layout/Main'

import useIndexPageData from '../cmsHooks/useIndexPageData'
import NavBar from 'components/layout/NavBar/NavBar'

const IndexPage = (): JSX.Element => {
  const data = useIndexPageData()

  return (
    // all pages should be wrapped in the Providers component
    // all pages should start with CMS.SEO to set metadata.
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <h1>
          <CMS.Text name="H1" data={data} />
        </h1>
        <h2>
          <CMS.Text name="Section 1 paragraph 1" data={data} />
        </h2>
        <h3>
          <CMS.Text name="Section 1 paragraph 2" data={data} />
        </h3>
      </Main>
    </Providers>
  )
}

export default IndexPage
