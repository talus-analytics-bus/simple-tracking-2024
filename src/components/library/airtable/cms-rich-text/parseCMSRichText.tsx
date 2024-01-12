import markdown from 'remark-parse'
import html from 'remark-html'

// takes a string of markdown and HTML from an airtable
// rich text field and returns a string of html
const parseCMSRichText = (string: string) =>
  String(
    // @ts-expect-error
    unified().use(markdown).use(html, { sanitize: false }).processSync(string)
  )

export default parseCMSRichText
