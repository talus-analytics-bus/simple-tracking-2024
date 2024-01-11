import { AirtableCMSData } from 'components/library/airtable/cms-types'

// helper function for finding text in an AirtableCMSData
// object, and returning that as a string, with error
// handling which can be disabled using noEmitError.
function getCMSText(
  data: AirtableCMSData,
  name: string,
  noEmitError: true
): string | undefined
function getCMSText(
  data: AirtableCMSData,
  name: string,
  noEmitError: boolean
): string | undefined
function getCMSText(
  data: AirtableCMSData,
  name: string,
  noEmitError?: false
): string
function getCMSText(
  data: AirtableCMSData,
  name: string,
  noEmitError?: true | false | boolean | undefined
) {
  const text = data.nodes.find(n => n.data.Name === name)?.data.Text
  if (text) return text
  if (noEmitError === true) return undefined
  throw new Error(
    `Text section ${name} not found in ` +
      `the Airtable data specified. Does that ` +
      `query include the right tables, and ` +
      `does one of those tables include a ` +
      `section called ${name}?`
  )
}

export default getCMSText
