import { RichText } from 'basehub/react-rich-text'

export const Body = ({ content }: { content: any }) => {
  return (
    <div className="prose max-w-max dark:prose-invert [&>*]:!leading-normal prose-li:my-0 text-foreground normal-case mt-8">
      <RichText content={content} />
    </div>
  )
}
