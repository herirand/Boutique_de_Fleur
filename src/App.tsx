import { useState } from "react"
import type { CartItem, Page, ProductDetailData } from "@/types"
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
// NOUVEAU : page Nouveautés (ateliers, marchés et rendez-vous de l'atelier)
import News from "@/pages/News"
//  : page détail produit (modèle Vaese)
import ProductDetail from "@/pages/ProductDetail"
//  : page Produits (bouquets, tiges, plantes, sur mesure)
import Products from "@/pages/Products"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState("")
  const [menu, setMenu] = useState(false)
  //  : produit sélectionné, transmis à la page détail
  const [detail, setDetail] = useState<ProductDetailData | null>(null)
  const go = (next: Page) => {
    setPage(next)
    setMenu(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  //  : ouvre la page détail produit avec les données du produit cliqué
  const openDetail = (data: ProductDetailData) => {
    setDetail(data)
    go("produit")
  }
  //  : va sur la page Produits puis déroule jusqu'à la section demandée (bouquets / tiges / plantes)
  const goSection = (id: string) => {
    setMenu(false)
    if (page === "produits") {
      //  : déjà sur Produits — simple défilement vers l'ancre
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    } else {
      setPage("produits")
      //  : attend le rendu de la page avant de dérouler vers l'ancre
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 60)
    }
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
        //  : transmission du défilement par section (menu déroulant Produits)
        goSection={goSection}
        cartCount={cart.length}
        menu={menu}
        onToggleMenu={() => setMenu(!menu)}
      />
      {page === "home" && <Home add={add} go={go} openDetail={openDetail} />}
      {/*  : rendu de la page Produits, avec header et footer */}
      {page === "produits" && <Products add={add} go={go} openDetail={openDetail} />}
      {/* MODIFIÉ : la page Nouveautés affiche les produits de saison avec panier et fiche détail */}
      {page === "nouveautes" && <News add={add} go={go} openDetail={openDetail} />}
      {/*  : page détail produit — key par id pour repartir à zéro à chaque produit */}
      {page === "produit" && detail && (
        <ProductDetail key={detail.id} data={detail} add={add} go={go} />
      )}
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
