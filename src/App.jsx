import { useState, useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import { CompareBar, CompareModal } from './components/compare'
import { getById, META } from './lib/data'
import Home from './pages/Home'
import SgiDetail from './pages/SgiDetail'
import Guide from './pages/Guide'
import Methodologie from './pages/Methodologie'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0 }), [pathname])
  return null
}

function Layout() {
  const [sel, setSel] = useState([])
  const [showCmp, setShowCmp] = useState(false)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' }
  })
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    try { localStorage.setItem('theme', theme) } catch (e) { /* ignore */ }
  }, [theme])

  const toggle = (id) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < 4 ? [...s, id] : s))
  const list = sel.map(getById).filter(Boolean)

  return (
    <>
      <ScrollTop />
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main className="min-h-[60vh] pb-32">
        <Outlet context={{ sel, toggle, clear: () => setSel([]) }} />
      </main>
      <CompareBar count={sel.length} onOpen={() => setShowCmp(true)} onClear={() => setSel([])} />
      <CompareModal open={showCmp} onClose={() => setShowCmp(false)} list={list} />
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-[1240px] border-t u-border px-5 py-9 text-[13px] text-fog sm:px-6">
      <p className="max-w-[75ch] text-fog2">{META.avertissement}</p>
      <p className="mt-2 text-[12px] text-fog">Source : {META.source} · Mise à jour {META.maj}.</p>
      <p className="mt-3.5 font-serif text-[17px] italic text-copper-300">
        Devenez le roi de votre patrimoine. — FIRE Africa × Omaad
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sgi/:id" element={<SgiDetail />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/methodologie" element={<Methodologie />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
