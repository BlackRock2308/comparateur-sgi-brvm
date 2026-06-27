import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Percent, Wallet, Archive, Globe, MonitorSmartphone, Headphones, ArrowRight } from 'lucide-react'

const CRITERIA = [
  { icon: ShieldCheck, t: "L'agrément AMF-UMOA", d: "Le filtre non négociable. Seule une SGI agréée (ex-CREPMF) peut détenir tes titres en toute sécurité. Ne passe jamais par un intermédiaire non agréé." },
  { icon: Percent, t: "Les frais de courtage", d: "Prélevés à chaque achat/vente. D'une SGI à l'autre, ils vont d'environ 0,65 % à 1 % — soit, pour les mêmes ordres, un écart qui peut peser lourd sur le long terme." },
  { icon: Wallet, t: "Le dépôt minimum à l'ouverture", d: "Très variable selon la SGI. Il détermine si tu peux commencer petit. Regarde aussi les éventuels frais d'ouverture de compte." },
  { icon: Archive, t: "Droits de garde & tenue de compte", d: "Les frais récurrents (conservation des titres, tenue de compte) grignotent le rendement année après année. Plusieurs SGI offrent la tenue de compte gratuite." },
  { icon: Globe, t: "L'accès à distance / diaspora", d: "Toutes les SGI n'acceptent pas les dossiers depuis l'étranger. Vérifie l'ouverture en ligne et l'acceptation des non-résidents — un atout clé pour la diaspora." },
  { icon: MonitorSmartphone, t: "La plateforme", d: "Passage d'ordres en ligne, application mobile, suivi du portefeuille en temps réel : le confort fait que tu investis vraiment, au lieu de procrastiner." },
  { icon: Headphones, t: "Le service client & le conseil", d: "Réactivité (WhatsApp, e-mail), qualité de l'accompagnement et des analyses. Précieux quand on débute et qu'on part de zéro." },
]

export default function Guide() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-10 sm:px-6 sm:py-14">
      <div className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.30em] text-copper-300">
        <span className="h-px w-8 bg-copper-300" /> Guide
      </div>
      <h1 className="max-w-[18ch] font-serif text-[clamp(32px,6vw,58px)] font-bold leading-[1.04]">
        Comment choisir sa <em className="italic text-copper-300">SGI</em>
      </h1>
      <p className="mt-5 max-w-[60ch] text-[17px] font-light text-fog2">
        Avant de comparer les noms, compare les bons critères. Voici les 7 points qui font vraiment la
        différence — pour minimiser les frottements et investir l'esprit tranquille.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {CRITERIA.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            className="card-cream flex gap-5 rounded-2xl border u-border p-5 text-ink shadow-card sm:p-6">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-navy text-copper-300">
              <c.icon size={22} />
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-lg font-bold text-copper">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-serif text-[20px] font-bold text-navy">{c.t}</h2>
              </div>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5c5440]">{c.d}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border u-border p-7 on-navy sm:flex-row sm:items-center sm:justify-between"
        style={{ background: 'linear-gradient(160deg,#1b2a4a,#13203a)' }}>
        <div>
          <h3 className="font-serif text-2xl font-bold text-cream">Prêt à comparer ?</h3>
          <p className="mt-1 text-[14px] text-fog2">Les frais réels des SGI, côte à côte.</p>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-copper px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#b06d31]">
          Ouvrir le comparateur <ArrowRight size={16} />
        </Link>
      </div>

      <p className="mt-8 text-[12px] leading-relaxed text-fog">
        Le pas-à-pas détaillé (quel intermédiaire selon ton profil, comment ouvrir, comparatif complet) vit
        dans la newsletter FIRE Africa. Contenu informatif, pas un conseil en investissement personnalisé.
      </p>
    </div>
  )
}
