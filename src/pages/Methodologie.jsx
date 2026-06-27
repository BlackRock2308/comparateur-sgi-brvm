import { Database, FileCheck2, AlertTriangle, Scale } from 'lucide-react'
import { META } from '../lib/data'

export default function Methodologie() {
  return (
    <div className="mx-auto max-w-[820px] px-5 py-10 sm:px-6 sm:py-14">
      <div className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.30em] text-copper-300">
        <span className="h-px w-8 bg-copper-300" /> Méthodologie
      </div>
      <h1 className="font-serif text-[clamp(32px,6vw,54px)] font-bold leading-[1.05]">D'où viennent les données</h1>
      <p className="mt-5 max-w-[62ch] text-[16.5px] font-light text-fog2">
        FIRE Africa ne publie que des chiffres vérifiés. Voici exactement comment ce comparateur a été construit.
      </p>

      <div className="mt-9 flex flex-col gap-4">
        <Block icon={Database} title="Sources">
          La liste des SGI (nom, pays, note) provient du répertoire public de richbourse.com. Les
          <b className="text-cream"> tarifs détaillés</b> proviennent des <b className="text-cream">grilles
          d'homologation officielles</b> publiées par l'AMF-UMOA (ex-CREPMF) — le régulateur du marché financier de l'UMOA.
        </Block>
        <Block icon={FileCheck2} title="Vérification manuelle">
          Chaque grille tarifaire a été <b className="text-cream">lue et saisie à la main</b> à partir du PDF officiel
          (y compris des documents scannés, lus page par page). Aucun chiffre n'est estimé ou extrapolé — chaque
          tarif renvoie à son PDF source, consultable depuis la fiche de la SGI.
        </Block>
        <Block icon={AlertTriangle} title="Limites & notes d'intégrité" warn>
          <ul className="ml-4 list-disc space-y-1.5">
            <li><b className="text-cream">{META.avec_tarifs_detailles} SGI sur {META.total_sgi}</b> disposent à ce jour d'une grille détaillée ici ; les autres n'affichent que les infos de base.</li>
            <li>Un PDF fourni sous le nom « Africaine de Bourse » contenait en réalité la grille d'<b className="text-cream">Attijari Securities West Africa</b> → tarif attribué à Attijari.</li>
            <li>Le document <b className="text-cream">Hudson &amp; Cie</b> ne contenait pas sa grille → tarif marqué indisponible.</li>
            <li>Les tarifs sont des <b className="text-cream">plafonds homologués</b> : certains sont négociables et peuvent évoluer.</li>
          </ul>
        </Block>
        <Block icon={Scale} title="Avertissement">
          Cet outil est <b className="text-cream">informatif</b> et vise à aider à comparer en connaissance de cause.
          Ce n'est <b className="text-cream">pas un conseil en investissement personnalisé</b>. Vérifie toujours la
          grille à jour directement auprès de la SGI avant d'ouvrir un compte. Mise à jour : {META.maj}.
        </Block>
      </div>

      <p className="mt-9 font-serif text-[17px] italic text-copper-300">Devenez le roi de votre patrimoine. — FIRE Africa</p>
    </div>
  )
}

function Block({ icon: Icon, title, children, warn }) {
  return (
    <div className={`rounded-2xl border p-6 ${warn ? 'border-copper/30 bg-copper/[0.06]' : 'u-border glass-light'}`}>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl u-surf text-copper-300">
          <Icon size={19} />
        </div>
        <h2 className="font-serif text-xl font-bold text-cream">{title}</h2>
      </div>
      <div className="text-[14.5px] leading-relaxed text-fog2">{children}</div>
    </div>
  )
}
