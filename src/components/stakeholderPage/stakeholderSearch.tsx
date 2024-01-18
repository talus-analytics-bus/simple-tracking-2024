import React from 'react'

import Typeahead from 'components/library/ui/typeahead'

import useStakeholderSearchItems from 'hooks/useStakeholderSearchItems'
import { useTheme } from 'styled-components'
import { navigate } from 'gatsby'

const StakeholderSearch = ({ style }: { style: React.CSSProperties }) => {
  const theme = useTheme()
  const searchItems = useStakeholderSearchItems()

  const iconColor = theme.common.colors.surfaceGray400.replace('#', '')

  return (
    <Typeahead
      style={{ marginTop: 0, width: '100%', ...style }}
      // backgroundColor={theme.common.colors.surfaceThemeHazy}
      // RenderItem={({ item, selected }) => (
      //   <TypeaheadResult {...{ item, selected }} />
      // )}
      // borderColor={theme.common.colors.surfaceThemeDarker}
      fontColor={theme.common.colors.textPrimary}
      items={searchItems}
      placeholder={`Funders & Recipients`}
      onAdd={item => {
        navigate(item.url)
      }}
      iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23${iconColor}'/%3E%3C/svg%3E%0A`}
    />
  )
}

export default StakeholderSearch
