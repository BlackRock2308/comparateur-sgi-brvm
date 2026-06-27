import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { NAV } from '../lib/data'

function ThemeToggle({ theme, onToggle }) {
  return (
    <button onClick={onToggle} aria-label="Changer de thème"
      className="flex h-10 w-10 items-center justify-center rounded-xl glass-light border u-border
        text-copper-300 transition hover:text-copper-200">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [loc.pathname])

  const linkCls = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition ${
      isActive ? 'text-cream' : 'text-fog hover:text-cream'
    }`

  return (
    <header className={`sticky top-0 z-40 transition-all ${
      scrolled ? 'glass border-b u-border shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]' : ''
    }`}>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3.5 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="font-serif text-[19px] font-bold tracking-tight text-cream">
            FIRE <span className="text-copper-300">Africa</span>
          </span>
          <span className="hidden text-fog sm:inline">×</span>
          <span className="hidden text-[13px] font-light tracking-wide text-fog sm:inline">Omaad</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkCls}>
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && (
                    <motion.span layoutId="navdot"
                      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-copper" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <span className="rounded-full border border-copper/40 px-3 py-1.5 text-[11px] font-semibold
            uppercase tracking-[0.18em] text-copper-300">BRVM · SGI</span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl glass-light
              border u-border text-cream">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
            className="overflow-hidden glass border-b u-border md:hidden">
            <div className="flex flex-col gap-1 px-5 py-3">
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-[15px] font-medium ${
                      isActive ? 'bg-copper/15 text-copper-200' : 'text-fog'
                    }`}>
                  {n.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
