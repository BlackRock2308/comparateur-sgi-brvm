import { motion, AnimatePresence } from 'framer-motion'
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react'

export function Stars({ note, light = false }) {
  if (note == null) return <span className={light ? 'text-fog' : 'text-sand'}>—</span>
  const full = Math.round(note)
  return (
    <span className="inline-flex items-center gap-1" title={`${note}/5`}>
      <span className="inline-flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={14}
            className={i < full ? 'fill-copper text-copper' : 'text-ink/15'} />
        ))}
      </span>
      <span className={`ml-1 text-xs font-medium ${light ? 'text-fog' : 'text-sand'} tnum`}>
        {String(note).replace('.', ',')}
      </span>
    </span>
  )
}

export function Badge({ children, ok = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold
      ${ok ? 'bg-ok/12 text-ok' : 'bg-ink/[0.07] text-navy'}`}>
      {children}
    </span>
  )
}

export function Pill({ children }) {
  return (
    <span className="rounded-full border border-copper/45 px-3 py-1 text-[11px] font-semibold
      uppercase tracking-wide text-copper">{children}</span>
  )
}

/* Modal centré (desktop) → bottom-sheet (mobile via CSS) */
export function Sheet({ open, onClose, children, wide = false }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60 flex items-end justify-center bg-[rgba(8,13,24,0.62)]
            p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className={`card-cream relative max-h-[92vh] w-full overflow-y-auto rounded-t-[22px]
              p-6 text-ink shadow-pop sm:max-h-[88vh] sm:rounded-[22px] sm:p-8
              ${wide ? 'sm:max-w-[1000px]' : 'sm:max-w-[660px]'}`}
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} aria-label="Fermer"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full
                bg-ink/[0.08] text-navy transition hover:bg-ink/15">
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null
  const nums = []
  const push = (n) => nums.push(n)
  const win = 1
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - win && i <= page + win)) push(i)
    else if (nums[nums.length - 1] !== '…') push('…')
  }
  const Btn = ({ disabled, onClick, children, label }) => (
    <button disabled={disabled} onClick={onClick} aria-label={label}
      className="flex h-10 min-w-10 items-center justify-center rounded-xl border u-border
        glass-light px-3 text-sm text-cream transition enabled:hover:border-copper-300
        disabled:opacity-30">
      {children}
    </button>
  )
  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      <Btn disabled={page === 1} onClick={() => onPage(page - 1)} label="Précédent">
        <ChevronLeft size={18} />
      </Btn>
      <div className="hidden items-center gap-2 sm:flex">
        {nums.map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="px-1 text-fog">…</span>
          ) : (
            <button key={n} onClick={() => onPage(n)}
              className={`h-10 min-w-10 rounded-xl px-3 text-sm font-medium transition
                ${n === page
                  ? 'bg-copper text-white shadow-[0_8px_20px_-6px_rgba(196,123,60,0.7)]'
                  : 'glass-light border u-border text-cream hover:border-copper-300'}`}>
              {n}
            </button>
          )
        )}
      </div>
      <span className="px-2 text-sm text-fog sm:hidden">Page {page} / {pages}</span>
      <Btn disabled={page === pages} onClick={() => onPage(page + 1)} label="Suivant">
        <ChevronRight size={18} />
      </Btn>
    </nav>
  )
}
