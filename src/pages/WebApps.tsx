import { Weather } from '@/features/weather/Weather'

export const WebApps = () => {
  return(
    <div className='page-container max-w-200 bg-white/20 backdrop-blur-xl rounded-xl'>
       <ul className='carousel scrollbar-none'>
          <li data-item='1'>
            <Weather />
          </li>
          <li data-item='2'>
            <div className="flex flex-col justify-center text-center h-full">
              <small>Currently brewing apps. Stand by for more.</small>
            </div>
          </li>
       </ul>
    </div>
  )
}

