import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

// takes a string of markdown and HTML from an airtable
// rich text field and returns a string of html
const parseCMSRichText = (string: string) =>
  String(
    unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .processSync(string)

    // unified().use(markdown).use(html, { sanitize: false }).processSync(string)
  )

export default parseCMSRichText
