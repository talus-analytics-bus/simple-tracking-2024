import React from 'react'

import CMS from 'components/library/airtable-cms/'
import Providers from '../components/layout/Providers'

import NavBar from 'components/layout/NavBar/NavBar'
import FirstFold from 'components/landing/FirstFold'
import PurpleBar from 'components/landing/PurpleBar'
import Footer from 'components/layout/Footer'
import PublicationsCiting from 'components/landing/PublicationsCiting'

const IndexPage = (): JSX.Element => (
  <Providers>
    <CMS.SEO />
    <NavBar />
    <FirstFold />
    <PurpleBar />
    <PublicationsCiting />
    <Footer />
  </Providers>
)

export default IndexPage
