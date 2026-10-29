import { useState } from 'react'
import aboutImage from '@/imports/A_propos.jpg'

type Page = 'home' | 'checkout' | 'contact' | 'gallery' | 'about' | 'login' | 'admin' | 'confirmation' | 'delivery' | 'legal' | 'privacy'
type Product = { id: number; name: string; category: string; price: number; image: string; note: string; variants: string[] }

const photos = [
  'https://images.unsplash.com/photo-1789613391824-cb3b38872035?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1768411470924-b91e40bdd4d6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1771099077123-e9795202de0c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1788729930751-87d3f81ea4e8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1771218829842-91b665c4f436?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1792422692569-dfa2437991df?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1585664428450-1665a336eb19?auto=format&fit=crop&w=900&q=80',
]

const products: Product[] = [
  { id: 1, name: 'Le Jardin secret', category: 'Bouquets', price: 65, image: photos[0], note: 'Fleurs de saison, composition libre', variants: ['Petit · 65 €', 'Moyen · 85 €', 'Grand · 115 €'] },
  { id: 2, name: 'Éclat poudré', category: 'Bouquets', price: 72, image: photos[1], note: 'Roses de jardin et feuillages délicats', variants: ['Petit · 72 €', 'Moyen · 92 €', 'Grand · 125 €'] },
  { id: 3, name: 'Crépuscule', category: 'Bouquets', price: 78, image: photos[2], note: 'Palette profonde, silhouette sculpturale', variants: ['Moyen · 78 €', 'Grand · 108 €'] },
  { id: 4, name: 'Lys calla', category: 'Fleurs coupées', price: 32, image: photos[3], note: 'Botte fraîche, origine selon saison', variants: ['5 tiges · 32 €', '10 tiges · 58 €'] },
  { id: 5, name: 'Branches blanches', category: 'Fleurs coupées', price: 38, image: photos[4], note: 'Sélection graphique et lumineuse', variants: ['5 tiges · 38 €', '10 tiges · 68 €'] },
  { id: 6, name: 'Dahlias fauves', category: 'Fleurs coupées', price: 42, image: photos[5], note: 'Nuances chaudes, disponibilité saisonnière', variants: ['7 tiges · 42 €', '12 tiges · 66 €'] },
  { id: 7, name: 'Monstera en verre', category: 'Plantes', price: 49, image: photos[6], note: 'Bouture racinée et vase artisanal', variants: ['Vase clair · 49 €', 'Vase fumé · 56 €'] },
  { id: 8, name: 'Ficus atelier', category: 'Plantes', price: 68, image: photos[7], note: 'Pot en grès naturel inclus', variants: ['M · 68 €', 'L · 95 €'] },
]

function Arrow() { return <span aria-hidden="true">↗</span> }

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [cart, setCart] = useState<Product[]>([])
  const [toast, setToast] = useState('')
  const [menu, setMenu] = useState(false)
  const go = (next: Page) => { setPage(next); setMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const add = (product: Product) => {
    setCart([...cart, product]); setToast(`${product.name} a été ajouté au panier`)
    window.setTimeout(() => setToast(''), 2600)
  }

  if (page === 'login') return <Login go={go} />
  if (page === 'admin') return <Admin go={go} />
  if (page === 'confirmation') return <Confirmation go={go} />

  return (
    <div className="site">
      <header className="header">
        <button className="wordmark" onClick={() => go('home')}><span>IFLEUR</span></button>
        <button className="menuButton selectedBold" onClick={() => setMenu(!menu)} aria-label="Ouvrir le menu">Menu</button>
        <nav className={menu ? 'nav open' : 'nav'}>
          <button className="selectedBold" onClick={() => go('home')}>Accueil</button>
          <button className="selectedBold" onClick={() => { go('home'); window.setTimeout(() => document.querySelector('#boutique')?.scrollIntoView(), 80) }}>Produits</button>
          <button className="selectedBold" onClick={() => go('about')}>À propos</button>
          <button className="selectedBold" onClick={() => go('gallery')}>Galerie</button>
          <button className="selectedBold" onClick={() => go('contact')}>Contact</button>
        </nav>
        <button className="cartButton selectedBold" onClick={() => go('checkout')} aria-label={`Panier, ${cart.length} articles`}>
          Panier <span>{cart.length}</span>
        </button>
      </header>
      {page === 'home' && <Home add={add} go={go} />}
      {page === 'checkout' && <Checkout cart={cart} setCart={setCart} go={go} />}
      {page === 'contact' && <Contact />}
      {page === 'gallery' && <Gallery go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'delivery' && <InformationPage type="delivery" go={go} />}
      {page === 'legal' && <InformationPage type="legal" go={go} />}
      {page === 'privacy' && <InformationPage type="privacy" go={go} />}
      <Footer go={go} />
      {toast && <div className="toast"><span>Ajout confirmé</span>{toast}<button onClick={() => go('checkout')}>Voir le panier</button></div>}
    </div>
  )
}

