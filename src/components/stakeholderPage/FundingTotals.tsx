import React from 'react'

interface FundingTotalsProps {
  data: Queries.CountryPageQuery
  selectedYear: string
}

const FundingTotals = ({ data, selectedYear }: FundingTotalsProps) => {
  let displayTotals = {} as { [key: string]: number }

  if (!data.allReceivedAndDisbursedCsv?.years)
    throw new Error(
      `No years found for country ${data.stakeholdersCsv?.name} in allReceivedAndDisbursedCsv`
    )

  if (selectedYear === 'All time')
    displayTotals = data.allReceivedAndDisbursedCsv.years.reduce(
      (acc, year) => {
        Object.entries(year).forEach(([key, val]) => {
          if (key !== 'Year')
            if (!acc[key]) acc[key] = Number(val)
            else acc[key] += Number(val)
        })
        return acc
      },
      {} as { [key: string]: number }
    )
  else
    Object.entries(
      data.allReceivedAndDisbursedCsv.years.find(
        year => year.Year === selectedYear
      ) ?? {}
    ).forEach(([key, val]) => {
      if (key !== 'Year') displayTotals[key] = Number(val)
    })

  return (
    <div>
      <table>
        <tbody>
          {Object.entries(displayTotals).map(([label, value]) => (
            <tr key={label}>
              <td style={{ textAlign: 'right' }}>${value.toLocaleString()}</td>
              <td style={{ paddingLeft: 20, textAlign: 'left' }}>
                {label.replaceAll('_', ' ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FundingTotals
