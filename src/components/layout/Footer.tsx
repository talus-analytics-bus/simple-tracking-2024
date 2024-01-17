import React from 'react'
import styled from 'styled-components'

import CMS from 'components/library/airtable-cms'

import useIndexPageData from 'cmsHooks/useIndexPageData'

const FooterContainer = styled.div`
  width: 100%;
  height: 300px;
  background: ${({ theme }) => theme.common.colors.surfaceGray50};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 50px;
`
const FooterContent = styled.div`
  width: 1100px;
  max-width: 100%;
`
const Logos = styled.div`
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`
const Copyright = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    margin-left: 0;
    justify-content: center;
  }
`
const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`
const GHSSLogo = styled(CMS.Image)`
  height: 70px;
  width: 90%;
  max-width: 590px;
`
const IDEALogo = styled(CMS.Image)`
  height: 84px;
  width: 288px;
`

const Footer = (): JSX.Element => {
  const cmsData = useIndexPageData()

  const ghssLink = CMS.getText(cmsData, 'GHSS logo link')
  const ideaLink = CMS.getText(cmsData, 'IDEA logo link')

  return (
    <FooterContainer>
      <FooterContent>
        <Logos>
          <LogoLink href={ghssLink} target="_blank">
            <GHSSLogo
              name="GHSS logo"
              data={cmsData}
              imgStyle={{ objectFit: 'contain' }}
            />
          </LogoLink>
          <LogoLink href={ideaLink} target="_blank">
            <IDEALogo
              name="IDEA logo"
              data={cmsData}
              imgStyle={{ objectFit: 'contain' }}
            />
          </LogoLink>
        </Logos>
        <Copyright>
          <CMS.RichText name="Copyright" data={cmsData} />
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
