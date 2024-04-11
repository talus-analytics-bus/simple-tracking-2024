import React from 'react'
import styled from 'styled-components'

import Dropdown from 'components/library/ui/dropdown'

const Container = styled.li`
  position: relative;
`
const ChildContainer = styled.div`
  min-width: 400px;
`
const DropdownButton = styled.button<{ open: boolean }>`
  ${({ theme }) => theme.textStyleParagraph};
  border: none;
  background: none;
  color: ${({ theme }) => theme.common.colors.surfaceWhite};
  padding: 14px;
  &:hover {
    color: ${({ theme }) => theme.common.colors.surfaceGray400};
  }
  ${({ theme, open }) =>
    open && `color: ${theme.common.colors.surfaceThemeLighter}`}
`

interface TopicsDropdownProps {
  title: React.ReactNode
  children: React.ReactNode
}

const NavbarDropdown = ({ title, children }: TopicsDropdownProps) => {
  return (
    <Container>
      <Dropdown
        hover
        animDuration={100}
        renderButton={open => (
          <DropdownButton open={open}>{title}</DropdownButton>
        )}
        expanderStyle={{ right: 0, top: 52, borderRadius: 5 }}
      >
        <ChildContainer>{children}</ChildContainer>
      </Dropdown>
    </Container>
  )
}

export default NavbarDropdown
