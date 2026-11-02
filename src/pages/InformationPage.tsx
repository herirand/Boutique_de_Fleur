// pages d'informations extraites de App.tsx
import type { Page } from "@/types"
// zones, frais et retrait depuis la configuration
import config from "@/config/config.json"
// formatage des prix en Ariary
import { formatPrice } from "@/data/format"

export default function InformationPage({
  type,
  go,
}: {
  type: "delivery" | "legal" | "privacy"
  go: (p: Page) => void
}) {
  const content = {
    delivery: {
      eyebrow: "Informations pratiques",
      title: "Livraison & retrait",
      intro:
        "Retrouvez les zones desservies, les frais de livraison et les modalités de retrait.",
      sections: [
        ...config.delivery.zones.map((zone) => [
          zone.name,
          [
            zone.quartiers.length > 0 ? zone.quartiers.join(", ") : null,
            zone.fee === null
              ? "Frais à confirmer."
              : zone.fee === 0
                ? "Livraison offerte."
                : `${formatPrice(zone.fee)}.`,
          ]
            .filter(Boolean)
            .join(" "),
        ]),
        [
          "Retrait",
          config.delivery.retraitGratuit
            ? "Retrait gratuit à l’atelier, créneaux et adresse à confirmer."
            : "Retrait à l’atelier, créneaux et adresse à confirmer.",
        ],
      ],
    },
    legal: {
      eyebrow: "Informations légales",
      title: "Mentions légales",
      intro:
        "Cette page est une maquette. Les informations juridiques définitives restent à compléter.",
      sections: [
        [
          "Éditeur du site",
          "Raison sociale, adresse, immatriculation et coordonnées : à compléter.",
        ],
        ["Hébergement", "Prestataire, adresse et coordonnées : à compléter."],
      ],
    },
    privacy: {
      eyebrow: "Vos données",
      title: "Politique de confidentialité",
      intro:
        "Cette politique provisoire sera validée avant la mise en ligne du site.",
      sections: [
        [
          "Données collectées",
          "Les données utiles à la commande ou à une demande de devis sont limitées aux informations saisies dans les formulaires.",
        ],
        [
          "Vos droits",
          "Les coordonnées du responsable de traitement et la procédure d’exercice des droits restent à compléter.",
        ],
      ],
    },
  }[type]

  return (
    <main className="interior">
      <div className="editorialHead">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </div>
      <section className="manifesto">
        <p className="eyebrow">Informations provisoires</p>
        <h2>{content.title}</h2>
        <div>
          {content.sections.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <button className="button dark" onClick={() => go("home")}>
          Retour à la boutique
        </button>
      </section>
    </main>
  )
}
