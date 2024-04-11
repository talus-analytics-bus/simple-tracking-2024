import { graphql, useStaticQuery } from 'gatsby'

const usePheicNames = () => {
  const {
    allAirtable: { pheicNames },
  } = useStaticQuery<Queries.UsePheicNamesQuery>(graphql`
    query UsePheicNames {
      allAirtable(
        filter: { table: { eq: "PHEIC" } }
        sort: { data: { Order: ASC } }
      ) {
        pheicNames: nodes {
          data {
            PHEIC_name
            PHEIC_database_name
          }
        }
      }
    }
  `)

  return pheicNames
}

export default usePheicNames
