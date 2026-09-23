import {
  Home,
  Search,
  Star,
  MoreHorizontal
} from 'lucide-react'

import {
  NavLink
} from 'react-router-dom'

function BottomNav() {

  const links = [
    {
      to: '/',
      label: 'Home',
      icon: Home,
      end: true
    },
    {
      to: '/search',
      label: 'Search',
      icon: Search
    },
    {
      to: '/favorites',
      label: 'Favorites',
      icon: Star
    },
    {
      to: '/more',
      label: 'More',
      icon: MoreHorizontal
    }
  ]

  return (
    <nav
      className="bottom-nav"
      aria-label="Primary navigation"
    >

      {links.map(link => {

        const Icon = link.icon

        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">
              <Icon
                size={19}
                strokeWidth={2}
              />
            </span>

            <span>
              {link.label}
            </span>
          </NavLink>
        )
      })}

    </nav>
  )
}

export default BottomNav