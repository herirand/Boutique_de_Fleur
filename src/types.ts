// types partagés de l'application
export type Page = "home" | "checkout" | "contact" | "gallery" | "about" | "login" | "admin" | "confirmation" | "delivery" | "legal" | "privacy"

export type BouquetSize = "S" | "M" | "L" | "XL"

export type Bouquet = {
  id: number
  size: BouquetSize
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
