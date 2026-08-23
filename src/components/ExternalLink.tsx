export const ExternalLink = ({href, text}: {href: string, text: string}) => {
  return (
    <a href={href} target='_blank'>
      {text}<small><sup>↗</sup></small>
    </a>
  )
}