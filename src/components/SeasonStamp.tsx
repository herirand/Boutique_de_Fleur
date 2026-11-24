// NOUVEAU : cachet de saison — signature visuelle des Nouveautés, absente de la page Produits
import { seasonLabels } from "@/data/catalog"
import type { Season } from "@/data/catalog"

export default function SeasonStamp({
  season,
  large = false,
}: {
  season: Season
  large?: boolean
}) {
  return (
    <div
      className={large ? "seasonStamp large" : "seasonStamp"}
      aria-label={`Sélection de ${seasonLabels[season].toLowerCase()}`}
    >
      <span className="seasonStampRing" aria-hidden="true" />
      <span className="seasonStampTop">Sélection</span>
      <span className="seasonStampName">{seasonLabels[season]}</span>
      <span className="seasonStampBottom">Atelier · Ifleur</span>
    </div>
  )
}
