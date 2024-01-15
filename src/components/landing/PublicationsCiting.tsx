import useIndexPageData from 'cmsHooks/useIndexPageData'
import Main from 'components/layout/Main'
import CMS from 'components/library/airtable-cms'
import React from 'react'
import styled from 'styled-components'

const H2 = styled.h2``
const H3 = styled.h3``

const PublicationsCiting = () => {
  const data = useIndexPageData()

  return (
    <Main>
      <H2>
        <CMS.Text name="Publications header" data={data} />
      </H2>
      <H3>
        <CMS.Text name="Publications paragraph" data={data} />
      </H3>
    </Main>
  )
}

export default PublicationsCiting
