import myPhoto from '../assets/me.jpg'
import { Socials, ExternalLink, Dialog } from '@/components'
import { useRef } from 'react'

export const Me = () => {
  const MY_NAME = 'EDMARK MAGSALIN';
  const currentYear = new Date().getFullYear();
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <div className='flex flex-wrap justify-center gap-4'>
      <img onClick={() => dialogRef.current?.showModal()} src={myPhoto} alt={MY_NAME} title={MY_NAME} id='myPhoto' className='cursor-pointer rounded-full' />
      <div className='self-center'>
        <h1 onClick={() => dialogRef.current?.showModal()} className='cursor-pointer'>{MY_NAME}</h1>
        <p>Web developer from Philippines <sup>🇵🇭</sup></p>
        <Socials />
      </div>
      <Dialog
        dialogRef={dialogRef}
      >
        <p>
          I've been a front-end developer for over <strong>{currentYear - 2017} years</strong> now, and for the last <strong>{currentYear - 2021} years</strong> I've been exposed to using <ExternalLink href='https://react.dev/' text='React'/> with <ExternalLink href='https://www.typescriptlang.org/' text='TypeScript'/>.
        </p>
        <p>
          I'm also knowledgeable about other JavaScript libraries, such as <ExternalLink href='https://redux-toolkit.js.org/rtk-query/overview' text='RTK Query'/> for fetching and caching data from an API and <ExternalLink href='https://redux-toolkit.js.org/' text='Redux Toolkit'/> for scalable global state management.
        </p>
        <p>
          Currently, I'm honing my skills in associating AI with my development process. To this day, I'm still improving at using AI.
        </p>
      </Dialog>
    </div>
  )
}