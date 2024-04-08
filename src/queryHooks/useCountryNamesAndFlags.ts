import { graphql, useStaticQuery } from 'gatsby'

const useCountryNamesAndFlags = () => {
  const {
    allStakeholdersCsv: { countries },
  } = useStaticQuery<Queries.CountryNamesAndFlagsQuery>(graphql`
    query CountryNamesAndFlags {
      allStakeholdersCsv(filter: { iso3: { ne: "" } }) {
        countries: nodes {
          iso3
          name
          flag {
            childImageSharp {
              gatsbyImageData(
                width: 92
                placeholder: BLURRED
                blurredOptions: { width: 46 }
              )
            }
          }
        }
      }
    }
  `)

  return countries
}

export default useCountryNamesAndFlags