function Home({ add, go }: { add: (p: Product) => void; go: (p: Page) => void }) {
  return <>
    <section className="hero">
      <img src={photos[2]} alt="Composition florale sculpturale aux teintes profondes" />
      <div className="heroShade" />
      <div className="heroCopy">
        <p className="eyebrow light heroEyebrowEdited">Atelier floral · créations de saison</p>
        <h1><span className="block">Des fleurs pour</span><span className="block">les moments qui comptent.</span></h1>
        <p className="heroDescriptionEdited">Des compositions singulières, sublimées par nosanthuriums.</p>
        <div className="actions">
          <a className="button pale" href="#boutique">Découvrir nos fleurs</a>
          <button className="button ghost" onClick={() => go('contact')}>Demander un devis</button>
        </div>
      </div>
      <span className="scrollCue">Faire défiler <i /></span>
    </section>

    <section className="categoryNav" aria-label="Catégories">
      <a href="#bouquets">Produits</a>
      <a href="#abonnements">Abonnements</a>
    </section>

    <main id="boutique">
      <section className="shopSection !bg-[#eee8dc] !px-[3.25vw] !pt-28 !pb-32" id="bouquets">
        <div className="sectionIntro !mb-16">
          <p className="eyebrow">La boutique</p>
          <h2>Bouquets</h2>
          <p>Composés librement à partir des plus belles fleurs disponibles ce matin.</p>
        </div>
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <div
              className={[
                'min-w-0',
                index === 1 || index === 2 ? 'md:mt-20' : '',
                index === 1 || index === 2
                  ? '[&_.productImage]:!h-[32vw] [&_.productImage]:!max-h-[490px]'
                  : '[&_.productImage]:!h-[39vw] [&_.productImage]:!max-h-[600px]',
                '[&_.productImage]:!min-h-0 [&_.productImage]:bg-[#262620]',
                '[&_.productImage_img]:brightness-[.62] [&_.productImage_img]:saturate-[.72]',
                '[&_.productInfo]:!pt-5',
                '[&_.productInfo_h3]:!text-[25px]',
                '[&_.addButton]:!bg-transparent [&_.addButton:hover]:!bg-[#252522]',
              ].join(' ')}
              key={product.id}
            >
              <article className="productCard">
                <div className="productImage">
                  <img src={product.image} alt={index === 1 ? '' : ['Bouquet taille S', 'Bouquet taille M', 'Bouquet taille L', 'Bouquet taille XL'][index]} />
                </div>
                <div className="productInfo">
                  <div>
                    <h3>{['S', 'M', 'L', 'XL'][index]}</h3>
                    <strong>{[45, 65, 85, 120][index]} €</strong>
                  </div>
                  <p>{index === 0 ? 'Fleurs de saison, composition libre' : product.note}</p>
                  <label>Couleur
                    <select defaultValue="Chaudes (ocre / jaune / orange)">
                      <option>Chaudes (ocre / jaune / orange)</option>
                      <option>Froides (violet / bleu)</option>
                      <option>Mélangées (chaud et froid)</option>
                      <option>Neutres (rose / blanc)</option>
                    </select>
                  </label>
                  <label>Forme
                    <select defaultValue="Rond">
                      <option>Rond</option>
                      <option>Structuré</option>
                      <option>Piqué sur mousse</option>
                    </select>
                  </label>
                  <button
                    className="addButton"
                    onClick={() => add({
                      ...product,
                      name: `Bouquet ${['S', 'M', 'L', 'XL'][index]}`,
                      price: [45, 65, 85, 120][index],
                    })}
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
          <p className="eyebrow light">Fleurs récurrentes</p><h2>Les abonnements</h2>
          <p>Un rendez-vous floral régulier, pensé pour votre intérieur ou votre lieu professionnel.</p>
        </div>
        <div className="subscriptionCards">
          <article><span>Pour soi</span><h3>La maison fleurie</h3><p>Une composition de saison livrée ou retirée à l’atelier, chaque semaine ou chaque mois.</p><div className="choiceRow"><button className="selected">Mensuel</button><button>Hebdomadaire</button></div><strong>Sur devis personnalisé</strong><button className="button pale" onClick={() => add({ ...products[0], id: 20, name: 'Abonnement maison', price: 58 })}>Ajouter l’abonnement</button></article>
          <article className="business"><span>Professionnels</span><h3>Des fleurs pour vos espaces</h3><p>Hôtels, bureaux et restaurants : une proposition sur mesure, ajustée à votre rythme et à votre identité.</p><strong>Sur devis personnalisé</strong><button className="button ghost" onClick={() => go('contact')}>Demander une offre <Arrow /></button></article>
        </div>
      </section>

      <section className="preview">
        <div className="sectionIntro"><p className="eyebrow">Journal visuel</p><h2>Quelques histoires en fleurs</h2></div>
        <div className="masonry">{photos.slice(1, 5).map((p, i) => <img key={p} src={p} alt={`Création florale, aperçu ${i + 1}`} />)}</div>
        <button className="button dark" onClick={() => go('gallery')}>Voir toute la galerie</button>
      </section>
      <FAQ />
    </main>
  </>
}

