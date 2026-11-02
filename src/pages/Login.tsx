// page Login extraite de App.tsx
import type { Page } from "@/types"

export default function Login({ go }: { go: (p: Page) => void }) {
  return (
    <main className="login">
      <div className="loginVisual">
        <div>
          <p className="eyebrow light">Espace privé</p>
          <h1>
            <span className="block">Maison</span>
            <span className="block">Flora.</span>
          </h1>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          go("admin")
        }}
      >
        <button
          className="textLink back"
          type="button"
          onClick={() => go("home")}
        >
          ← Retour à la boutique
        </button>
        <p className="eyebrow">Administration</p>
        <h2>Bienvenue.</h2>
        <p>Connectez-vous pour gérer l’activité de l’atelier.</p>
        <label>
          Adresse e-mail
          <input type="email" placeholder="admin@maisonflora.fr" />
        </label>
        <label>
          Mot de passe
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="button dark full">Se connecter</button>
        <small>Écran de démonstration — aucun accès réel n’est créé.</small>
      </form>
    </main>
  )
}
