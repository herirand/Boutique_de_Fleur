// page d'accueil extraite de App.tsx
import type { CartItem, Page } from "@/types"
import { bouquets, heroImage, homePreview } from "@/data/catalog"
// formatage des prix en Ariary
import { formatPrice } from "@/data/format"
import Arrow from "@/components/Arrow"
import FAQ from "@/components/FAQ"

export default function Home({
  add,
  go,
}: {
  add: (item: CartItem) => void
  go: (p: Page) => void
}) {
  return (
    <>
      <section className="hero">
        <img
          src={heroImage}
          alt="Composition florale sculpturale aux teintes profondes"
        />
        <div className="heroShade" />
        <div className="heroCopy">
          <p className="eyebrow light heroEyebrowEdited">
            Atelier floral · créations de saison
          </p>
          <h1>
            <span className="block">Des fleurs pour</span>
            <span className="block">les moments qui comptent.</span>
          </h1>
          <p className="heroDescriptionEdited">
            Des compositions singulières, sublimées par nosanthuriums.
          </p>
          <div className="actions">
            <a className="button pale" href="#boutique">
              Découvrir nos fleurs
            </a>
            <button className="button ghost" onClick={() => go("contact")}>
              Demander un devis
            </button>
          </div>
        </div>
        <span className="scrollCue">
          Faire défiler <i />
        </span>
      </section>

      <section className="categoryNav" aria-label="Catégories">
        <a href="#bouquets">Produits</a>
        <a href="#abonnements">Abonnements</a>
      </section>

      <main id="boutique">
        <section
          className="shopSection !bg-[#eee8dc] !px-[3.25vw] !pt-28 !pb-32"
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
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-4">
            {bouquets.map((bouquet, index) => (
              <div
                className={[
                  "min-w-0",
                  index === 1 || index === 2 ? "md:mt-20" : "",
                  index === 1 || index === 2
                    ? "[&_.productImage]:!h-[32vw] [&_.productImage]:!max-h-[490px]"
                    : "[&_.productImage]:!h-[39vw] [&_.productImage]:!max-h-[600px]",
                  "[&_.productImage]:!min-h-0 [&_.productImage]:bg-[#262620]",
                  "[&_.productImage_img]:brightness-[.62] [&_.productImage_img]:saturate-[.72]",
                  "[&_.productInfo]:!pt-5",
                  "[&_.productInfo_h3]:!text-[25px]",
                  "[&_.addButton]:!bg-transparent [&_.addButton:hover]:!bg-[#252522]",
                ].join(" ")}
                key={bouquet.id}
              >
                <article className="productCard">
                  <div className="productImage">
                    <img
                      src={bouquet.image}
                      alt={index === 1 ? "" : `Bouquet taille ${bouquet.size}`}
                    />
                  </div>
                  <div className="productInfo">
                    <div>
                      <h3>{bouquet.size}</h3>
                      <strong>{formatPrice(bouquet.price)}</strong>
                    </div>
                    <p>{bouquet.note}</p>
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
                          id: bouquet.id,
                          name: `Bouquet ${bouquet.size}`,
                          price: bouquet.price,
                          image: bouquet.image,
                          detail: `Taille ${bouquet.size}`,
                        })
                      }
                    >
                      Ajouter au panier <span>+</span>
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="subscriptions" id="abonnements">
          <div className="sectionIntro inverse">
            <p className="eyebrow light">Fleurs récurrentes</p>
            <h2>Les abonnements</h2>
            <p>
              Un rendez-vous floral régulier, pensé pour votre intérieur ou
              votre lieu professionnel.
            </p>
          </div>
          <div className="subscriptionCards">
            <article>
              <span>Pour soi</span>
              <h3>La maison fleurie</h3>
              <p>
                Une composition de saison livrée ou retirée à l’atelier, chaque
                semaine ou chaque mois.
              </p>
              <div className="choiceRow">
                <button className="selected">Mensuel</button>
                <button>Hebdomadaire</button>
              </div>
              <strong>Sur devis personnalisé</strong>
              <button className="button pale" onClick={() => go("contact")}>
                Demander un devis
              </button>
            </article>
            <article className="business">
              <span>Professionnels</span>
              <h3>Des fleurs pour vos espaces</h3>
              <p>
                Hôtels, bureaux et restaurants : une proposition sur mesure,
                ajustée à votre rythme et à votre identité.
              </p>
              <strong>Sur devis personnalisé</strong>
              <button className="button ghost" onClick={() => go("contact")}>
                Demander une offre <Arrow />
              </button>
            </article>
          </div>
        </section>

        <section className="preview">
          <div className="sectionIntro">
            <p className="eyebrow">Journal visuel</p>
            <h2>Quelques histoires en fleurs</h2>
          </div>
          <div className="masonry">
            {homePreview.map((p, i) => (
              <img
                key={p}
                src={p}
                alt={`Création florale, aperçu ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <button className="button dark" onClick={() => go("gallery")}>
            Voir toute la galerie
          </button>
        </section>
        <FAQ />
      </main>
    </>
  )
}
