// types partagés de l'application
//  : ajouter la page "produits" à l'union Page
//  : ajout de la page "produit" (détail d'un produit, modèle Vaese)
export type Page = "home" | "produits" | "produit" | "checkout" | "contact" | "gallery" | "about" | "login" | "admin" | "confirmation" | "delivery" | "legal" | "privacy"

export type BouquetSize = "S" | "M" | "L" | "XL"

export type Bouquet = {
  id: number
  size: BouquetSize
  price: number
  image: string
  note: string
  //  : photos supplémentaires affichées sur la page détail
  photos?: string[]
}

//  : type produit de la page Produits
export type Product = {
  id: number
  label: string
  price: number
  image: string
  note: string
  //  : photos supplémentaires affichées sur la page détail
  photos?: string[]
}

//  : données transmises à la page détail produit (modèle Vaese)
export type ProductDetailData = {
  id: number
  name: string
  price: number
  image: string
  note: string
  // 4 photos de détail affichées côte à côte sous la photo principale
  photos: string[]
  category: "bouquet" | "tige" | "plante" | "surmesure"
  // libellé ajouté au panier (ex. "Taille M", "Tige", "Plante")
  detail: string
}

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  detail: string
}
