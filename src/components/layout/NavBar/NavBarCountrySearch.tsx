import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { navigate } from 'gatsby'

import Typeahead from 'components/library/ui/typeahead'
import useStakeholders from 'queryHooks/useStakeholders'
import simplifyForUrl from 'utilities/simplifyForUrl'

interface CoutnrySearchProps {
  style?: React.CSSProperties
}

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 0 15px;
  input {
    ${({ theme }) => theme.textStyleParagraph};

    &::placeholder {
      ${({ theme }) => theme.textStyleParagraph};
      color: ${({ theme }) => theme.common.colors.surfaceWhite};
      opacity: 1;
    }
  }
`

enum SearchStatus {
  Initial = 'initial',
  Focused = 'focused',
  Loading = 'loading',
}

const getUrlFromItem = (item: {
  key: string
  label: string
  iso3: string | null
}) => {
  if (item.iso3 && item.iso3 !== '')
    return `/countries/${simplifyForUrl(item.iso3)}`
  return `/organizations/${simplifyForUrl(item.label)}`
}

const CountrySearch = ({ style }: CoutnrySearchProps) => {
  const stakeholders = useStakeholders()
  const theme = useTheme()

  const [searchStatus, setSearchStatus] = useState(SearchStatus.Initial)

  const searchItems = useMemo(
    () =>
      stakeholders
        .map(stakeholder => {
          if (!stakeholder.name)
            throw new Error('Country name or ISO3 not found')

          return {
            key: stakeholder.name,
            label: stakeholder.name,
            iso3: stakeholder.iso3,
          }
        })
        .sort((a, b) => a.label.localeCompare(b.label)),
    [stakeholders]
  )

  const lightMode = [SearchStatus.Loading, SearchStatus.Focused].includes(
    searchStatus
  )
  const iconColor = lightMode ? '192C3C' : 'ffffff'

  return (
    <Container
      onFocus={() => setSearchStatus(SearchStatus.Focused)}
      onBlur={() =>
        setTimeout(
          () =>
            setSearchStatus(prev =>
              prev === SearchStatus.Focused ? SearchStatus.Initial : prev
            ),
          150
        )
      }
    >
      <Typeahead
        iconLeft
        multiselect
        style={style}
        backgroundColor={
          lightMode
            ? theme.common.colors.surfaceWhite
            : theme.common.colors.surfaceThemeEvenDarker
        }
        borderColor={
          lightMode
            ? theme.common.colors.surfaceWhite
            : theme.common.colors.surfaceThemeDarker
        }
        fontColor={
          lightMode
            ? theme.common.colors.textPrimary
            : theme.common.colors.textInvert
        }
        items={searchItems}
        placeholder={`Funders & Recipients`}
        onAdd={item => {
          setSearchStatus(SearchStatus.Loading)
          navigate(getUrlFromItem(item as (typeof searchItems)[number]))
        }}
        iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23${iconColor}'/%3E%3C/svg%3E%0A`}
      />
    </Container>
  )
}

export default CountrySearch
