import { graphql, useStaticQuery } from 'gatsby'

const usePheicNames = () => {
  const {
    allAirtable: { pheicNames },
  } = useStaticQuery<Queries.UsePheicNamesQuery>(graphql`
    query UsePheicNames {
      allAirtable(filter: { table: { eq: "PHEIC" } }) {
        pheicNames: nodes {
          data {
            PHEIC_name
          }
        }
      }
    }
  `)

  return pheicNames
}

export default usePheicNames