function ProductCard({ product, add }: { product: Product; add: (p: Product) => void }) {
  const [variant, setVariant] = useState(0)
  return <article className="productCard">
    <div className="productImage">
      <img src={product.image} alt={product.name} />
      {product.id === 1 && <img className="insertedProductImage" alt="Le Jardin secret" src="https://images.unsplash.com/photo-1789613391824-cb3b38872035?auto=format&fit=crop&w=1200&q=85" />}
      <span>De saison</span>
    </div>
    <div className="productInfo">
      <div><h3>{product.id === 1 ? 'S' : product.name}</h3><strong>À partir de {product.price} €</strong></div>
      <p>{product.note}</p>
      <label>Format
        <select value={variant} onChange={e => setVariant(Number(e.target.value))}>
          {product.variants.map((v, i) => <option value={i} key={v}>{v}</option>)}
        </select>
      </label>
      <button className="addButton" onClick={() => add(product)}>Ajouter au panier <span>+</span></button>
    </div>
  </article>
}

function Checkout({ cart, setCart, go }: { cart: Product[]; setCart: (p: Product[]) => void; go: (p: Page) => void }) {
  const total = cart.reduce((s, p) => s + p.price, 0)
  if (!cart.length) return <main className="empty"><p className="eyebrow">Votre sélection</p><h1>Votre panier est vide.</h1><p>Découvrez les créations du moment et composez votre commande au fil de la page.</p><button className="button dark" onClick={() => go('home')}>Découvrir les fleurs</button></main>
  return <main className="checkout">
    <div className="pageTitle"><p className="eyebrow">Commande invitée · aucune création de compte</p><h1>Finaliser votre commande</h1></div>
    <div className="checkoutGrid">
      <section className="formPanel">
        <div className="step"><span>01</span><h2>Vos coordonnées</h2></div>
        <div className="fieldGrid"><label>Prénom<input placeholder="Camille" /></label><label>Nom<input placeholder="Martin" /></label><label className="wide">Adresse e-mail<input type="email" placeholder="camille@exemple.fr" /></label><label className="wide">Téléphone<input placeholder="+33 6 00 00 00 00" /></label></div>
        <div className="step"><span>02</span><h2>Réception</h2></div>
        <div className="delivery"><button className="active"><b>Livraison</b><small>Option de démonstration · tarif à confirmer</small></button><button><b>Retrait atelier</b><small>Adresse et créneaux à confirmer</small></button></div>
        <div className="fieldGrid"><label className="wide">Quartier ou ville<select defaultValue=""><option value="" disabled>Sélectionner une zone de livraison</option><option>Centre-ville — option de démonstration</option><option>Quartiers proches — option de démonstration</option><option>Ville voisine — option de démonstration</option><option>Autre zone — tarif à confirmer</option></select></label><label className="wide">Adresse<input placeholder="Adresse de livraison" /></label><label>Code postal<input placeholder="00000" /></label><label>Ville<input placeholder="Ville" /></label><label className="wide">Note facultative<textarea placeholder="Digicode, message ou précision…" /></label></div>
        <div className="step"><span>03</span><h2>Paiement</h2></div>
        <div className="paymentNote">Zone de paiement sécurisée — prestataire à sélectionner. Aucun numéro de carte n’est collecté dans ce prototype.</div>
        <button className="button dark full" onClick={() => go('confirmation')}>Confirmer et payer {total + 9} €</button>
      </section>
      <aside className="summary"><h2>Votre sélection</h2>{cart.map((p, i) => <div className="cartLine" key={`${p.id}-${i}`}><img src={p.image} alt="" /><div><h3>{p.name}</h3><small>{p.variants[0]}</small><div className="qty"><button>−</button><span>1</span><button>+</button></div></div><strong>{p.price} €</strong><button className="remove" onClick={() => setCart(cart.filter((_, x) => x !== i))}>Retirer</button></div>)}<div className="totals"><p><span>Sous-total</span><b>{total} €</b></p><p><span>Livraison (démo)</span><b>9 €</b></p><p className="grand"><span>Total</span><b>{total + 9} €</b></p></div><button className="textLink" onClick={() => go('home')}>← Continuer mes achats</button></aside>
    </div>
  </main>
}

