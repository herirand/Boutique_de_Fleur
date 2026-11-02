// page Confirmation extraite de App.tsx
import type { Page } from "@/types"

export default function Confirmation({ go }: { go: (p: Page) => void }) {
  return (
    <main className="confirmation">
      <div className="check">✓</div>
      <p className="eyebrow">Commande enregistrée · prototype</p>
      <h1>
        <span className="block">Merci, votre commande</span>
        <span className="block">est bien reçue.</span>
      </h1>
      <p>Une confirmation serait envoyée par e-mail après un paiement réel.</p>
      <div className="orderRef">
        <span>Référence fictive</span>
        <strong>MF—0248</strong>
        <span>Prochaine étape</span>
        <strong>Préparation par l’atelier</strong>
      </div>
      <button className="button dark" onClick={() => go("home")}>
        Retourner à la boutique
      </button>
    </main>
  )
}
