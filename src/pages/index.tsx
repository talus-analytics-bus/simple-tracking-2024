import React from 'react'

import CMS from 'components/library/airtable-cms/'
import Providers from '../components/layout/Providers'

import Main from '../components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import FirstFold from 'components/landing/FirstFold'
import PurpleBar from 'components/landing/PurpleBar'

const IndexPage = (): JSX.Element => (
  <Providers>
    <CMS.SEO />
    <NavBar />
    <Main>
      <FirstFold />
    </Main>
    <PurpleBar />
  </Providers>
)

export default IndexPage
