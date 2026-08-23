import { ExternalLink } from '@/components';

export const Socials = () => {
  return (
    <ul className='flex gap-2'>
      <li>
        <ExternalLink href='https://www.linkedin.com/in/edmark-m-bb3713101/' text='LinkedIn'/>
      </li>
      <li>
        <ExternalLink href='https://github.com/edmarkmagsalin' text='GitHub'/>
      </li>
      <li>
        <ExternalLink href='mailto:edmarkmagsalin@gmail.com' text='Email'/>
      </li>
      <li>
        <ExternalLink href='https://docs.google.com/document/d/1w1N8zx1zzNM0yYree8bCOQ4ovTErBma277gUP42WH7I/edit?tab=t.0#heading=h.5x0d5h95i329' text='CV'/>
      </li>
    </ul>
  )
}