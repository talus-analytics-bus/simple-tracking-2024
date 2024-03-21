import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Link } from 'gatsby'

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin: 0;
  margin-top: 10px;
  padding: 0 0 30px 0;
  border-bottom: 3px solid ${({ theme }) => theme.common.colors.surfaceGray100};
`
const PaddedLink = styled(Link)`
  ${({ theme }) => theme.textStyleBigParagraph};
  padding: 8px 20px 10px 20px;
  background-color: white;
  border-radius: 10px;
  transition: 150ms ease;
  color: ${({ theme }) => theme.common.colors.textPrimary};

  &:hover {
    transition: 250ms ease;
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
    color: ${({ theme }) => theme.common.colors.textInvert};
  }
`

const AboutNav = (): JSX.Element => {
  const theme = useTheme()

  return (
    <LinkList>
      <li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/overview/"
        >
          Overview
        </PaddedLink>
      </li>
      <li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/methods/"
        >
          Methods
        </PaddedLink>
      </li>
      <li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/data-sources/"
        >
          Data sources
        </PaddedLink>
      </li>
      <li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/data-access/"
        >
          Data access
        </PaddedLink>
      </li>
      <li>
        <PaddedLink
          activeStyle={{
            background: theme.common.colors.surfaceThemeDarker,
            color: theme.common.colors.textInvert,
          }}
          to="/about/publications/"
        >
          Publications
        </PaddedLink>
      </li>
    </LinkList>
  )
}
export default AboutNav
