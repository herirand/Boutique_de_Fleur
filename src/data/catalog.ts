// données de démonstration du catalogue
import type { Bouquet } from "@/types"
import { photo } from "@/data/images"
// les prix proviennent de la configuration du site
import config from "@/config/config.json"

// photo principale de la page d'accueil
export const heroImage = photo("bouquet orchidee ou page d'accueil.JPG")

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
  // MODIFIÉ : nouvelle photo optimisée de l'atelier
  { src: photo("Apropos.jpeg"), caption: "L'atelier" },
  { src: photo("Apropos.jpeg"), caption: "Portrait de l'atelier" },
]

export const bouquets: Bouquet[] = [
  {
    id: 1,
    size: "S",
    // MODIFIÉ : prix issu de config.json (taille mini)
    price: config.prices.mini,
    image: photo("bouquet S.JPG"),
    note: "Fleurs de saison, composition libre",
  },
  {
    id: 2,
    size: "M",
    // MODIFIÉ : prix issu de config.json (taille S)
    price: config.prices.S,
    image: photo("bouquet M.JPG"),
    note: "Roses de jardin et feuillages délicats",
  },
  {
    id: 3,
    size: "L",
    // MODIFIÉ : prix issu de config.json (taille M)
    price: config.prices.M,
    image: photo("bouquet L.JPG"),
    note: "Palette profonde, silhouette sculpturale",
  },
  {
    id: 4,
    size: "XL",
    // MODIFIÉ : prix issu de config.json (taille L)
    price: config.prices.L,
    image: photo("bouquet XL.JPG"),
    note: "Botte fraîche, origine selon saison",
  },
]
