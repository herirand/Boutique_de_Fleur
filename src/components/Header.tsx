// en-tête et navigation extraits de App.tsx
import { useState } from "react"
import type { Page } from "@/types"

export default function Header({
  go,
  goSection,
  cartCount,
  menu,
  onToggleMenu,
}: {
  go: (p: Page) => void
  //  : défilement vers une section de la page Produits (bouquets / tiges / plantes)
  goSection: (id: string) => void
  cartCount: number
  menu: boolean
  onToggleMenu: () => void
}) {
  //  : état d'ouverture du menu déroulant Produits (survol ou focus, fermé dès que la souris/le focus sort)
  const [prodOpen, setProdOpen] = useState(false)
  return (
    <header className="header">
      <button className="wordmark" onClick={() => go("home")}>
        <span>IFLEUR</span>
      </button>
      {/*  : pastille Menu animée — libellé basculant Menu/Fermer et état inversé quand le panneau est ouvert */}
      <button
        className={menu ? "menuButton open selectedBold" : "menuButton selectedBold"}
        onClick={onToggleMenu}
        aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menu}
      >
        {menu ? "Fermer" : "Menu"}
      </button>
      <nav className={menu ? "nav open" : "nav"}>
        <button className="selectedBold" onClick={() => go("home")}>
          Accueil
        </button>
        {/*  : le bouton Produits héberge désormais un menu déroulant avec les catégories (remplace la barre flottante de la page Produits) */}
        {/*  : ouverture pilotée par état (survol/focus) — le menu se referme dès que le curseur ou le focus quitte la zone, il ne reste plus bloqué ouvert */}
        <div
          className={prodOpen ? "navItem open" : "navItem"}
          onMouseEnter={() => setProdOpen(true)}
          onMouseLeave={() => setProdOpen(false)}
          onFocus={() => setProdOpen(true)}
          onBlur={() => setProdOpen(false)}
        >
          <button className="selectedBold" onClick={() => go("produits")}>
            Produits
          </button>
          {/*  : sous-menu roulant — chaque entrée déroule la page Produits jusqu'à la section correspondante */}
          <div className="prodDrop" aria-label="Catégories de produits">
            {/*  : clic sur une catégorie = fermeture du menu */}
            <button onClick={() => { setProdOpen(false); goSection("bouquets") }}>Bouquets</button>
            <button onClick={() => { setProdOpen(false); goSection("tiges") }}>Tiges</button>
            <button onClick={() => { setProdOpen(false); goSection("plantes") }}>Plantes</button>
          </div>
        </div>
        {/* MODIFIÉ : lien vers la page Nouveautés, placé avant À propos dans la navigation principale */}
        <button className="selectedBold" onClick={() => go("nouveautes")}>
          Nouveautés
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
