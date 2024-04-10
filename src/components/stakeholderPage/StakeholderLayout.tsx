import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const LayoutDiv = styled.div`
  position: relative;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'sidebar topbar'
    'sidebar main';
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'topbar' 'main';
    padding: 0;
  }
`

const scrollingContext = React.createContext({
  selectedId: '',
  setSelectedId: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  visibleIds: [] as string[],
  setVisibleIds: (() => {}) as React.Dispatch<React.SetStateAction<string[]>>,
})

export const Layout = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [selectedId, setSelectedId] = useState('')
  const [visibleIds, setVisibleIds] = useState([] as string[])

  return (
    <scrollingContext.Provider
      value={{ selectedId, setSelectedId, visibleIds, setVisibleIds }}
    >
      <LayoutDiv {...props}>{props.children}</LayoutDiv>
    </scrollingContext.Provider>
  )
}

export const TopBar = styled.div`
  grid-area: topbar;
  position: sticky;
  top: 67px;
  width: 100%;
  background-color: ${({ theme }) => theme.common.colors.surfaceWhite};
  border-bottom: 2px solid ${({ theme }) => theme.common.colors.surfaceGray400};
  padding: 18px 25px;
  padding: 0px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 25px;
  margin-right: 25px;
  width: calc(100% - 50px);

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  > h1 {
    margin-bottom: 0px;
  }
`

export const YearSelector = styled.select`
  padding: 5px 8px;
  margin-left: auto;
`

export const Sidebar = styled.div`
  position: sticky;
  grid-area: sidebar;
  align-self: start;
  top: 67px;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-right: 25px;

  @media (max-width: 900px) {
    display: none;
  }
`

const StyledSidebarLink = styled.a<{ selected: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.common.colors.textPrimary};
  text-decoration: none;
  transition: 200ms;

  &:hover,
  &:active,
  &:target {
    background-color: ${({ theme }) => theme.common.colors.surfaceThemeDarker};
    color: ${({ theme }) => theme.common.colors.textInvert};
  }

  &:hover {
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
    color: ${({ theme }) => theme.common.colors.textPrimary};
  }

  ${({ selected, theme }) =>
    selected &&
    `
    background-color: ${theme.common.colors.surfaceThemeDarker};
    color: ${theme.common.colors.textInvert};

    &:hover {
      background-color: ${theme.common.colors.surfaceThemeHazy};
      color: ${theme.common.colors.textInvert};
    }
  `};
`

export const SidebarLink = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  const { selectedId, setSelectedId, visibleIds } =
    React.useContext(scrollingContext)

  const handleClick = () => {
    window.location.hash = props.href ?? ''

    // used to guarantee that the clicked item shows
    // up as selected after the smooth scroll happens
    // even if the clicked item is close to the bottom
    // of the page so it never naturally highlights based
    // on the scroll position during smooth scrolling.
    setTimeout(() => {
      setSelectedId(props.href?.replace('#', '') ?? '')
    }, 810)
  }

  return (
    <StyledSidebarLink
      {...props}
      selected={
        selectedId
          ? selectedId === props.href?.replace('#', '')
          : visibleIds[0] === props.href?.replace('#', '')
      }
      onClick={handleClick}
    >
      {props.children}
    </StyledSidebarLink>
  )
}

export const ContentSection = styled.section`
  position: relative;
`

const ScrollTargetDiv = styled.div`
  position: absolute;
  top: -160px;
  height: calc(100% + 60px);
