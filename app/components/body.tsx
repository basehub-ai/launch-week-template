import { RichText } from 'basehub/react-rich-text'

export const Body = ({ content }: { content: any }) => {
  return (
    <div className="prose max-w-max dark:prose-invert [&>*]:!leading-normal prose-headings:text-base prose-headings:text-dim prose-a:text-accent prose-li:my-0 prose-video:my-8 prose-img:my-8 prose-li:[&>p]:!my-1 prose-li:marker:text-dim text-foreground normal-case mt-8">
      <RichText content={content} />
    </div>
  )
}