function Contact() { return <main className="interior contactPage"><div className="editorialHead"><p className="eyebrow">Parlons de votre projet</p><h1><span className="block">Des fleurs pensées</span><span className="block">pour votre moment.</span></h1><p>Mariage, réception ou installation : racontez-nous votre projet. Les informations ci-dessous sont provisoires et à confirmer.</p></div><div className="contactGrid"><aside><h3>L’atelier</h3><p><span className="block">Téléphone : à compléter</span><span className="block">E-mail : à compléter</span><span className="block">Zone d’intervention : à compléter</span></p><h3>Horaires</h3><p>À compléter</p><h3>Réseaux sociaux</h3><p>À compléter</p></aside><form className="quoteForm" onSubmit={e => e.preventDefault()}><div className="step"><span>01</span><h2>Coordonnées</h2></div><div className="fieldGrid"><label>Nom et prénom<input /></label><label>Entreprise <small>facultatif</small><input /></label><label>E-mail<input type="email" /></label><label>Téléphone<input /></label></div><div className="step"><span>02</span><h2>Votre projet</h2></div><div className="fieldGrid"><label>Type d’événement<select><option>Mariage</option><option>Anniversaire</option><option>Réception</option><option>Événement professionnel</option><option>Autre</option></select></label><label>Date<input type="date" /></label><label className="wide">Lieu<input /></label><label>Nombre d’invités <small>facultatif</small><input /></label><label>Budget estimé <small>facultatif</small><input /></label><label className="wide">Prestations recherchées<select><option>Bouquets et compositions</option><option>Centres de table</option><option>Décoration de cérémonie</option><option>Installation florale</option></select></label><label className="wide">Décrivez votre projet<textarea rows={5} /></label><label className="wide upload">Images d’inspiration <small>option de démonstration</small><input type="file" multiple /></label></div><label className="consent"><input type="checkbox" /> J’accepte que mes données soient utilisées pour répondre à cette demande.</label><button className="button dark">Envoyer ma demande de devis</button></form></div></main> }

function Gallery({ go }: { go: (p: Page) => void }) { return <main className="interior galleryPage"><div className="editorialHead"><p className="eyebrow">Galerie</p><h1><span className="block">Fleurs, espaces</span><span className="block">et célébrations.</span></h1><p>Une sélection provisoire de créations de l’atelier, entre gestes spontanés et décors sur mesure.</p></div><div className="galleryGrid">{photos.concat(photos.slice(2, 6)).map((p, i) => <figure key={i}><img src={p} alt={`Composition florale ${i + 1}`} /><figcaption>{['Bouquet de saison', 'Étude en orange', 'Composition sculpturale', 'Lignes naturelles'][i % 4]}</figcaption></figure>)}</div><section className="galleryCta"><h2>Imaginons votre décor floral.</h2><button className="button pale" onClick={() => go('contact')}>Demander un devis</button></section></main> }

function About({ go }: { go: (p: Page) => void }) { return <main className="interior aboutPage"><div className="aboutHero"><img src={aboutImage} alt="Fleuriste portant une composition" /><div><p className="eyebrow light !text-[18px]"><span>Ifleur - Histoire</span></p><h1><span>Un bonheur florissant</span></h1></div></div><section className="manifesto"><p className="eyebrow">Notre approche</p><h2>Nous créons des compositions sensibles, guidées par la saison et l’allure singulière de chaque fleur.</h2><div><p><span>Ifleur est un atelier floral contemporain. Chaque création se construit comme un paysage : avec du rythme, des respirations et une part d’imprévu.</span></p><p>Nous privilégions une sélection raisonnée, des contenants durables et des collaborations locales lorsque la saison le permet. Ce contenu est provisoire et sera affiné avec la marque.</p></div></section><section className="values"><article><span>01</span><h3>Saisonnalité</h3><p>Travailler avec les arrivages et célébrer ce qui est beau maintenant.</p></article><article><span>02</span><h3>Geste</h3><p>Laisser chaque tige trouver sa place dans une composition libre.</p></article><article><span>03</span><h3>Attention</h3><p>Créer avec soin, du premier échange jusqu’à la remise des fleurs.</p></article></section><div className="aboutActions"><button className="button dark" onClick={() => go('home')}>Voir les créations</button><button className="textLink" onClick={() => go('contact')}>Nous contacter <Arrow /></button></div></main> }

