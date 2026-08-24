import { NavLink } from 'react-router'
import {
  UserRound,
  LayoutGrid,
  Folder,
  Terminal
} from 'lucide-react'

const navigationConfig = [
  {
    path: '/',
    LinkText: 'ME',
    icon: <UserRound />
  },
  {
    path: '/skills',
    LinkText: 'SKILLS',
    icon: <Terminal />
  },
  {
    path: '/projects',
    LinkText: 'PROJECTS',
    icon: <Folder />
  },
  {
    path: '/webapps',
    LinkText: 'WEATHER APP',
    icon: <LayoutGrid />
  },
]

export const Navigation = () => {
  return (
    <ul className="flex self-center gap-6 mx-6 text-xs">
      {
        navigationConfig.map(nav => 
          <li>
            <NavLink to={nav.path}>
              <span className='sm:hidden'>
                {nav.icon}
              </span>
              <span className='hidden sm:flex'>
                {nav.LinkText}
              </span>
            </NavLink>
          </li>
        )
      }
    </ul>
  )
}