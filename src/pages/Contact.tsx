// : page Contact extraite de App.tsx
// NOUVEAU : options de devis centralisées dans config.json
import config from "@/config/config.json"
import type { EventType } from "@/types"

const eventTypes = config.contact.eventTypes as readonly EventType[]
const services = config.contact.services

// MODIFIÉ : reçoit le type présélectionné depuis la navigation
export default function Contact({
  initialEventType,
}: {
  initialEventType?: EventType
}) {
  return (
    <main className="interior contactPage">
      <div className="editorialHead">
        <p className="eyebrow">Parlons de votre projet</p>
        <h1>
          <span className="block">Des fleurs pensées</span>
          <span className="block">pour votre moment.</span>
        </h1>
        <p>
          Mariage, réception ou installation : racontez-nous votre projet. Les
          informations ci-dessous sont provisoires et à confirmer.
        </p>
      </div>
      <div className="contactGrid">
        <aside>
          <h3>L’atelier</h3>
          <p>
            <span className="block">Téléphone : à compléter</span>
            <span className="block">E-mail : à compléter</span>
            <span className="block">Zone d’intervention : à compléter</span>
          </p>
          <h3>Horaires</h3>
          <p>À compléter</p>
          <h3>Réseaux sociaux</h3>
          <p>À compléter</p>
        </aside>
        <form className="quoteForm" onSubmit={(e) => e.preventDefault()}>
          <div className="step">
            <span>01</span>
            <h2>Coordonnées</h2>
          </div>
          <div className="fieldGrid">
            <label>
              Nom et prénom
              <input />
            </label>
            <label>
              Entreprise <small>facultatif</small>
              <input />
            </label>
            <label>
              E-mail
              <input type="email" />
            </label>
            <label>
              Téléphone
              <input />
            </label>
          </div>
          <div className="step">
            <span>02</span>
            <h2>Votre projet</h2>
          </div>
          <div className="fieldGrid">
            {/* MODIFIÉ : options centralisées et présélection transmise depuis la carte abonnement */}
            <label>
              Type d’événement
              <select
                name="eventType"
                defaultValue={initialEventType ?? ""}
                required
              >
                <option value="" disabled>
                  Choisir un type d’événement
                </option>
                {eventTypes.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input type="date" />
            </label>
            <label className="wide">
              Lieu
              <input />
            </label>
            <label>
              Nombre d’invités <small>facultatif</small>
              <input />
            </label>
            <label>
              Budget estimé <small>facultatif</small>
              <input />
            </label>
            {/* MODIFIÉ : options centralisées dans config.json */}
            <label className="wide">
              Prestations recherchées
              <select name="services">
                {services.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="wide">
              Décrivez votre projet
              <textarea rows={5} />
            </label>
            <label className="wide upload">
              Images d’inspiration <small>option de démonstration</small>
              <input type="file" multiple />
            </label>
          </div>
          <label className="consent">
            <input type="checkbox" /> J’accepte que mes données soient utilisées
            pour répondre à cette demande.
          </label>
          {/* MODIFIÉ : bouton explicite de soumission du formulaire */}
          <button type="submit" className="button dark">
            Envoyer ma demande de devis
          </button>
        </form>
      </div>
    </main>
  )
}
