// MODIFIÉ : page Nouveautés en galerie photo — cartes visuelles conservées, sans achat
import {
  activeSeason,
  seasonLabels,
  seasonNotes,
  seasonalProducts,
} from "@/data/catalog"

// NOUVEAU : mêmes classes que ProductCard, sans prix, sélecteurs ni bouton d'achat
const galleryCardWrapperClasses = [
  "min-w-0",
  "md:[&_.productImage]:!h-[39vw] md:[&_.productImage]:!max-h-[600px]",
  "[&_.productImage]:!min-h-0 [&_.productImage]:bg-[#262620]",
  "[&_.productImage_img]:brightness-[.62] [&_.productImage_img]:saturate-[.72]",
  "[&_.productInfo]:!pt-5",
  // MODIFIÉ : titre limité à 25px sur desktop, 20px sur mobile
  "md:[&_.productInfo_h3]:!text-[25px]",
  "h-full [&_.productCard]:flex [&_.productCard]:h-full [&_.productCard]:flex-col [&_.productInfo]:flex [&_.productInfo]:flex-col [&_.productInfo]:flex-1",
].join(" ")

export default function News() {
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
        </div>
      </section>

      <section
        className="shopSection shopAnchor newsPageSection"
        id="nouveautes-produits"
      >
        <div className="sectionIntro newsPageSectionIntro">
          <p className="eyebrow">En ce moment à l’atelier</p>
          <h2>Les nouveautés de {seasonLabels[activeSeason].toLowerCase()}</h2>
          {/* MODIFIÉ : la page devient une galerie, sans invitation à acheter */}
          <p>
            Une sélection choisie pour la saison, à parcourir comme un carnet de
            l’atelier.
          </p>
        </div>
        {/* MODIFIÉ : la galerie ne reprend pas le cadrage 3/4 réservé à Produits */}
        <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-4">
          {/* MODIFIÉ : cartes visuelles identiques, sans prix ni interactions d'achat */}
          {seasonalProducts.map((entry) => {
            const { item, category } = entry
            const isBouquet = "size" in item
            const isTige = category === "tige"
            const title = isBouquet ? item.size : item.label
            const alt = isBouquet
              ? `Bouquet taille ${item.size}`
              : `${isTige ? "Tige" : "Plante"} ${item.label}`

            return (
              <div className={galleryCardWrapperClasses} key={item.id}>
                <article className="productCard">
                  <div className="productImage">
                    <img
                      src={item.image}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="productInfo">
                    <div>
                      <h3>{title}</h3>
                    </div>
                    <p>{item.note}</p>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
