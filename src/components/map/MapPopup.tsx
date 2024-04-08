import React, { Dispatch, SetStateAction } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { Link } from 'gatsby'

import CMS from 'components/library/airtable-cms'

import { LngLat } from 'mapbox-gl'
import { Popup } from 'react-map-gl'

import useCountriesReceivedAndDisbursed from 'queryHooks/useCountriesRecievedAndDisbursed'
import useCountryNamesAndFlags from 'queryHooks/useCountryNamesAndFlags'

import formatDisplayNumber from 'utilities/formatDisplayNumber'
import simplifyForUrl from 'utilities/simplifyForUrl'

const PopupContainer = styled.div`
  padding: 0px 5px 0px 5px;
`
const Flag = styled(GatsbyImage)`
  width: 46px;
  height: 46px;
  filter: drop-shadow(0.5px 0.5px 1px rgba(0, 0, 0, 0.35));
`
const CountryLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.common.colors.textPrimary};

  &:hover {
    text-decoration: underline;
  }
`
const H1 = styled.h1`
  ${({ theme }) => theme.textStyleH2}
  border-bottom: 1px solid ${({ theme }) => theme.common.colors.surfaceGray200};
  padding: 0px 20px 10px 0px;
  margin: 0px;
  display: flex;
  gap: 10px;
  align-items: center;
`
const FundsSection = styled.section`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: 15px;

  h2 {
    ${({ theme }) => theme.textStyleParagraph}
    margin: 0px;
    width: 12em;
  }

  p {
    ${({ theme }) => theme.textStyleMedNumber}
    margin: 0px;
  }
`

export interface PopupState {
  iso3: string
  lnglat: LngLat
  setPopupState: Dispatch<SetStateAction<PopupState | null>>
}

const MapPopup = ({ popupState }: { popupState: PopupState }) => {
  const { iso3, lnglat, setPopupState } = popupState

  const countriesRecievedAndDisbursed = useCountriesReceivedAndDisbursed()
  const countryNamesAndFlags = useCountryNamesAndFlags()

  const country = countriesRecievedAndDisbursed.find(
    country => country.iso3 === iso3
  )

  const nameAndFlag = countryNamesAndFlags.find(
    country => country.iso3 === iso3
  )

  return (
    <Popup
      longitude={lnglat.lng}
      latitude={lnglat.lat}
      anchor="bottom"
      closeOnClick={false}
      onClose={() => setPopupState(null)}
      maxWidth={'500px'}
    >
      <PopupContainer>
        <CountryLink to={`/country/${simplifyForUrl(nameAndFlag?.name ?? '')}`}>
          <H1>
            {nameAndFlag?.flag?.childImageSharp?.gatsbyImageData && (
              <Flag
                image={nameAndFlag?.flag.childImageSharp?.gatsbyImageData}
                alt={nameAndFlag?.name ?? ''}
              />
            )}
            {nameAndFlag?.name}
          </H1>
        </CountryLink>
        <FundsSection>
          <h2>Total funding disbursed 2014-2022 (USD)</h2>
          <p>{formatDisplayNumber(Number(country?.totalDisbursedReceived))}</p>
          <CMS.Icon name="Disbursed" />
        </FundsSection>
      </PopupContainer>
    </Popup>
  )
}

export default MapPopup
