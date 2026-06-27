import { useState, useMemo, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, SlidersHorizontal, ChevronDown } from 'lucide-react'
import SgiCard from '../components/SgiCard'
import { Pagination } from '../components/ui'
import { SGIS, META, COUNTRIES, cheapestCourtage } from '../lib/data'

const PER_PAGE = 9
const SORTS = [
  { k: 'defaut', label: 'Pertinence' },
  { k: 'courtage', label: 'Courtage ↑' },
  { k: 'note', label: 'Mieux notées' },
  { k: 'nom', label: 'A→Z' },
]

export default function Home() {
  const { sel, toggle } = useOutletContext()
  const [q, setQ] = useState('')
  const [pays, setPays] = useState('')
  const [sort, setSort] = useState('defaut')
  const [onlyTarifs, setOnlyTarifs] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const activeFilters = (pays ? 1 : 0) + (onlyTarifs ? 1 : 0) + (sort !== 'defaut' ? 1 : 0)

  const filtered = useMemo(() => {
    let r = SGIS.filter((s) =>
      (!q || s.nom.toLowerCase().includes(q.toLowerCase())) &&
      (!pays || s.pays === pays) &&
      (!onlyTarifs || s.tarif_status === 'complet')
    )
    const col = new Intl.Collator('fr')
    if (sort === 'nom') r = [...r].sort((a, b) => col.compare(a.nom, b.nom))
    else if (sort === 'note') r = [...r].sort((a, b) => (b.note || 0) - (a.note || 0))
    else if (sort === 'courtage') r = [...r].sort((a, b) => (a.courtage_pct ?? 99) - (b.courtage_pct ?? 99))
    return r
  }, [q, pays, sort, onlyTarifs])

  useEffect(() => setPage(1), [q, pays, sort, onlyTarifs])
  const pages = Math.ceil(filtered.length / PER_PAGE)
  const view = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // changement de page = clic utilisateur uniquement (jamais de scroll au montage)
  const gridRef = useRef(null)
  const goPage = (n) => {
    setPage(n)
    requestAnimationFrame(() =>
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    )
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
      {/* HERO */}
      <section className="pb-4 pt-8 sm:pt-12">
        <div className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.30em] text-copper-300">
          <span className="h-px w-8 bg-copper-300" /> FIRE Africa — Outil
        </div>
        <h1 className="max-w-[15ch] font-serif text-[clamp(38px,7vw,76px)] font-bold leading-[1.02] tracking-[-0.015em]">
          Choisir sa <em className="italic text-copper-300">SGI</em> à la BRVM
        </h1>
        <p className="mt-5 max-w-[56ch] text-[clamp(15px,2.4vw,18.5px)] font-light text-fog2">
          Une SGI (Société de Gestion et d'Intermédiation) est l'intermédiaire agréé chez qui tu ouvres
          ton compte-titres pour investir à la BRVM. Compare-les en connaissance de cause.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-copper">
          <ShieldCheck size={16} /> Tarifs vérifiés sur les grilles officielles homologuées
        </div>

        <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border u-border glass-light sm:flex">
          <Stat n={META.total_sgi} l="SGI référencées" />
          <Stat n={META.avec_tarifs_detailles} l="avec tarifs détaillés" />
          <Stat n={META.regulateur} l="régulateur" sm full />
        </div>
      </section>

      {/* CONTROLS — non-sticky (défile avec la page), mobile-first, filtres repliables */}
      <div className="mt-7 rounded-2xl border u-border glass p-3 shadow-card sm:p-3.5">
        <div className="flex items-center gap-2.5">
          <div className="relative flex flex-1 items-center">
            <Search size={18} className="pointer-events-none absolute left-4 text-fog" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une SGI…"
              className="w-full rounded-xl border u-border u-surf py-3.5 pl-11 pr-4 text-[15px]
                text-cream placeholder:text-fog focus:border-copper focus:u-surf focus:outline-none" />
          </div>
          {/* bouton Filtres : mobile uniquement */}
          <button onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border u-border u-surf px-3.5 py-3.5
              text-[13px] font-medium text-cream sm:hidden">
            <SlidersHorizontal size={16} />
            Filtres{activeFilters ? ` (${activeFilters})` : ''}
            <ChevronDown size={15} className={`transition ${filtersOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* panneau filtres : toujours ouvert ≥sm, repliable en mobile */}
        <div className={`${filtersOpen ? 'grid' : 'hidden'} gap-3 sm:!grid`}>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            <Chip active={!pays} onClick={() => setPays('')}>Tous</Chip>
            {COUNTRIES.map((c) => (
              <Chip key={c} active={pays === c} onClick={() => setPays(c)}>{c}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex max-w-full overflow-x-auto rounded-xl border u-border u-surf p-0.5 no-scrollbar">
              {SORTS.map((s) => (
                <button key={s.k} onClick={() => setSort(s.k)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-[12.5px] font-medium transition
                    ${sort === s.k ? 'bg-copper font-semibold text-white' : 'text-fog'}`}>
                  {s.label}
                </button>
              ))}
            </div>
            <label className="inline-flex cursor-pointer select-none items-center gap-2.5 text-[13px] text-fog2">
              <input type="checkbox" checked={onlyTarifs} onChange={(e) => setOnlyTarifs(e.target.checked)} className="peer hidden" />
              <span className="relative h-[23px] w-10 flex-none rounded-full bg-fog/30 transition
                after:absolute after:left-[2.5px] after:top-[2.5px] after:h-[18px] after:w-[18px] after:rounded-full
                after:bg-white after:transition peer-checked:bg-copper peer-checked:after:translate-x-[17px]" />
              Tarifs détaillés
            </label>
            <span className="ml-auto whitespace-nowrap text-[12.5px] text-fog">
              {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* GRID */}
      {view.length ? (
        <div ref={gridRef} className="mt-6 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {view.map((s, i) => (
            <SgiCard key={s.id} sgi={s} index={i} cheapest={cheapestCourtage}
              selected={sel.includes(s.id)} onToggle={toggle} />
          ))}
        </div>
      ) : (
        <p className="py-[70px] text-center text-[15px] text-fog">Aucune SGI ne correspond à ta recherche.</p>
      )}

      <Pagination page={page} pages={pages} onPage={goPage} />
    </div>
  )
}

function Stat({ n, l, sm, full }) {
  return (
    <div className={`u-border px-6 py-5 sm:flex-1 sm:border-r sm:last:border-r-0
      ${full ? 'col-span-2 border-t sm:col-span-1 sm:border-t-0' : 'border-r'}`}>
      <div className={`font-serif font-extrabold leading-none text-cream tnum ${sm ? 'text-[clamp(18px,3vw,24px)]' : 'text-[clamp(26px,4vw,38px)]'}`}>{n}</div>
      <div className="mt-2 text-[11.5px] uppercase tracking-[0.10em] text-fog">{l}</div>
    </div>
  )
}
function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-medium transition
        ${active ? 'border-copper bg-copper font-semibold text-white' : 'u-border u-surf text-fog2 hover:border-copper-300 hover:text-white'}`}>
      {children}
    </button>
  )
}
