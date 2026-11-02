// pied de page extrait de App.tsx
import type { Page } from "@/types"

export default function Footer({ go }: { go: (p: Page) => void }) {
  const goToHomeSection = (id: string) => {
    go("home")
    window.setTimeout(
      () => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }),
      80,
    )
  }

  return (
    <footer>
      <div>
        <button className="wordmark light" onClick={() => go("home")}>
          <span>IFLEUR</span>
        </button>
        <p>
          <span className="block">Atelier floral contemporain</span>
          <span className="block">Coordonnées à compléter</span>
        </p>
      </div>
      <div>
        <b>Explorer</b>
        <button onClick={() => go("home")}>Boutique</button>
        <button onClick={() => go("about")}>À propos</button>
        <button onClick={() => go("gallery")}>Galerie</button>
        <button onClick={() => go("contact")}>Contact & devis</button>
      </div>
      <div>
        <b>Collections</b>
        <button onClick={() => goToHomeSection("#bouquets")}>Bouquets</button>
        <button onClick={() => goToHomeSection("#abonnements")}>
          Abonnements
        </button>
      </div>
      <div>
        <b>Informations</b>
        <button onClick={() => goToHomeSection("#faq")}>FAQ</button>
        <button onClick={() => go("delivery")}>Livraison & retrait</button>
        <button onClick={() => go("legal")}>Mentions légales</button>
        <button onClick={() => go("privacy")}>Confidentialité</button>
        <button onClick={() => go("login")}>Administration</button>
      </div>
      <small>
        <span>© Ifleur 2026</span>
      </small>
    </footer>
  )
}
