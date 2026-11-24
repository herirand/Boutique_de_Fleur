// MODIFIÉ : page Nouveautés — ce sont désormais les produits de saison, comme sur la page Produits
import type { CartItem, Page, ProductDetailData } from "@/types"
import {
  activeSeason,
  seasonLabels,
  seasonNotes,
  seasonalProducts,
} from "@/data/catalog"
import ProductCard from "@/components/ProductCard"
// NOUVEAU : le cachet de saison distingue la page Nouveautés de la page Produits
import SeasonStamp from "@/components/SeasonStamp"

export default function News({
  add,
  go: _go,
  openDetail,
}: {
  add: (item: CartItem) => void
  go: (p: Page) => void
  openDetail: (data: ProductDetailData) => void
}) {
  return (
    <main className="nouveautesPage">
      <section className="shopSection newsPageHero">
        <div className="newsPageHeroRow">
          <div className="sectionIntro newsPageIntro">
            <p className="eyebrow">
              Sélection de saison · {seasonLabels[activeSeason]}
            </p>
            <h2>Nouveautés</h2>
            <p>{seasonNotes[activeSeason]}</p>
          </div>
          <SeasonStamp season={activeSeason} large />
        </div>
      </section>

      <section
        className="shopSection shopAnchor newsPageSection"
        id="nouveautes-produits"
      >
        <div className="sectionIntro newsPageSectionIntro">
          <p className="eyebrow">En ce moment à l’atelier</p>
          <h2>Les nouveautés de {seasonLabels[activeSeason].toLowerCase()}</h2>
          <p>
            Une sélection choisie pour la saison : ajoutez une pièce au panier
            ou ouvrez sa photo pour voir les détails.
          </p>
        </div>
        <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-4 produitsPage">
          {seasonalProducts.map((entry, index) => (
            <ProductCard
              item={entry.item}
              index={index}
              category={entry.category}
              add={add}
              onOpen={openDetail}
              key={entry.item.id}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
