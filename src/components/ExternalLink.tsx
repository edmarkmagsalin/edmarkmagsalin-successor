export const ExternalLink = ({href, text, className}: {href: string, text: string, className?: string}) => {
  return (
    <a href={href} target='_blank' rel='noreferrer' className={className}>
      {text}<small><sup>↗</sup></small>
    </a>
  )
}