// données de démonstration du catalogue
//  : importer aussi le type Product pour tiges et plantes
import type { Bouquet, Product } from "@/types"
import { photo } from "@/data/images"
// les prix proviennent de la configuration du site
import config from "@/config/config.json"

// photo principale de la page d'accueil
// export const heroImage = photo("bouquet orchidee ou page d'accueil.JPG")
export const heroImage = photo("option 2 pour accueil ou a propos.JPG")

// aperçu "Journal visuel" de la page d'accueil
export const homePreview = [
  photo("produit ou accueil.JPG"),
  photo("produit 1 ou accueil.JPG"),
  photo("produit 2 ou accueil.JPG"),
  photo("produit 3 ou accueil.JPG"),
]

// galerie complète, toutes les photos de l'atelier
export const galleryPhotos = [
  {
    src: photo("bouquet orchidee ou page d'accueil.JPG"),
    caption: "Orchidées",
  },
  { src: photo("bouquet S.JPG"), caption: "Bouquet S — fleurs de saison" },
  { src: photo("bouquet M.JPG"), caption: "Bouquet M — roses de jardin" },
  { src: photo("bouquet L.JPG"), caption: "Bouquet L — palette profonde" },
  { src: photo("bouquet XL.JPG"), caption: "Bouquet XL — composition généreuse" },
  { src: photo("bouquet mini.JPG"), caption: "Bouquet mini" },
  { src: photo("boquet M.JPG"), caption: "Variation M" },
  { src: photo("bouquet L option 2.JPG"), caption: "Variation L" },
  { src: photo("produit ou accueil.JPG"), caption: "Composition signature" },
  { src: photo("produit 1 ou accueil.JPG"), caption: "Composition I" },
  { src: photo("produit 2 ou accueil.JPG"), caption: "Composition II" },
  { src: photo("produit 3 ou accueil.JPG"), caption: "Composition III" },
  {
    src: photo("option pour accueil ou a propos.JPG"),
    caption: "Étude florale I",
  },
  {
    src: photo("option 2 pour accueil ou à propos.JPG"),
    caption: "Étude florale II",
  },
  //  : nouvelle photo optimisée de l'atelier
  { src: photo("Apropos.jpeg"), caption: "L'atelier" },
  { src: photo("Apropos.jpeg"), caption: "Portrait de l'atelier" },
]

export const bouquets: Bouquet[] = [
  {
    id: 1,
    size: "S",
    //  : prix issu de config.json (taille mini)
    price: config.prices.mini,
    image: photo("bouquet S.JPG"),
    note: "Fleurs de saison, composition libre",
  },
  {
    id: 2,
    size: "M",
    //  : prix issu de config.json (taille S)
    price: config.prices.S,
    image: photo("bouquet M.JPG"),
    note: "Roses de jardin et feuillages délicats",
  },
  {
    id: 3,
    size: "L",
    //  : prix issu de config.json (taille M)
    price: config.prices.M,
    image: photo("bouquet L.JPG"),
    note: "Palette profonde, silhouette sculpturale",
  },
  {
    id: 4,
    size: "XL",
    //  : prix issu de config.json (taille L)
    price: config.prices.L,
    image: photo("bouquet XL.JPG"),
    note: "Botte fraîche, origine selon saison",
  },
]

// NOUVEAU : tiges vendues à l'unité, page Produits
export const tiges: Product[] = [
  {
    id: 5,
    label: "Cymbidium",
    price: config.prices.tige,
    image: photo("boquet M.JPG"),
    note: "Tige graphique, tenue longue durée",
  },
  {
    id: 6,
    label: "Rose éternelle",
    price: config.prices.tige,
    image: photo("bouquet L option 2.JPG"),
    note: "Rose de jardin, pétales serrés",
  },
  {
    id: 7,
    label: "Anthurium",
    price: config.prices.tige,
    image: photo("produit ou accueil.JPG"),
    note: "Corolle laquée, signature de l'atelier",
  },
  {
    id: 8,
    label: "Cattleya",
    price: config.prices.tige,
    image: photo("produit 1 ou accueil.JPG"),
    note: "Orchidée corsage, parfum délicat",
  },
]

// NOUVEAU : plantes d'intérieur, page Produits
export const plantes: Product[] = [
  {
    id: 9,
    label: "Palmier kentia",
    price: config.prices.plante,
    image: photo("produit 2 ou accueil.JPG"),
    note: "Elegant et facile à vivre",
  },
  {
    id: 10,
    label: "Fougère de Boston",
    price: config.prices.plante,
    image: photo("produit 3 ou accueil.JPG"),
    note: "Frondaison aérée, aime la fraîcheur",
  },
  {
    id: 11,
    label: "Pothos doré",
    price: config.prices.plante,
    image: photo("option pour accueil ou a propos.JPG"),
    note: "Retombant, tolère tous les coins",
  },
  {
    id: 12,
    label: "Orchidée phalaenopsis",
    price: config.prices.plante,
    image: photo("Apropos.jpeg"),
    note: "Floraison durable, arrosage léger",
  },
]
