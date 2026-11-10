import { useState } from "react"
import type { CartItem, Page } from "@/types"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Toast from "@/components/Toast"
import About from "@/pages/About"
import Admin from "@/pages/Admin"
import Checkout from "@/pages/Checkout"
import Confirmation from "@/pages/Confirmation"
import Contact from "@/pages/Contact"
import Gallery from "@/pages/Gallery"
import Home from "@/pages/Home"
import InformationPage from "@/pages/InformationPage"
import Login from "@/pages/Login"
//  : page Produits (bouquets, tiges, plantes, sur mesure)
import Products from "@/pages/Products"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState("")
  const [menu, setMenu] = useState(false)
  const go = (next: Page) => {
    setPage(next)
    setMenu(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const add = (item: CartItem) => {
    setCart([...cart, item])
    setToast(`${item.name} a été ajouté au panier`)
    window.setTimeout(() => setToast(""), 2600)
  }

  if (page === "login") return <Login go={go} />
  if (page === "admin") return <Admin go={go} />
  if (page === "confirmation") return <Confirmation go={go} />

  return (
    <div className="site">
      <Header
        go={go}
        cartCount={cart.length}
        menu={menu}
        onToggleMenu={() => setMenu(!menu)}
      />
      {page === "home" && <Home add={add} go={go} />}
      {/*  : rendu de la page Produits, avec header et footer */}
      {page === "produits" && <Products add={add} go={go} />}
      {page === "checkout" && (
        <Checkout cart={cart} setCart={setCart} go={go} />
      )}
      {page === "contact" && <Contact />}
      {page === "gallery" && <Gallery go={go} />}
      {page === "about" && <About go={go} />}
      {page === "delivery" && <InformationPage type="delivery" go={go} />}
      {page === "legal" && <InformationPage type="legal" go={go} />}
      {page === "privacy" && <InformationPage type="privacy" go={go} />}
      <Footer go={go} />
      {toast && <Toast message={toast} onCheckout={() => go("checkout")} />}
    </div>
  )
}
