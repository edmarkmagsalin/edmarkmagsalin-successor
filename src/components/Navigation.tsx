import { NavLink } from 'react-router'

export const Navigation = () => {
  return (
    <ul className="flex self-center gap-6 mx-6 text-xs">
      <li>
        <NavLink to='/'>ME</NavLink>
      </li>
      <li>
        <NavLink to='/skills'>SKILLS</NavLink>
      </li>
      <li>
        <NavLink to='/projects'>PROJECTS</NavLink>
      </li>
      <li>
        {/* Update to be APPS when there will be app aside from weather app */}
        <NavLink to='/webapps'>WEATHER APP</NavLink>
      </li>
    </ul>
  )
}