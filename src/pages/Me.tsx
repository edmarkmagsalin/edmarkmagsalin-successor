import myPhoto from '../assets/me.jpg'
import { Socials, ExternalLink } from '@/components'
import { useRef } from 'react'

export const Me = () => {
  const MY_NAME = 'EDMARK MAGSALIN';
  const currentYear = new Date().getFullYear();
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <img onClick={() => dialogRef.current?.showModal()} src={myPhoto} alt={MY_NAME} title={MY_NAME} id='myPhoto' className='cursor-pointer rounded-full' />
      <div>
        <h1 onClick={() => dialogRef.current?.showModal()} className='cursor-pointer'>{MY_NAME}</h1>
        <p>Web developer from Philippines <sup>🇵🇭</sup></p>
        <Socials />
      </div>
      <dialog
        ref={dialogRef}
        onCancel={() => dialogRef.current?.close()}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close()
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault()
            dialogRef.current?.close()
          }
        }}
        className='fixed top-1/2 left-1/2 min-h-40 -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-blur-lg bg-white/20 p-8'
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
      </dialog>
    </>
  )
}