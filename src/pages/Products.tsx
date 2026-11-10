//  : page Produits (bouquets, tiges, plantes, sur mesure)
import type { CartItem, Page } from "@/types"
import { bouquets, plantes, tiges } from "@/data/catalog"
import { formatPrice } from "@/data/format"
import { photo } from "@/data/images"
import ProductCard from "@/components/ProductCard"
//  : prix minimum du sur mesure issu de la configuration du site
import config from "@/config/config.json"

export default function Products({
  add,
  go,
}: {
  add: (item: CartItem) => void
  go: (p: Page) => void
}) {
  return (
    <main>
      {/* NOUVEAU : intro sobre + navigation interne, style categoryNav de Home */}
      <section className="shopSection !bg-[#eee8dc] !px-[3.25vw] !pt-28 !pb-16">
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Produits</h2>
          <p>
            Composition libres, tiges rares et plantes vivantes, préparées à
            l’atelier. Pour une pièce unique dessinée avec nous, rendez-vous
            plus bas, à la rubrique « Sur mesure ».
          </p>
        </div>
      </section>

      {/* MODIFIÉ : nav interne sortie de la section d'intro, devenue enfant direct de <main> pour que le sticky categoryNav colle sous le header pendant tout le scroll de la page */}
      <section className="categoryNav !mb-0" aria-label="Catégories de produits">
        <a href="#bouquets">Bouquets</a>
        <a href="#tiges">Tiges</a>
        <a href="#plantes">Plantes</a>
        <a href="#surmesure">Sur mesure</a>
      </section>

      {/*  : même gabarit que la section Bouquets de Home, classe pour classe */}
      {/* MODIFIÉ : ajout de shopAnchor pour que l'ancre atterrisse sous la nav collante (scroll-margin-top: 190px) */}
      <section
        className="shopSection shopAnchor !bg-[#eee8dc] !px-[3.25vw] !pt-28 !pb-32"
        id="bouquets"
      >
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Bouquets</h2>
          <p>
            Composés librement à partir des plus belles fleurs disponibles ce
            matin.
          </p>
        </div>
        {/* MODIFIÉ : grille en 2 colonnes sur mobile au lieu de 1 (desktop inchangé, 4 colonnes) */}
        <div className="grid grid-cols-2 items-start gap-5 md:grid-cols-4">
          {bouquets.map((b, i) => (
            <ProductCard item={b} index={i} category="bouquet" add={add} key={b.id} />
          ))}
        </div>
      </section>

      {/*  : section Tiges, même gabarit */}
      {/* MODIFIÉ : shopAnchor + espacement vertical réduit (!pt-14 !pb-14) */}
      <section
        className="shopSection shopAnchor !bg-[#eee8dc] !px-[3.25vw] !pt-14 !pb-14"
        id="tiges"
      >
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Tiges</h2>
          <p>
            Tiges coupées rares, détaillées à l’unité pour vos propres
            compositions.
          </p>
        </div>
        {/* MODIFIÉ : grille en 2 colonnes sur mobile au lieu de 1 (desktop inchangé, 4 colonnes) */}
        <div className="grid grid-cols-2 items-start gap-5 md:grid-cols-4">
          {tiges.map((t, i) => (
            <ProductCard item={t} index={i} category="tige" add={add} key={t.id} />
          ))}
        </div>
      </section>

      {/*  : section Plantes, même gabarit */}
      {/* MODIFIÉ : shopAnchor + espacement vertical réduit (!pt-14 !pb-14) */}
      <section
        className="shopSection shopAnchor !bg-[#eee8dc] !px-[3.25vw] !pt-14 !pb-14"
        id="plantes"
      >
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Plantes</h2>
          <p>
            Plantes d’intérieur choisies, prêtes à trouver leur place chez
            vous.
          </p>
        </div>
        {/* MODIFIÉ : grille en 2 colonnes sur mobile au lieu de 1 (desktop inchangé, 4 colonnes) */}
        <div className="grid grid-cols-2 items-start gap-5 md:grid-cols-4">
          {plantes.map((p, i) => (
            <ProductCard
              item={p}
              index={i}
              category="plante"
              add={add}
              key={p.id}
            />
          ))}
        </div>
      </section>

      {/*  : section Sur mesure, une seule carte centrée, devis plutôt que panier */}
      {/* MODIFIÉ : shopAnchor + padding haut réduit, bas conservé en fin de page (!pt-14 !pb-32) */}
      <section
        className="shopSection shopAnchor !bg-[#eee8dc] !px-[3.25vw] !pt-14 !pb-32"
        id="surmesure"
      >
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Sur mesure</h2>
          <p>
            Une idée en tête ? Compositions déco, mariages ou évènements
            d’entreprise, imaginés et développés ensemble à l’atelier.
          </p>
        </div>
        {/* MODIFIÉ : grille en 2 colonnes sur mobile ; carte sur mesure pleine largeur sur mobile, centrée (col-start-2) en 4 colonnes sur desktop */}
        <div className="grid grid-cols-2 items-start gap-5 md:grid-cols-4">
          <div
            className={[
              // MODIFIÉ : col-span-2 sur mobile pour occuper toute la largeur, retour à 1 colonne + centrage sur desktop
              "min-w-0 col-span-2 md:col-span-1 md:col-start-2",
              //  : classes quincunx reprises de ProductCard/Home, sans bouton panier
              "[&_.productImage]:!h-[39vw] [&_.productImage]:!max-h-[600px]",
              "[&_.productImage]:!min-h-0 [&_.productImage]:bg-[#262620]",
              "[&_.productImage_img]:brightness-[.62] [&_.productImage_img]:saturate-[.72]",
              "[&_.productInfo]:!pt-5",
              "[&_.productInfo_h3]:!text-[25px]",
              "[&_.addButton]:!bg-transparent [&_.addButton:hover]:!bg-[#252522]",
            ].join(" ")}
          >
            <article className="productCard">
              <div className="productImage">
                <img
                  // photo() ignore les accents : passer "orchidee" et non "orchidées"
                  src={photo("bouquet orchidee ou page d'accueil.JPG")}
                  alt="Composition sur mesure de l'atelier"
                />
              </div>
              <div className="productInfo">
                <div>
                  <h3>Composition sur mesure</h3>
                  <strong>{formatPrice(config.surMesureMin)} et plus</strong>
                </div>
                <p>Recréés ensemble selon vos envies et votre budget</p>
                {/*  : bouton devis, ouvre la page contact sans ajout au panier */}
                <button className="addButton" onClick={() => go("contact")}>
                  Demander un devis <span>+</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
