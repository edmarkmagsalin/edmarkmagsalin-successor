import { Assistant, Weather, TicTacToe } from '@/features'
import { useEffect, useRef } from 'react'

const CAROUSEL_STORAGE_KEY = 'web-apps-carousel-slide'

export const WebApps = () => {
  const carouselRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) {
      return
    }

    const savedSlide = Number.parseInt(
      window.localStorage.getItem(CAROUSEL_STORAGE_KEY) ?? '',
      10
    )

    if (Number.isInteger(savedSlide) && savedSlide >= 0) {
      window.requestAnimationFrame(() => {
        carousel.scrollTo({
          left: savedSlide * carousel.clientWidth,
          behavior: 'instant',
        })
      })
    }

    const saveScrollPosition = () => {
      const slide = Math.round(carousel.scrollLeft / carousel.clientWidth)
      window.localStorage.setItem(CAROUSEL_STORAGE_KEY, String(slide))
    }

    carousel.addEventListener('scrollend', saveScrollPosition)
    carousel.addEventListener('scroll', saveScrollPosition, { passive: true })

    return () => {
      carousel.removeEventListener('scrollend', saveScrollPosition)
      carousel.removeEventListener('scroll', saveScrollPosition)
    }
  }, [])

  return(
    <div className='page-container max-w-200 bg-white/20 backdrop-blur-xl rounded-xl'>
       <ul className='carousel scrollbar-none' ref={carouselRef}>
          <li>
            <Assistant />
          </li>
          <li>
            <Weather />
          </li>
          <li>
            <TicTacToe />
          </li>
          <li>
            <div className="flex flex-col justify-center text-center h-full">
              <small>Currently brewing apps. Stand by for more.</small>
            </div>
          </li>
       </ul>
    </div>
  )
}

