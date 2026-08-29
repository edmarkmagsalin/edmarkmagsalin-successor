import { Weather, TicTacToe } from '@/features'

export const WebApps = () => {
  return(
    <div className='page-container max-w-200 bg-white/20 backdrop-blur-xl rounded-xl'>
       <ul className='carousel scrollbar-none'>
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

