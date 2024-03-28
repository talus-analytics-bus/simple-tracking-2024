import { graphql, useStaticQuery } from 'gatsby'

const useRiskIndicies = () => {
  const riskIndicies = useStaticQuery<Queries.UseRiskIndiciesQuery>(graphql`
    query UseRiskIndicies {
      ghsi: allGhsiScores2021Csv(filter: { score: { ne: "" } }) {
        data: nodes {
          score
        }
      }
      idvi: allIdviScores2016Csv(filter: { overall_score_normed: { ne: "" } }) {
        data: nodes {
          score: overall_score_normed
        }
      }
      inform: allInformScores2022Csv(filter: { risk_score: { ne: "" } }) {
        data: nodes {
          score: risk_score
        }
      }
      wri: allWriScores2022Csv(filter: { world_risk_index: { ne: "" } }) {
        data: nodes {
          score: world_risk_index
        }
      }
    }
  `)

  return riskIndicies
}

export default useRiskIndicies
