import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

// takes a string of markdown and HTML from an airtable
// rich text field and returns a string of html
const parseCMSRichText = (string: string) => {
  const html = unified()
    .use(remarkParse)
    // @ts-expect-error
    .use(remarkRehype, { allowDangerousHtml: true })
    // @ts-expect-error
    .use(rehypeRaw)
    // @ts-expect-error
    .use(rehypeStringify)
    .processSync(string)

  console.log(html)

  return html
}

export default parseCMSRichText