`

const elementIsAtTop = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return rect.top <= 30
}

export const ScrollTarget = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { setSelectedId, setVisibleIds } = React.useContext(scrollingContext)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      setSelectedId('')
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (elementIsAtTop(entry.target as HTMLElement)) {
            setVisibleIds(prev => [entry.target?.id ?? '', ...prev])
          } else {
            setVisibleIds(prev => [...prev, entry.target?.id ?? ''])
          }
        } else {
          setVisibleIds(prev => prev.filter(id => id !== entry.target?.id))
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-30px',
      threshold: 0.5,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref.current])

  return <ScrollTargetDiv ref={ref} {...props} />
}

export const MainContent = styled.div`
  grid-area: main;
  padding: 25px;
  padding-top: 0px;

  > section > h2 {
    position: relative;
    ${({ theme }) => theme.textStyleH2};
    margin-bottom: 15px;
  }

  > section:not(:nth-child(1)) > h2 {
    border-top: 2px solid ${({ theme }) => theme.common.colors.surfaceGray100};
    padding-top: 30px;
    margin-top: 60px;
  }

  > section > h3 {
    ${({ theme }) => theme.textStyleParagraph};
    margin-top: 15px;
    margin-bottom: 30px;
  }

  a {
    color: ${({ theme }) => theme.common.colors.textLink};
  }
`

export const ContentBox = styled.div`
  background-color: ${({ theme }) => theme.common.colors.surfaceGray50};
  border-radius: 5px;
  padding: 25px;
  width: 100%;

  > h3 {
    margin: -25px -25px 0 -25px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
    ${({ theme }) => theme.textStyleNumbers};

    > span {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${({ theme }) => theme.common.colors.textPrimary};
    }

    > span:last-child {
      color: ${({ theme }) => theme.common.colors.textSecondary};
    }

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;

      > span:last-child {
        margin-left: 40px;
      }
    }
  }
`

export const HalfWidthContentBox = styled(ContentBox)`
  flex-basis: calc(50% - 7.5px);

  @media (max-width: 1200px) {
    flex-basis: 100%;
  }
`

export const HalfWidthSimpleBox = styled.div`
  flex-basis: calc(50% - 7.5px);

  @media (max-width: 1200px) {
    flex-basis: 100%;
  }
`

export const TotalsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;

  td:first-child {
    padding: 15px 20px 15px 0;
    text-align: right;
    width: 40%;
    ${({ theme }) => theme.textStyleBigNumberSemibold};

    @media (max-width: 900px) {
      ${({ theme }) => theme.textStyleMedNumber};
    }
  }

  tr:not(:first-child) > td:first-child {
    ${({ theme }) => theme.textStyleBigNumber};
  }

  td:last-child {
    ${({ theme }) => theme.textStyleSmallNumbers};
  }

  td {
    padding: 15px 0;
  }
`

export const HorizontalColumns = styled.section`
  display: flex;
  gap: 15px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

export const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const NoDataP = styled.p`
  text-align: center;
  ${({ theme }) => theme.textStyleNumbers};
  color: ${({ theme }) => theme.common.colors.textSecondary};
  padding-top: 20px;
`

export const NoData = ({ style }: { style?: React.CSSProperties }) => (
  <NoDataP style={style}>No data available</NoDataP>
)

export const DocumentTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  ${({ theme }) => theme.textStyleSmallNumbers};

  tbody tr {
    background-color: ${({ theme }) => theme.common.colors.surfaceWhite};
    border: 1px solid ${({ theme }) => theme.common.colors.surfaceGray100};

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
    }
  }

  th {
    padding: 10px 15px;
    text-align: left;
    background-color: ${({ theme }) => theme.common.colors.surfaceGray100};
  }
  th:first-child,
  td:nth-child(2),
  th:nth-child(2) {
    @media (max-width: 600px) {
      display: none;
    }
  }
  td,
  th {
    padding: 10px 15px;
    text-align: left;

    @media (max-width: 600px) {
      padding: 5px 15px;
    }
  }
  td:first-child {
    grid-area: metric;
    color: ${({ theme }) => theme.common.colors.textSecondary};
    width: 245px;

    @media (max-width: 600px) {
      margin-top: 10px;
    }
  }
  td:nth-child(2) {
    grid-area: metric_name;
    width: 200px;
  }
  td:nth-child(3) {
    grid-area: meaning;

    @media (max-width: 600px) {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`

export const DocumentLink = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 5px;

  color: ${({ theme }) => theme.common.colors.textLink};
`

export const SourceText = styled.p`
  ${({ theme }) => theme.textStyleSmallParagraph};
  margin: 0;
  margin-top: -15px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.common.colors.textSecondary};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colors.textLink};

    &:hover {
      text-decoration: underline;
    }
  }
`
