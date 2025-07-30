interface HTMLContentProps {
  content: string
  className?: string
}

export function HTMLContent({ content, className = '' }: HTMLContentProps) {
  return (
    <div 
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}