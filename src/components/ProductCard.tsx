//  : carte produit factorisée, extraite de Home.tsx (refactor sans changement visuel)
import type { Bouquet, CartItem, Product } from "@/types"
import { formatPrice } from "@/data/format"

// NOUVEAU : classes du wrapper factorisées, partagées par les branches bouquet et tige/plante
const cardWrapperClasses = (index: number) =>
  [
    "min-w-0",
    index === 1 || index === 2 ? "md:mt-20" : "",
    // MODIFIÉ : hauteurs produits réservées au desktop (md:), format naturel sur mobile
    index === 1 || index === 2
      ? "md:[&_.productImage]:!h-[32vw] md:[&_.productImage]:!max-h-[490px]"
      : "md:[&_.productImage]:!h-[39vw] md:[&_.productImage]:!max-h-[600px]",
    "[&_.productImage]:!min-h-0 [&_.productImage]:bg-[#262620]",
    "[&_.productImage_img]:brightness-[.62] [&_.productImage_img]:saturate-[.72]",
    "[&_.productInfo]:!pt-5",
    "[&_.productInfo_h3]:!text-[25px]",
    "[&_.addButton]:!bg-transparent [&_.addButton:hover]:!bg-[#252522]",
  ].join(" ")

//  : props communes aux bouquets (Home) et aux produits tiges/plantes (page Produits)
export default function ProductCard({
  item,
  index,
  category,
  add,
}: {
  item: Bouquet | Product
  index: number
  category: "bouquet" | "tige" | "plante"
  add: (item: CartItem) => void
}) {
  //  : narrowing par la présence du champ `size` (Bouquet) vs `label` (Product)
  if (!("size" in item)) {
    const isTige = category === "tige"
    return (
      // MODIFIÉ : wrapper dedupliqué via la constante partagée cardWrapperClasses
      <div className={cardWrapperClasses(index)} key={item.id}>
        <article className="productCard">
          <div className="productImage">
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
    // MODIFIÉ : wrapper dedupliqué via la constante partagée cardWrapperClasses
    <div className={cardWrapperClasses(index)} key={item.id}>
      <article className="productCard">
        <div className="productImage">
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
