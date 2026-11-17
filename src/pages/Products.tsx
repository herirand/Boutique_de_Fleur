//  : page Produits (bouquets, sur mesure en bloc photo + formulaire, tiges, plantes)
import type { CartItem, Page, ProductDetailData } from "@/types"
import { bouquets, plantes, tiges } from "@/data/catalog"
import { formatPrice } from "@/data/format"
import { photo } from "@/data/images"
import ProductCard from "@/components/ProductCard"
//  : prix minimum du sur mesure issu de la configuration du site
import config from "@/config/config.json"

export default function Products({
  add,
  //  : go retiré du bloc sur mesure (devenu formulaire autonome) mais conservé dans le contrat d'props
  go: _go,
  openDetail,
}: {
  add: (item: CartItem) => void
  go: (p: Page) => void
  //  : ouvre la page détail produit au clic sur une photo
  openDetail: (data: ProductDetailData) => void
}) {
  return (
    //  : classe de page pour resserrer les photos des cartes (grille 4 colonnes) via CSS
    <main className="produitsPage">
      {/* intro sobre, style categoryNav de Home */}
      <section className="shopSection !bg-[#eee8dc] !px-[3.25vw] !pt-28 !pb-16">
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Produits</h2>
          <p>
            Composition libres, tiges rares et plantes vivantes, préparées à
            l’atelier. Pour une pièce unique dessinée avec nous, remplissez le
            formulaire « Sur mesure » dans la rubrique Bouquets.
          </p>
        </div>
      </section>

      {/*  : nav interne (barre flottante Bouquets/Tiges/Plantes) supprimée — remplacée par le menu déroulant du bouton « Produits » dans la barre de navigation */}

      {/*  : même gabarit que la section Bouquets de Home, classe pour classe */}
      {/*  : espacement aligné sur les sections Tiges/Plantes (!pt-14 !pb-14) pour supprimer le grand vide laissé par l'ancienne barre flottante */}
      {/* shopAnchor garde les ids d'ancre (#bouquets, #tiges, #plantes) ciblés par le menu déroulant de la navbar */}
      <section
        className="shopSection shopAnchor !bg-[#eee8dc] !px-[3.25vw] !pt-14 !pb-14"
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
        </div>

        {/*  : bloc « Sur mesure » façon Vaese (commande spéciale) — photo à gauche, formulaire de demande à droite */}
        <div className="surMesureBlock">
          {/*  : photo de l'atelier, côté gauche */}
          <div className="surMesurePhoto">
            <img
              // photo() ignore les accents : passer "orchidee" et non "orchidées"
              src={photo("bouquet orchidee ou page d'accueil.JPG")}
              alt="Composition sur mesure de l'atelier"
            />
          </div>
          {/*  : formulaire de demande sur mesure — démo, aucun envoi réel (comme la page contact) */}
          {/*  : titre simplifié en « Commande spéciale » (l'ancien titre « Composition sur mesure » est retiré) */}
          <form className="surMesureForm" onSubmit={(e) => e.preventDefault()}>
            <h3>Commande spéciale</h3>
            <p>
              Recréée ensemble selon vos envies, à partir de{" "}
              {formatPrice(config.surMesureMin)}. Décrivez votre idée, nous
              revenons vers vous avec un devis.
            </p>
            <div className="fieldGrid">
              <label>
                Nom
                <input />
              </label>
              <label>
                Prénom
                <input />
              </label>
              <label className="wide">
                E-mail
                <input type="email" />
              </label>
              <label className="wide">
                Message
                {/*  : textarea réduite (3 lignes) pour raccourcir la hauteur du bloc sur desktop */}
                <textarea rows={3} />
              </label>
              <label>
                Budget <small>indicatif</small>
                <input />
              </label>
            </div>
            {/*  : bouton d'envoi de la demande */}
            <button className="button dark">Envoyer</button>
          </form>
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
