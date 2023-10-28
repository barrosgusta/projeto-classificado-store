import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import  "./styles.css"

export default function FormattedMarkdown({ markdown }: { markdown: string }) {
    return (
        <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
            {markdown}
        </Markdown>
    )
}