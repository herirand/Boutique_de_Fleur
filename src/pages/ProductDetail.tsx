// NOUVEAU : page détail produit (modèle Vaese) — galerie à gauche, infos et achat à droite
import { useState } from "react"
import type { CartItem, Page, ProductDetailData } from "@/types"
import { formatPrice } from "@/data/format"

export default function ProductDetail({
  data,
  add,
  go,
}: {
  data: ProductDetailData
  add: (item: CartItem) => void
  go: (p: Page) => void
}) {
  // NOUVEAU : la photo principale peut être remplacée par un clic sur les miniatures
  const [main, setMain] = useState(data.image)

  // NOUVEAU : le sur mesure passe par un devis, les autres produits par le panier
  const isSurMesure = data.category === "surmesure"

  return (
    <main className="productDetail">
      {/* NOUVEAU : fil d'Ariane, retour vers la page Produits */}
      <nav className="detailBreadcrumb" aria-label="Fil d'Ariane">
        <button onClick={() => go("produits")}>La boutique</button>
        <span>›</span>
        <span>{data.name}</span>
      </nav>

      <div className="detailLayout">
        {/* NOUVEAU : côté gauche — photo principale + 4 photos côte à côte, cliquables */}
        <div className="detailGallery">
          <div className="detailMain">
            <img src={main} alt={data.name} />
          </div>
          <div className="detailThumbs">
            {data.photos.map((p, i) => (
              <button
                key={p}
                className={main === p ? "active" : ""}
                onClick={() => setMain(p)}
                aria-label={`Photo ${i + 1} de ${data.name}`}
              >
                <img src={p} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>

        {/* NOUVEAU : côté droite — petite ligne de détail, sélection et achat */}
        <div className="detailInfo">
          <p className="eyebrow">La boutique</p>
          <h2>{data.name}</h2>
          <strong className="detailPrice">
            {formatPrice(data.price)}
            {isSurMesure ? " et plus" : ""}
          </strong>
          <p className="detailNote">{data.note}</p>
          <p className="detailDelivery">
            Livraison par coursier uniquement dans les zones de livraison de
            l’atelier.
          </p>

          {/* NOUVEAU : mêmes options de sélection que sur les cartes produits */}
          <label>
            Couleur
            <select defaultValue="Chaudes (ocre / jaune / orange)">
              <option>Chaudes (ocre / jaune / orange)</option>
              <option>Froides (violet / bleu)</option>
              <option>Mélangées (chaud et froid)</option>
              <option>Neutres (rose / blanc)</option>
            </select>
          </label>
          <label>
            Forme
            <select defaultValue="Rond">
              <option>Rond</option>
              <option>Structuré</option>
              <option>Piqué sur mousse</option>
            </select>
          </label>

          {/* NOUVEAU : bouton achat (panier) ou devis pour le sur mesure */}
          {isSurMesure ? (
            <button className="addButton" onClick={() => go("contact")}>
              Demander un devis <span>+</span>
            </button>
          ) : (
            <button
              className="addButton"
              onClick={() =>
                add({
                  id: data.id,
                  name: data.name,
                  price: data.price,
                  image: data.image,
                  detail: data.detail,
                })
              }
            >
              Ajouter au panier <span>+</span>
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