function Confirmation({ go }: { go: (p: Page) => void }) { return <main className="confirmation"><div className="check">✓</div><p className="eyebrow">Commande enregistrée · prototype</p><h1><span className="block">Merci, votre commande</span><span className="block">est bien reçue.</span></h1><p>Une confirmation serait envoyée par e-mail après un paiement réel.</p><div className="orderRef"><span>Référence fictive</span><strong>MF—0248</strong><span>Prochaine étape</span><strong>Préparation par l’atelier</strong></div><button className="button dark" onClick={() => go('home')}>Retourner à la boutique</button></main> }

function Login({ go }: { go: (p: Page) => void }) { return <main className="login"><div className="loginVisual"><div><p className="eyebrow light">Espace privé</p><h1><span className="block">Maison</span><span className="block">Flora.</span></h1></div></div><form onSubmit={e => { e.preventDefault(); go('admin') }}><button className="textLink back" type="button" onClick={() => go('home')}>← Retour à la boutique</button><p className="eyebrow">Administration</p><h2>Bienvenue.</h2><p>Connectez-vous pour gérer l’activité de l’atelier.</p><label>Adresse e-mail<input type="email" placeholder="admin@maisonflora.fr" /></label><label>Mot de passe<input type="password" placeholder="••••••••" /></label><button className="button dark full">Se connecter</button><small>Écran de démonstration — aucun accès réel n’est créé.</small></form></main> }

function Admin({ go }: { go: (p: Page) => void }) {
  const [tab, setTab] = useState('Tableau de bord')
  const adminProducts = products.slice(0, 6)
  return <div className="admin"><aside><button className="wordmark">MAISON FLORA</button><small>Administration · Démo</small>{['Tableau de bord', 'Produits', 'Commandes', 'Demandes de devis'].map(t => <button className={tab === t ? 'active' : ''} onClick={() => setTab(t)} key={t}>{t}</button>)}<button className="logout" onClick={() => go('home')}>Déconnexion</button></aside><main><header><div><p className="eyebrow">Espace de gestion</p><h1>{tab}</h1></div><div className="avatar">CM</div></header>{tab === 'Tableau de bord' && <><div className="stats"><article><span>Produits</span><strong>18</strong><small>15 publiés</small></article><article><span>Commandes</span><strong>24</strong><small>6 à préparer</small></article><article><span>Ruptures</span><strong>3</strong><small>Action requise</small></article><article><span>Devis</span><strong>7</strong><small>4 nouvelles demandes</small></article></div><AdminTable title="Commandes récentes" rows={[['MF-0248', 'Camille Martin', '142 €', 'En préparation'], ['MF-0247', 'Léa Bernard', '85 €', 'Confirmée'], ['MF-0246', 'Hôtel Rivage', '260 €', 'En attente']]} /></>}{tab === 'Produits' && <><div className="toolbar"><input placeholder="Rechercher un produit…" /><select><option>Toutes les catégories</option></select><select><option>Tous les statuts</option></select><button className="button dark">+ Nouveau produit</button></div><div className="adminList">{adminProducts.map(p => <article key={p.id}><img src={p.image} alt="" /><div><strong>{p.name}</strong><small>{p.category}</small></div><b>{p.price} €</b><span className="status">Publié</span><button>Modifier</button><button className="danger">Supprimer</button></article>)}</div></>}{tab === 'Commandes' && <AdminTable title="Toutes les commandes" rows={[['MF-0248', 'Camille Martin', '142 €', 'En préparation'], ['MF-0247', 'Léa Bernard', '85 €', 'Confirmée'], ['MF-0246', 'Hôtel Rivage', '260 €', 'En attente'], ['MF-0245', 'Sarah Noël', '72 €', 'Terminée']]} />}{tab === 'Demandes de devis' && <AdminTable title="Demandes récentes" rows={[['DEV-018', 'Mariage · 12 juin', 'Château à confirmer', 'Nouvelle'], ['DEV-017', 'Événement professionnel', 'Paris', 'En cours'], ['DEV-016', 'Anniversaire', 'Lieu à confirmer', 'Traitée']]} />}</main></div>
}

