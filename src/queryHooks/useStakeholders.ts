import { graphql, useStaticQuery } from "gatsby"

const useStakeholders = () => {
  const { allStakeholdersCsv: { stakeholders } }
    = useStaticQuery<Queries.UseStakeholdersQuery>(graphql`
      query UseStakeholders {
        allStakeholdersCsv {
          stakeholders: nodes {
            name
            iso3
          }
        }
      }
    `)

  return stakeholders
}

export default useStakeholders
