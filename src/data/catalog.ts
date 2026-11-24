// données de démonstration du catalogue
//  : importer aussi le type Product pour tiges et plantes
import type { Bouquet, Product } from "@/types"
import { photo } from "@/data/images"
// les prix proviennent de la configuration du site
import config from "@/config/config.json"

// photo principale de la page d'accueil
// export const heroImage = photo("bouquet orchidee ou page d'accueil.JPG")
export const heroImage = photo("Apropos.JPG")

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

//  : pool des photos de l'atelier pour les pages détail produit
const detailPool = [
  photo("bouquet orchidee ou page d'accueil.JPG"),
  photo("bouquet S.JPG"),
  photo("bouquet M.JPG"),
  photo("bouquet L.JPG"),
  photo("bouquet XL.JPG"),
  photo("bouquet mini.JPG"),
  photo("boquet M.JPG"),
  photo("bouquet L option 2.JPG"),
  photo("produit ou accueil.JPG"),
  photo("produit 1 ou accueil.JPG"),
  photo("produit 2 ou accueil.JPG"),
  photo("produit 3 ou accueil.JPG"),
  photo("option pour accueil ou a propos.JPG"),
  photo("option 2 pour accueil ou à propos.JPG"),
  photo("Apropos.jpeg"),
]

//  : 4 photos de détail par produit, tirées du pool en évitant l'image principale
export const detailPhotos = (id: number, main: string): string[] => {
  const rest = detailPool.filter((p) => p !== main)
  const start = (id * 4) % rest.length
  return Array.from({ length: 4 }, (_, i) => rest[(start + i) % rest.length])
}

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

//  : tiges vendues à l'unité, page Produits
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

//  : plantes d'intérieur, page Produits
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

// MODIFIÉ : les Nouveautés ne sont plus des événements mais une sélection de produits renouvelée par saison
export type Season = "printemps" | "ete" | "automne" | "hiver"

export type SeasonalProduct = {
  item: Bouquet | Product
  category: "bouquet" | "tige" | "plante"
}

export const seasonLabels: Record<Season, string> = {
  printemps: "Printemps",
  ete: "Été",
  automne: "Automne",
  hiver: "Hiver",
}

export const seasonNotes: Record<Season, string> = {
  printemps:
    "Premières fleurs de saison, roses de jardin et orchidées parfumées arrivent à l’atelier.",
  ete:
    "Compositions fraîches, anthuriums laqués et plantes qui aiment la lumière.",
  automne:
    "Palettes plus profondes, roses serrées et feuillages qui tiennent longtemps.",
  hiver:
    "Orchidées durables et compositions généreuses prennent le relais à l’atelier.",
}

// NOUVEAU : la saison courante est déduite du mois, sans champ à mettre à jour manuellement
export function currentSeason(date = new Date()): Season {
  const month = date.getMonth() + 1
  if (month >= 3 && month <= 5) return "printemps"
  if (month >= 6 && month <= 8) return "ete"
  if (month >= 9 && month <= 11) return "automne"
  return "hiver"
}

export const activeSeason = currentSeason()

const seasonalCatalog: SeasonalProduct[] = [
  ...bouquets.map((item) => ({ item, category: "bouquet" as const })),
  ...tiges.map((item) => ({ item, category: "tige" as const })),
  ...plantes.map((item) => ({ item, category: "plante" as const })),
]

// NOUVEAU : ids des produits mis en avant pour chaque saison, tous issus du catalogue existant
const seasonalIds: Record<Season, number[]> = {
  printemps: [1, 2, 8, 9],
  ete: [2, 4, 7, 10],
  automne: [1, 3, 6, 11],
  hiver: [3, 4, 5, 12],
}

export const seasonalProducts: SeasonalProduct[] = seasonalIds[activeSeason]
  .map((id) => seasonalCatalog.find((entry) => entry.item.id === id))
  .filter((entry): entry is SeasonalProduct => Boolean(entry))
