import useIndexPageData from 'cmsHooks/useIndexPageData'
import Main from 'components/layout/Main'
import CMS from 'components/library/airtable-cms'
import React from 'react'
import styled from 'styled-components'

const H2 = styled.h2``
const H3 = styled.h3`
  margin-bottom: 40px;
`

const PublicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  align-items: start;
  grid-gap: 50px;
  grid-auto-flow: column;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`
const PublicationCover = styled(CMS.Image)`
  height: 300px;
  width: 230px;
`

const publications = [1, 2, 3]

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
      <PublicationsGrid>
        {publications.map(publication => (
          <React.Fragment key={publication}>
            <PublicationCover
              name={`Publication ${publication} image`}
              data={data}
            />
            <CMS.RichText name={`Publication ${publication}`} data={data} />
          </React.Fragment>
        ))}
      </PublicationsGrid>
    </Main>
  )
}

export default PublicationsCiting
