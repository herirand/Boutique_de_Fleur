// en-tête et navigation extraits de App.tsx
import type { Page } from "@/types"

export default function Header({
  go,
  cartCount,
  menu,
  onToggleMenu,
}: {
  go: (p: Page) => void
  cartCount: number
  menu: boolean
  onToggleMenu: () => void
}) {
  return (
    <header className="header">
      <button className="wordmark" onClick={() => go("home")}>
        <span>IFLEUR</span>
      </button>
      <button
        className="menuButton selectedBold"
        onClick={onToggleMenu}
        aria-label="Ouvrir le menu"
      >
        Menu
      </button>
      <nav className={menu ? "nav open" : "nav"}>
        <button className="selectedBold" onClick={() => go("home")}>
          Accueil
        </button>
        <button
          className="selectedBold"
          onClick={() => {
            go("home")
            window.setTimeout(
              () => document.querySelector("#boutique")?.scrollIntoView(),
              80,
            )
          }}
        >
          Produits
        </button>
        <button className="selectedBold" onClick={() => go("about")}>
          À propos
        </button>
        <button className="selectedBold" onClick={() => go("gallery")}>
          Galerie
        </button>
        <button className="selectedBold" onClick={() => go("contact")}>
          Contact
        </button>
      </nav>
      <button
        className="cartButton selectedBold"
        onClick={() => go("checkout")}
        aria-label={`Panier, ${cartCount} articles`}
      >
        Panier <span>{cartCount}</span>
      </button>
    </header>
  )
}
