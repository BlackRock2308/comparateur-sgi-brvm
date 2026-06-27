import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Crown, Check, ShieldCheck, Wallet } from 'lucide-react'
import { Stars, Badge, Pill } from './ui'
import { fmtPct, findFee } from '../lib/data'

export default function SgiCard({ sgi, selected, onToggle, cheapest, index = 0 }) {
  const hasTarif = sgi.tarif_status === 'complet'
  const isCheapest = hasTarif && cheapest != null && sgi.courtage_pct === cheapest
  const garde = findFee(sgi, 'garde')
  const tenue = findFee(sgi, 'tenue de compte')

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
      className={`group relative flex flex-col rounded-[18px] border u-border p-5 text-ink
        shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_-14px_rgba(8,14,28,0.55)]
        ${hasTarif ? 'card-cream' : 'card-cream-thin opacity-95'}`}>

      {isCheapest && (
        <div className="absolute -right-0.5 top-4 flex items-center gap-1.5 rounded-l-lg bg-copper
          py-1.5 pl-2.5 pr-3 text-[11px] font-semibold text-white shadow-[0_6px_14px_-4px_rgba(196,123,60,0.7)]">
          <Crown size={13} /> Le moins cher
        </div>
      )}

      <div className="mb-3.5 flex items-center justify-between gap-2.5">
        <Pill>{sgi.pays || '—'}</Pill>
        <Stars note={sgi.note} />
      </div>

      <Link to={`/sgi/${sgi.id}`}
        className="flex min-h-[50px] items-start font-serif text-[22px] font-bold leading-[1.12]
          text-navy transition hover:text-copper">
        {sgi.nom}
      </Link>

      {hasTarif ? (
        <div className="my-4 border-y border-ink/12 py-4">
          <div className="mb-1 text-[10.5px] uppercase tracking-[0.16em] text-sand">Courtage / transaction</div>
          <div className="flex items-baseline gap-2 font-serif text-[42px] font-extrabold leading-[0.95] text-navy tnum">
            {fmtPct(sgi.courtage_pct) || '—'}
          </div>
        </div>
      ) : (
        <div className="my-4 flex min-h-[74px] items-center border-y border-ink/12 py-4">
          <span className="text-sm italic text-sand">Tarifs non publiés ici</span>
        </div>
      )}

      {hasTarif && (
        <div className="mb-4 flex flex-col gap-2 text-[12.5px]">
          {garde && (
            <div className="flex items-baseline justify-between gap-3">
              <span className="flex-none text-sand">Droits de garde</span>
              <span className="min-w-0 break-words text-right font-semibold text-navy">{garde}</span>
            </div>
          )}
          {tenue && (
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sand">Tenue de compte</span>
              <span className="text-right font-semibold text-navy">{tenue}</span>
            </div>
          )}
        </div>
      )}

      <div className="mb-4 flex min-h-0 flex-wrap gap-1.5">
        {sgi.tenue_gratuite === true && <Badge ok><Check size={12} /> Tenue gratuite</Badge>}
        {sgi.agrement && <Badge><ShieldCheck size={12} /> Agréée AMF-UMOA</Badge>}
        {sgi.min_ouverture && <Badge><Wallet size={12} /> Dès {sgi.min_ouverture}</Badge>}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <Link to={`/sgi/${sgi.id}`}
          className="inline-flex items-center gap-1.5 py-1.5 text-sm font-semibold text-copper">
          Voir la fiche
          <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </Link>
        <label className={`inline-flex items-center gap-2 text-[12.5px] text-sand
          ${hasTarif ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}>
          <input type="checkbox" checked={selected} disabled={!hasTarif}
            onChange={() => onToggle(sgi.id)} className="h-4 w-4 accent-copper" />
          Comparer
        </label>
      </div>
    </motion.article>
  )
}
