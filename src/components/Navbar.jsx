import { useMemo } from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle.jsx'
import { useScrollSpy } from '../hooks/useScrollSpy.js'

const NAV_HEIGHT = 76

export default function Navbar({ onJump }) {
  const items = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'education', label: 'Education' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'skills', label: 'Skills' },
      { id: 'extras', label: 'Extras' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  const active = useScrollSpy(items.map((i) => i.id), NAV_HEIGHT)

  return (
    <header className="navWrap" style={{ height: NAV_HEIGHT }}>
      <motion.nav
        className="nav"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        aria-label="Primary"
      >
        <button className="brand" onClick={() => onJump('about')} aria-label="Go to top" type="button">
          <span className="brandMark">CD</span>
          <span className="brandText">Portfolio</span>
        </button>

        <div className="navItems" role="navigation" aria-label="Sections">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              className={active === it.id ? 'navLink active' : 'navLink'}
              onClick={() => onJump(it.id)}
            >
              {it.label}
            </button>
          ))}
        </div>

        <div className="navRight">
          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  )
}
