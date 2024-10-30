interface MarkdownProps {
  values: string
}

export default function Markdown({ values }: MarkdownProps) {
  return (
    <article
      dangerouslySetInnerHTML={{ __html: values }}
      className="
            prose
            prose-sm
            md:prose-base 
            prose-headings:pt-5
            prose-headings:text-font prose-headings:font-bold
            prose-h1:text-2xl
            prose-h2:text-xl prose-h3:text-[19px] prose-h4:text-lg
            prose-h5:text-[17px] prose-h6:text-xs
            prose-a:text-primary lg:prose-headings:pt-10
            lg:prose-h1:text-[28px] lg:prose-h2:text-[22px]
            lg:prose-h3:text-xl
            lg:prose-h4:text-lg lg:prose-h5:text-base
            lg:prose-h6:text-sm max-w-none
            pb-4
            text-font/80"
    />
  )
}
