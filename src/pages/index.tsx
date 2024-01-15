import React from 'react'

import CMS from 'components/library/airtable-cms/'
import Providers from '../components/layout/Providers'

import Main from '../components/layout/Main'

import useIndexPageData from '../cmsHooks/useIndexPageData'
import NavBar from 'components/layout/NavBar/NavBar'
import FirstFold from 'components/landing/FirstFold'

const IndexPage = (): JSX.Element => (
  <Providers>
    <CMS.SEO />
    <NavBar />
    <Main>
      <FirstFold />
    </Main>
  </Providers>
)

export default IndexPage
