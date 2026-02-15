import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import "./styles.css"

export default function FormattedMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="markdown">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {markdown}
      </Markdown>
    </div>
  )
}
