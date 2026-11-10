// types partagés de l'application
//  : ajouter la page "produits" à l'union Page
export type Page = "home" | "produits" | "checkout" | "contact" | "gallery" | "about" | "login" | "admin" | "confirmation" | "delivery" | "legal" | "privacy"

export type BouquetSize = "S" | "M" | "L" | "XL"

export type Bouquet = {
  id: number
  size: BouquetSize
  price: number
  image: string
  note: string
}

// NOUVEAU : type produit de la page Produits
export type Product = {
  id: number
  label: string
  price: number
  image: string
  note: string
}

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  detail: string
}
