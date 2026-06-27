import { motion } from 'framer-motion'
import { GitCompare } from 'lucide-react'
import { Sheet } from './ui'
import { COMPARE_ROWS, findFee, isFree, fmtPct } from '../lib/data'

export function CompareBar({ count, onOpen, onClear }) {
  if (count < 2) return null
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      className="fixed inset-x-3.5 bottom-3.5 z-50 flex max-w-[calc(100vw-28px)] items-center
        justify-between gap-4 rounded-2xl border u-border glass px-5 py-3 shadow-pop
        sm:inset-x-auto sm:left-1/2 sm:bottom-5 sm:-translate-x-1/2">
      <span className="text-[13.5px] text-cream">
        <b className="text-copper-300">{count}</b> SGI sélectionnées
      </span>
      <div className="flex items-center gap-3">
        <button onClick={onClear} className="text-[13px] text-fog underline">Effacer</button>
        <button onClick={onOpen}
          className="inline-flex items-center gap-2 rounded-xl bg-copper px-4 py-2.5 text-sm
            font-semibold text-white transition hover:bg-[#b06d31]">
          <GitCompare size={16} /> Comparer
        </button>
      </div>
    </motion.div>
  )
}

export function CompareModal({ open, onClose, list }) {
  const minCourtage = Math.min(...list.map((s) => s.courtage_pct ?? 99))
  return (
    <Sheet open={open} onClose={onClose} wide>
      <h2 className="mb-4 max-w-[90%] font-serif text-[clamp(24px,4vw,32px)] font-bold leading-tight text-navy">
        Comparer {list.length} SGI
      </h2>
      <div className="-mx-1 mb-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-cream-soft p-3 text-left" />
              {list.map((s) => (
                <th key={s.id} className="p-3 text-left align-bottom font-serif text-[15px] font-bold text-navy">
                  {s.nom}
                  <span className="mt-1.5 block text-[10px] font-normal uppercase tracking-wide text-copper">{s.pays}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <Th>Note</Th>
              {list.map((s) => <Td key={s.id}>{s.note != null ? `${String(s.note).replace('.', ',')}/5` : '—'}</Td>)}
            </tr>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.key}>
                <Th>{row.label}</Th>
                {list.map((s) => {
                  const v = findFee(s, row.key)
                  const best =
                    (row.key === 'transactions ordinaires' && s.courtage_pct === minCourtage) ||
                    (['tenue de compte'].includes(row.key) && isFree(v))
                  return (
                    <Td key={s.id} best={best}>
                      {v || '—'}{best ? ' ✓' : ''}
                    </Td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11.5px] leading-relaxed text-sand">
        Plafonds homologués (souvent négociables). ✓ = meilleure valeur de la sélection. Pas un conseil en investissement.
      </p>
    </Sheet>
  )
}

const Th = ({ children }) => (
  <td className="sticky left-0 min-w-[130px] border-b border-ink/12 bg-cream-soft p-3 text-left
    text-[11.5px] font-semibold uppercase tracking-wide text-sand">{children}</td>
)
const Td = ({ children, best }) => (
  <td className={`border-b border-ink/12 p-3 align-top ${best ? 'font-bold text-ok' : 'text-navy'}`}>{children}</td>
)