function AdminTable({ title, rows }: { title: string; rows: string[][] }) { return <section className="adminTable"><div><h2>{title}</h2><button>Voir tout</button></div>{rows.map((r, i) => <article key={i}>{r.map((c, x) => x === 3 ? <span className="status" key={x}>{c}</span> : <span key={x}>{c}</span>)}<button>Ouvrir</button></article>)}</section> }

function FAQ() {
  const [open, setOpen] = useState(0)
  const qs = ['Comment choisir la taille d’un bouquet ?', 'Les fleurs sont-elles disponibles toute l’année ?', 'Quelles sont les possibilités de livraison ou de retrait ?', 'Comment fonctionne un abonnement ?', 'Comment demander un devis pour un événement ?']
  return <section className="faq" id="faq"><div><p className="eyebrow">Questions fréquentes</p><h2>Tout savoir avant de commander.</h2><p>Ces réponses sont provisoires et seront confirmées avec la marque.</p></div><div>{qs.map((q, i) => <article key={q}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><b>{open === i ? '−' : '+'}</b></button>{open === i && <p>Chaque création dépend des fleurs disponibles et du service choisi. Les détails définitifs seront précisés lors de la mise en ligne.</p>}</article>)}</div></section>
}

function InformationPage({ type, go }: { type: 'delivery' | 'legal' | 'privacy'; go: (p: Page) => void }) {
  const content = {
    delivery: {
      eyebrow: 'Informations pratiques',
      title: 'Livraison & retrait',
      intro: 'Les zones desservies, tarifs et créneaux définitifs seront confirmés par Ifleur.',
      sections: [
        ['Livraison', 'Le quartier ou la ville se sélectionne pendant la commande. Les tarifs affichés dans le prototype sont indicatifs.'],
        ['Retrait', 'Le retrait à l’atelier sera proposé selon des créneaux et une adresse à confirmer.'],
      ],
    },
    legal: {
      eyebrow: 'Informations légales',
      title: 'Mentions légales',
      intro: 'Cette page est une maquette. Les informations juridiques définitives restent à compléter.',
      sections: [
        ['Éditeur du site', 'Raison sociale, adresse, immatriculation et coordonnées : à compléter.'],
        ['Hébergement', 'Prestataire, adresse et coordonnées : à compléter.'],
      ],
    },
    privacy: {
      eyebrow: 'Vos données',
      title: 'Politique de confidentialité',
      intro: 'Cette politique provisoire sera validée avant la mise en ligne du site.',
      sections: [
        ['Données collectées', 'Les données utiles à la commande ou à une demande de devis sont limitées aux informations saisies dans les formulaires.'],
        ['Vos droits', 'Les coordonnées du responsable de traitement et la procédure d’exercice des droits restent à compléter.'],
      ],
    },
  }[type]

  return <main className="interior"><div className="editorialHead"><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p></div><section className="manifesto"><p className="eyebrow">Informations provisoires</p><h2>{content.title}</h2><div>{content.sections.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><button className="button dark" onClick={() => go('home')}>Retour à la boutique</button></section></main>
}

function Footer({ go }: { go: (p: Page) => void }) {
  const goToHomeSection = (id: string) => {
    go('home')
    window.setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return <footer><div><button className="wordmark light" onClick={() => go('home')}><span>IFLEUR</span></button><p><span className="block">Atelier floral contemporain</span><span className="block">Coordonnées à compléter</span></p></div><div><b>Explorer</b><button onClick={() => go('home')}>Boutique</button><button onClick={() => go('about')}>À propos</button><button onClick={() => go('gallery')}>Galerie</button><button onClick={() => go('contact')}>Contact & devis</button></div><div><b>Collections</b><button onClick={() => goToHomeSection('#bouquets')}>Bouquets</button><button onClick={() => goToHomeSection('#abonnements')}>Abonnements</button></div><div><b>Informations</b><button onClick={() => goToHomeSection('#faq')}>FAQ</button><button onClick={() => go('delivery')}>Livraison & retrait</button><button onClick={() => go('legal')}>Mentions légales</button><button onClick={() => go('privacy')}>Confidentialité</button><button onClick={() => go('login')}>Administration</button></div><small><span>© Ifleur 2026</span></small></footer>
}
