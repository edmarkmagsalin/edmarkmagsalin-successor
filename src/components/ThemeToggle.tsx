import { useState, type MouseEvent } from 'react'
import { MonitorCog, Moon, Sun } from 'lucide-react'

type Theme = 'dark' | 'light' | null;

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme") as Theme);
  const changeTheme = (event: MouseEvent<HTMLAnchorElement>, theme: Theme) => {
    event.preventDefault();
    const html = document.documentElement;
    if(theme==='light' || theme==='dark') {
      localStorage.setItem("theme", theme);
      html.setAttribute('data-theme', theme);
      setTheme(theme);
    } else {
      localStorage.removeItem("theme");
      html.removeAttribute('data-theme');
      setTheme(null);
    }
  }
  const themeConfig = [
    {
      theme: null,
      title: 'OS Default',
      component: <MonitorCog size={15} />
    },
    {
      theme: 'dark',
      title: 'Dark',
      component: <Moon size={15} />,
    },
    {
      theme: 'light',
      title: 'Light',
      component: <Sun size={15} />,
    },
  ]
  return (
    <ul className="flex self-center gap-2">
      {
        themeConfig.map(config => (
          <li>
            <a
              onClick={(event) => changeTheme(event, config.theme as Theme)}
              className={`cursor-pointer ${theme === config.theme as Theme && 'active'}`}
              title={config.title}
            >
              {config.component}
            </a>
          </li>
        ))
      }
    </ul>
  )
}