import { useParams, Link, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, ShieldCheck, Stamp, Wallet, GitCompare, Check } from 'lucide-react'
import { Stars, Pill, Badge } from '../components/ui'
import { getById, SGIS, fmtPct, isFree, PDF_BASE } from '../lib/data'

export default function SgiDetail() {
  const { id } = useParams()
  const { sel, toggle } = useOutletContext()
  const sgi = getById(id)

  if (!sgi)
    return (
      <Wrap>
        <p className="py-20 text-center text-fog">SGI introuvable. <Link to="/" className="text-copper underline">Retour</Link></p>
      </Wrap>
    )

  const hasTarif = sgi.tarif_status === 'complet'
  const related = SGIS.filter((s) => s.pays === sgi.pays && s.id !== sgi.id && s.tarif_status === 'complet').slice(0, 4)
  const selected = sel.includes(sgi.id)

  return (
    <Wrap>
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-fog transition hover:text-cream">
        <ArrowLeft size={16} /> Tous les SGI
      </Link>

      {/* HERO BAND */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border u-border p-7 sm:p-10 on-navy"
        style={{ background: 'radial-gradient(700px 360px at 90% -30%, rgba(196,123,60,0.22), transparent 60%), linear-gradient(160deg,#1b2a4a,#13203a)' }}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Pill>{sgi.pays || '—'}</Pill>
          <Stars note={sgi.note} light />
        </div>
        <h1 className="max-w-[20ch] font-serif text-[clamp(30px,5vw,52px)] font-bold leading-[1.05] text-cream">
          {sgi.nom}
        </h1>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[13.5px] text-fog2">
          {sgi.agrement && <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-copper-300" /> {sgi.agrement}</span>}
          {sgi.decision && <span className="inline-flex items-center gap-2"><Stamp size={15} className="text-copper-300" /> {sgi.decision}</span>}
          {sgi.min_ouverture && <span className="inline-flex items-center gap-2"><Wallet size={15} className="text-copper-300" /> Ouverture dès {sgi.min_ouverture}{sgi.frais_ouverture ? ` (frais ${sgi.frais_ouverture})` : ''}</span>}
        </div>

        {hasTarif && (
          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl border u-border glass-light px-6 py-4">
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.16em] text-fog">Courtage / transaction</div>
              <div className="font-serif text-[44px] font-extrabold leading-none text-white tnum">{fmtPct(sgi.courtage_pct)}</div>
            </div>
          </div>
        )}
      </motion.div>

      {sgi.note_extra && (
        <p className="mt-6 rounded-2xl border-l-[3px] border-copper bg-copper/10 px-5 py-4 text-[14px] text-copper-200">
          ℹ️ {sgi.note_extra}
        </p>
      )}

      {/* FEES */}
      {hasTarif ? (
        <div className="card-cream mt-6 overflow-hidden rounded-3xl border u-border text-ink shadow-card">
          <div className="border-b border-ink/10 px-6 py-5 sm:px-8">
            <h2 className="font-serif text-2xl font-bold text-navy">Grille tarifaire homologuée</h2>
            <p className="mt-1 text-[12.5px] text-sand">Plafonds AMF-UMOA (ex-CREPMF). Certains tarifs sont négociables.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="text-left text-[10.5px] uppercase tracking-[0.08em] text-sand">
                  <th className="px-6 py-3 sm:px-8">Rubrique</th>
                  <th className="px-4 py-3">Base de calcul</th>
                  <th className="px-6 py-3 text-right sm:px-8">Tarif</th>
                </tr>
              </thead>
              <tbody>
                {sgi.fees.map((f, i) => (
                  <tr key={i} className="border-t border-ink/10">
                    <td className="px-6 py-3.5 font-semibold text-navy sm:px-8">{f.label}</td>
                    <td className="px-4 py-3.5 text-[12px] text-sand">{f.base}</td>
                    <td className={`px-6 py-3.5 text-right font-semibold sm:px-8 ${isFree(f.value) ? 'text-ok' : 'text-navy'}`}>{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card-cream mt-6 rounded-3xl border u-border p-8 text-center text-sand shadow-card">
          Grille tarifaire non disponible dans nos sources pour cette SGI.
        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-6 flex flex-wrap gap-3">
        {sgi.source_pdf && (
          <a href={PDF_BASE + encodeURIComponent(sgi.source_pdf)} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-navy px-5 py-3.5 text-[13.5px] font-medium text-cream transition hover:bg-navy-600">
            <FileText size={18} className="text-copper-300" /> Voir la grille officielle (PDF)
          </a>
        )}
        {hasTarif && (
          <button onClick={() => toggle(sgi.id)}
            className={`inline-flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-[13.5px] font-semibold transition
              ${selected ? 'bg-ok/15 text-ok' : 'border border-copper text-copper hover:bg-copper/10'}`}>
            {selected ? <><Check size={18} /> Ajoutée au comparateur</> : <><GitCompare size={18} /> Ajouter au comparateur</>}
          </button>
        )}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-12">
          <h3 className="mb-4 font-serif text-xl font-bold text-cream">Autres SGI — {sgi.pays}</h3>
          <div className="flex flex-wrap gap-3">
            {related.map((r) => (
              <Link key={r.id} to={`/sgi/${r.id}`}
                className="group flex items-center gap-3 rounded-2xl border u-border glass-light px-4 py-3 transition hover:border-copper-300">
                <span className="text-[14px] font-medium text-cream group-hover:text-copper-200">{r.nom}</span>
                <span className="rounded-md u-surf px-2 py-0.5 text-[12px] font-semibold text-copper-200 tnum">{fmtPct(r.courtage_pct)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 text-[11.5px] leading-relaxed text-fog">
        Tarifs = plafonds homologués (souvent négociables). Vérifie toujours la grille à jour auprès de la SGI.
        Contenu informatif, pas un conseil en investissement.
      </p>
    </Wrap>
  )
}

const Wrap = ({ children }) => <div className="mx-auto max-w-[900px] px-5 py-8 sm:px-6 sm:py-12">{children}</div>
