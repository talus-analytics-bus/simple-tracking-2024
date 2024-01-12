import Dropdown from 'components/library/ui/dropdown'
import React from 'react'
import styled from 'styled-components'

const DropdownButton = styled.button<{ open: boolean }>`
  background: none;
  border: none;
  ${({ theme }) => theme.textStyleParagraph};
  color: ${({ theme }) => theme.common.colors.surfaceWhite};
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.common.colors.surfaceThemeDarker};
  text-align: left;
  width: 100vw;

  &:hover {
    color: ${({ theme }) => theme.common.colors.textInvert};
    background-color: ${({ theme }) =>
      theme.common.colors.surfaceThemeEvenDarker};
  }

  ${({ theme, open }) =>
    open && `background-color: ${theme.common.colors.surfaceThemeEvenDarker}`}
`
const DropdownContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.common.colors.surfaceThemeEvenDarker};
  color: ${({ theme }) => theme.common.colors.surfaceWhite};
  padding-left: 20px;
`

interface MobileMenuDropdownProps {
  title: string
  children: React.ReactNode
}

const MobileMenuDropdown = ({ title, children }: MobileMenuDropdownProps) => (
  <Dropdown
    floating={false}
    renderButton={open => <DropdownButton open={open}>{title}</DropdownButton>}
  >
    <DropdownContainer>{children}</DropdownContainer>
  </Dropdown>
)

export default MobileMenuDropdown
