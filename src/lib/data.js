import dataset from '../data/sgi.json'

export const META = dataset.meta
export const SGIS = dataset.sgis

export const PDF_BASE = './pdfs/'

export const withTarifs = SGIS.filter((s) => s.tarif_status === 'complet')

// SGI au courtage le plus bas (pour la médaille « le moins cher »)
export const cheapestCourtage = (() => {
  const vals = withTarifs.map((s) => s.courtage_pct).filter((v) => v != null)
  return vals.length ? Math.min(...vals) : null
})()

export const COUNTRIES = [...new Set(SGIS.map((s) => s.pays).filter(Boolean))].sort()

export const getById = (id) => SGIS.find((s) => s.id === id)

export const fmtPct = (v) => (v == null ? null : `${String(v).replace('.', ',')} %`)

export const findFee = (sgi, kw) => {
  const k = kw.toLowerCase()
  const f = (sgi.fees || []).find((x) => x.label.toLowerCase().includes(k))
  return f ? f.value : null
}

export const isFree = (val) => !!val && /gratuit|n[ée]ant/i.test(val)

// rangées clés du comparateur
export const COMPARE_ROWS = [
  { key: 'transactions ordinaires', label: 'Courtage (ordinaire)' },
  { key: 'sur dossier', label: 'Courtage (sur dossier)' },
  { key: 'garde', label: 'Droits de garde' },
  { key: 'tenue de compte', label: 'Tenue de compte' },
  { key: 'gestion sous mandat', label: 'Gestion sous mandat' },
  { key: 'transfert', label: 'Transfert de titres' },
]

export const NAV = [
  { to: '/', label: 'Comparateur', end: true },
  { to: '/guide', label: 'Guide' },
  { to: '/methodologie', label: 'Méthodologie' },
]
