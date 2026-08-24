import { NavLink } from 'react-router'
import {
  UserRound,
  LayoutGrid,
  Folder,
  Terminal,
  Laptop
} from 'lucide-react'

const navigationConfig = [
  {
    path: '/',
    LinkText: 'Me',
    icon: <UserRound />
  },
  {
    path: '/skills',
    LinkText: 'Skills',
    icon: <Terminal />
  },
  {
    path: '/projects',
    LinkText: 'Projects',
    icon: <Folder />
  },
  {
    path: '/devices',
    LinkText: 'Devices',
    icon: <Laptop />
  },
  {
    path: '/webapps',
    LinkText: 'Weather App',
    icon: <LayoutGrid />
  },
]

export const Navigation = () => {
  return (
    <ul className="flex self-center gap-6 mx-6 text-xs">
      {
        navigationConfig.map(nav => 
          <li title={nav.LinkText}>
            <NavLink to={nav.path}>
              <span className='lg:hidden'>
                {nav.icon}
              </span>
              <span className='hidden lg:flex'>
                {nav.LinkText.toUpperCase()}
              </span>
            </NavLink>
          </li>
        )
      }
    </ul>
  )
}