// : page Checkout extraite de App.tsx
import { useState } from "react"
import type { CartItem, Page } from "@/types"
// : zones et frais de livraison depuis la configuration
import config from "@/config/config.json"
// : formatage des prix en Ariary
import { formatPrice } from "@/data/format"

export default function Checkout({
  cart,
  setCart,
  go,
}: {
  cart: CartItem[]
  setCart: (items: CartItem[]) => void
  go: (p: Page) => void
}) {
  // : zone de livraison sélectionnée
  const [zoneIndex, setZoneIndex] = useState<number | null>(null)
  const zones = config.delivery.zones
  const selectedZone = zoneIndex === null ? null : zones[zoneIndex]
  const deliveryFee = selectedZone?.fee ?? 0
  const total = cart.reduce((s, p) => s + p.price, 0)
  const grandTotal = total + deliveryFee
  const deliveryLabel =
    zoneIndex === null
      ? "À sélectionner"
      : selectedZone?.fee === null
        ? "À confirmer"
        : formatPrice(selectedZone?.fee ?? 0)
  if (!cart.length)
    return (
      <main className="empty">
        <p className="eyebrow">Votre sélection</p>
        <h1>Votre panier est vide.</h1>
        <p>
          Découvrez les créations du moment et composez votre commande au fil de
          la page.
        </p>
        <button className="button dark" onClick={() => go("home")}>
          Découvrir les fleurs
        </button>
      </main>
    )
  return (
    <main className="checkout">
      <div className="pageTitle">
        <p className="eyebrow">Commande invitée · aucune création de compte</p>
        <h1>Finaliser votre commande</h1>
      </div>
      <div className="checkoutGrid">
        <section className="formPanel">
          <div className="step">
            <span>01</span>
            <h2>Vos coordonnées</h2>
          </div>
          <div className="fieldGrid">
            <label>
              Prénom
              <input placeholder="Camille" />
            </label>
            <label>
              Nom
              <input placeholder="Martin" />
            </label>
            <label className="wide">
              Adresse e-mail
              <input type="email" placeholder="camille@exemple.fr" />
            </label>
            <label className="wide">
              Téléphone
              <input placeholder="+33 6 00 00 00 00" />
            </label>
          </div>
          <div className="step">
            <span>02</span>
            <h2>Réception</h2>
          </div>
          <div className="delivery">
            <button className="active">
              <b>Livraison</b>
              <small>Tarif selon le quartier sélectionné</small>
            </button>
            <button>
              <b>Retrait atelier</b>
              <small>
                {config.delivery.retraitGratuit ? "Gratuit" : "Sur devis"} ·
                adresse et créneaux à confirmer
              </small>
            </button>
          </div>
          <div className="fieldGrid">
            <label className="wide">
              Quartier ou ville
              <select
                value={zoneIndex === null ? "" : String(zoneIndex)}
                onChange={(e) =>
                  setZoneIndex(
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
              >
                <option value="" disabled>
                  Sélectionner une zone de livraison
                </option>
                {zones.map((zone, index) =>
                  zone.quartiers.length > 0 ? (
                    <optgroup label={zone.name} key={zone.name}>
                      {zone.quartiers.map((quartier) => (
                        <option key={`${zone.name}-${quartier}`} value={index}>
                          {quartier}
                        </option>
                      ))}
                    </optgroup>
                  ) : (
                    <option key={zone.name} value={index}>
                      {zone.name}
                    </option>
                  ),
                )}
              </select>
            </label>
            <label className="wide">
              Adresse
              <input placeholder="Adresse de livraison" />
            </label>
            <label>
              Code postal
              <input placeholder="00000" />
            </label>
            <label>
              Ville
              <input placeholder="Ville" />
            </label>
            <label className="wide">
              Note facultative
              <textarea placeholder="Digicode, message ou précision…" />
            </label>
          </div>
          <div className="step">
            <span>03</span>
            <h2>Paiement</h2>
          </div>
          <div className="paymentNote">
            Zone de paiement sécurisée — prestataire à sélectionner. Aucun
            numéro de carte n’est collecté dans ce prototype.
          </div>
          <button
            className="button dark full"
            onClick={() => go("confirmation")}
          >
            Confirmer et payer {formatPrice(grandTotal)}
          </button>
        </section>
        <aside className="summary">
          <h2>Votre sélection</h2>
          {cart.map((p, i) => (
            <div className="cartLine" key={`${p.id}-${i}`}>
              <img src={p.image} alt="" />
              <div>
                <h3>{p.name}</h3>
                <small>{p.detail}</small>
                <div className="qty">
                  <button>−</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
              <strong>{formatPrice(p.price)}</strong>
              <button
                className="remove"
                onClick={() => setCart(cart.filter((_, x) => x !== i))}
              >
                Retirer
              </button>
            </div>
          ))}
          <div className="totals">
            <p>
              <span>Sous-total</span>
              <b>{formatPrice(total)}</b>
            </p>
            <p>
              <span>Livraison</span>
              <b>{deliveryLabel}</b>
            </p>
            <p className="grand">
              <span>Total</span>
              <b>{formatPrice(grandTotal)}</b>
            </p>
          </div>
          <button className="textLink" onClick={() => go("home")}>
            ← Continuer mes achats
          </button>
        </aside>
      </div>
    </main>
  )
}
