//  : carte produit factorisée, extraite de Home.tsx (refactor sans changement visuel)
import type { Bouquet, CartItem, Product, ProductDetailData } from "@/types"
import { formatPrice } from "@/data/format"
//  : photos de détail tirées du catalogue pour la page produit
import { detailPhotos } from "@/data/catalog"

//  : uniformité appliquée partout (Home et Produits) — décalage quincunx supprimé,
// toutes les cartes ont la même hauteur, longueur et largeur
const cardWrapperClasses = (index: number) =>
  [
    "min-w-0",
    //  : hauteur d'image identique pour toutes les cartes (39vw / 600px max, desktop)
    "md:[&_.productImage]:!h-[39vw] md:[&_.productImage]:!max-h-[600px]",
    "[&_.productImage]:!min-h-0 [&_.productImage]:bg-[#262620]",
    "[&_.productImage_img]:brightness-[.62] [&_.productImage_img]:saturate-[.72]",
    "[&_.productInfo]:!pt-5",
    "[&_.productInfo_h3]:!text-[25px]",
    "[&_.addButton]:!bg-transparent [&_.addButton:hover]:!bg-[#252522]",
    //  : carte étirée à la hauteur de sa rangée, bouton calé en bas (plus de prop uniforme)
    "h-full [&_.productCard]:flex [&_.productCard]:h-full [&_.productCard]:flex-col [&_.productInfo]:flex [&_.productInfo]:flex-col [&_.productInfo]:flex-1 [&_.addButton]:mt-auto",
  ].join(" ")

//  : props communes aux bouquets (Home) et aux produits tiges/plantes (page Produits)
export default function ProductCard({
  item,
  index,
  category,
  add,
  onOpen,
}: {
  item: Bouquet | Product
  index: number
  category: "bouquet" | "tige" | "plante"
  add: (item: CartItem) => void
  //  : callback optionnel — rend la photo cliquable vers la page détail produit
  onOpen?: (data: ProductDetailData) => void
}) {
  //  : narrowing par la présence du champ `size` (Bouquet) vs `label` (Product)
  if (!("size" in item)) {
    const isTige = category === "tige"
    return (
      //  : wrapper dedupliqué via la constante partagée cardWrapperClasses
      <div className={cardWrapperClasses(index)} key={item.id}>
        <article className="productCard">
          {/*  : photo cliquable vers la page détail produit */}
          <div
            className={onOpen ? "productImage clickableImage" : "productImage"}
            onClick={() =>
              onOpen?.({
                id: item.id,
                name: isTige ? `Tige ${item.label}` : `Plante ${item.label}`,
                price: item.price,
                image: item.image,
                note: item.note,
                photos: detailPhotos(item.id, item.image),
                category: isTige ? "tige" : "plante",
                detail: isTige ? "Tige" : "Plante",
              })
            }
          >
            {/*  : alt hérité de la logique Home, adapté aux labels tige/plante */}
            <img
              src={item.image}
              alt={`${isTige ? "Tige" : "Plante"} ${item.label}`}
            />
          </div>
          <div className="productInfo">
            <div>
              <h3>{item.label}</h3>
              <strong>{formatPrice(item.price)}</strong>
            </div>
            <p>{item.note}</p>
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
            <button
              className="addButton"
              onClick={() =>
                add({
                  id: item.id,
                  name: isTige ? `Tige ${item.label}` : `Plante ${item.label}`,
                  price: item.price,
                  image: item.image,
                  detail: isTige ? "Tige" : "Plante",
                })
              }
            >
              Ajouter au panier <span>+</span>
            </button>
          </div>
        </article>
      </div>
    )
  }

  //  : branche bouquet, identique au JSX de Home.tsx au mot près
  return (
    //  : wrapper dedupliqué via la constante partagée cardWrapperClasses
    <div className={cardWrapperClasses(index)} key={item.id}>
      <article className="productCard">
        {/*  : photo cliquable vers la page détail produit */}
        <div
          className={onOpen ? "productImage clickableImage" : "productImage"}
          onClick={() =>
            onOpen?.({
              id: item.id,
              name: `Bouquet ${item.size}`,
              price: item.price,
              image: item.image,
              note: item.note,
              photos: detailPhotos(item.id, item.image),
              category: "bouquet",
              detail: `Taille ${item.size}`,
            })
          }
        >
          <img
            src={item.image}
            alt={index === 1 ? "" : `Bouquet taille ${item.size}`}
          />
        </div>
        <div className="productInfo">
          <div>
            <h3>{item.size}</h3>
            <strong>{formatPrice(item.price)}</strong>
          </div>
          <p>{item.note}</p>
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
          <button
            className="addButton"
            onClick={() =>
              add({
                id: item.id,
                name: `Bouquet ${item.size}`,
                price: item.price,
                image: item.image,
                detail: `Taille ${item.size}`,
              })
            }
          >
            Ajouter au panier <span>+</span>
          </button>
        </div>
      </article>
    </div>
  )
}
