//  : page Produits (bouquets avec sur mesure en 5e carte, tiges, plantes)
import type { CartItem, Page, ProductDetailData } from "@/types"
import { bouquets, plantes, tiges } from "@/data/catalog"
import { formatPrice } from "@/data/format"
import { photo } from "@/data/images"
import ProductCard from "@/components/ProductCard"
//  : prix minimum du sur mesure issu de la configuration du site
import config from "@/config/config.json"

export default function Products({
  add,
  go,
  openDetail,
}: {
  add: (item: CartItem) => void
  go: (p: Page) => void
  //  : ouvre la page détail produit au clic sur une photo
  openDetail: (data: ProductDetailData) => void
}) {
  return (
    <main>
      {/* intro sobre + navigation interne, style categoryNav de Home */}
      <section className="shopSection !bg-[#eee8dc] !px-[3.25vw] !pt-28 !pb-16">
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Produits</h2>
          <p>
            Composition libres, tiges rares et plantes vivantes, préparées à
            l’atelier. Pour une pièce unique dessinée avec nous, choisissez la
            carte « Sur mesure » dans la rubrique Bouquets.
          </p>
        </div>
      </section>

      {/* nav interne sortie de la section d'intro, devenue enfant direct de <main> pour que le sticky categoryNav colle sous le header pendant tout le scroll de la page */}
      <section className="categoryNav !mb-0" aria-label="Catégories de produits">
        <a href="#bouquets">Bouquets</a>
        <a href="#tiges">Tiges</a>
        <a href="#plantes">Plantes</a>
        {/*  : lien sur mesure retiré, la carte a rejoint la grille Bouquets */}
      </section>

      {/*  : même gabarit que la section Bouquets de Home, classe pour classe */}
      {/* ajout de shopAnchor pour que l'ancre atterrisse sous la nav collante (scroll-margin-top: 190px) */}
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
        {/* grille en 2 colonnes sur mobile au lieu de 1 (desktop inchangé, 4 colonnes) */}
        {/*  : items-stretch + mode uniforme pour des cartes toutes de même hauteur/longueur/largeur */}
        <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-4">
          {bouquets.map((b, i) => (
            <ProductCard item={b} index={i} category="bouquet" add={add} onOpen={openDetail} key={b.id} />
          ))}
          {/*  : carte « Sur mesure » en cinquième carte de la grille Bouquets, devis plutôt que panier */}
          {/* col-span-2 sur mobile pour occuper toute la largeur ; 5e position sur desktop (2e rangée, plus de centrage md:col-start-2) */}
          <div
            className={[
              "min-w-0 col-span-2",
              //  : classes quincunx reprises de ProductCard/Home, sans bouton panier
              //  : hauteur d'image avec préfixe md: comme les autres cartes (format naturel 56vw sur mobile)
              "md:[&_.productImage]:!h-[39vw] md:[&_.productImage]:!max-h-[600px]",
              "[&_.productImage]:!min-h-0 [&_.productImage]:bg-[#262620]",
              "[&_.productImage_img]:brightness-[.62] [&_.productImage_img]:saturate-[.72]",
              "[&_.productInfo]:!pt-5",
              "[&_.productInfo_h3]:!text-[25px]",
              "[&_.addButton]:!bg-transparent [&_.addButton:hover]:!bg-[#252522]",
              //  : mêmes classes d'étirement que ProductCard (carte à la hauteur de sa rangée, bouton calé en bas)
              "h-full [&_.productCard]:flex [&_.productCard]:h-full [&_.productCard]:flex-col [&_.productInfo]:flex [&_.productInfo]:flex-col [&_.productInfo]:flex-1 [&_.addButton]:mt-auto",
            ].join(" ")}
          >
            <article className="productCard">
              {/*  : photo cliquable vers la page détail du sur mesure */}
              <div
                className="productImage clickableImage"
                onClick={() =>
                  openDetail({
                    id: 0,
                    name: "Composition sur mesure",
                    price: config.surMesureMin,
                    image: photo("bouquet orchidee ou page d'accueil.JPG"),
                    note: "Recréés ensemble selon vos envies et votre budget",
                    photos: [
                      photo("bouquet XL.JPG"),
                      photo("produit ou accueil.JPG"),
                      photo("option pour accueil ou a propos.JPG"),
                      photo("Apropos.jpeg"),
                    ],
                    category: "surmesure",
                    detail: "Sur mesure",
                  })
                }
              >
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

      {/*  : section Tiges, même gabarit */}
      {/* shopAnchor + espacement vertical réduit (!pt-14 !pb-14) */}
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
        {/* grille en 2 colonnes sur mobile au lieu de 1 (desktop inchangé, 4 colonnes) */}
        {/*  : items-stretch + mode uniforme pour des cartes toutes de même hauteur/longueur/largeur */}
        <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-4">
          {tiges.map((t, i) => (
            <ProductCard item={t} index={i} category="tige" add={add} onOpen={openDetail} key={t.id} />
          ))}
        </div>
      </section>

      {/*  : section Plantes, même gabarit */}
      {/* shopAnchor + espacement vertical réduit (!pt-14 !pb-14) */}
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
        {/* grille en 2 colonnes sur mobile au lieu de 1 (desktop inchangé, 4 colonnes) */}
        {/*  : items-stretch + mode uniforme pour des cartes toutes de même hauteur/longueur/largeur */}
        <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-4">
          {plantes.map((p, i) => (
            <ProductCard
              item={p}
              index={i}
              category="plante"
              add={add}
              onOpen={openDetail}
              key={p.id}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
