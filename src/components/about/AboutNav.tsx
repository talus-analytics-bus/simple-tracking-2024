import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Link } from 'gatsby'

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 0;
  margin-top: 10px;
  padding: 0 0 30px 0;
  border-bottom: 3px solid ${({ theme }) => theme.common.colors.surfaceGray100};
`
const Li = styled.li`
  display: block;
  padding: 10px 0px;
`
const PaddedLink = styled(Link)`
  ${({ theme }) => theme.textStyleBigParagraph};
  padding: 8px 15px 10px 15px;
  background-color: rgba(0,0,0,0);
  border-radius: 10px;
  transition: 150ms ease;
  color: ${({ theme }) => theme.common.colors.textPrimary};

  &:hover {
    transition: 250ms ease;
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
  }
`

const AboutNav = (): JSX.Element => {
  const theme = useTheme()

  return (
    <LinkList>
      <Li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/overview/"
        >
          Overview
        </PaddedLink>
      </Li>
      <Li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/methods/"
        >
          Methods
        </PaddedLink>
      </Li>
      <Li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/data-limitations/"
        >
          Data limitations
        </PaddedLink>
      </Li>
      <Li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/data-sources/"
        >
          Data sources
        </PaddedLink>
      </Li>
      <Li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/data-access/"
        >
          Data access
        </PaddedLink>
      </Li>
      <Li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/publications/"
        >
          Publications
        </PaddedLink>
      </Li>
    </LinkList>
  )
}
export default AboutNav
