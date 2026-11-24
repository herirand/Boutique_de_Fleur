// NOUVEAU : page Nouveautés — même gabarit que la page Produits, avec les rendez-vous de l’atelier
import type { Page } from "@/types"
import { newsItems } from "@/data/catalog"
import { photo } from "@/data/images"
import Arrow from "@/components/Arrow"

export default function News({ go }: { go: (p: Page) => void }) {
  return (
    <main className="nouveautesPage">
      <section className="shopSection newsPageHero">
        <div className="sectionIntro newsPageIntro">
          <p className="eyebrow">À l’atelier</p>
          <h2>Nouveautés</h2>
          <p>
            Ateliers floraux, marché de Noël et rencontres ponctuelles : voici
            ce qui se prépare à l’atelier et comment y prendre part.
          </p>
        </div>
      </section>

      <section
        className="shopSection shopAnchor newsPageSection"
        id="rendez-vous"
      >
        <div className="sectionIntro newsPageSectionIntro">
          <p className="eyebrow">À venir</p>
          <h2>Les prochains rendez-vous</h2>
          <p>
            Chaque annonce précise comment réserver, se renseigner ou demander
            un devis. Les dates sont confirmées directement avec l’atelier.
          </p>
        </div>
        <div className="newsPageGrid">
          {newsItems.map((item) => (
            <article className="newsFeature" key={item.title}>
              <div className="newsFeaturePhoto">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="newsFeatureBody">
                <p className="newsMeta">
                  <span>{item.label}</span>
                  <span>{item.availability}</span>
                </p>
                <h3>{item.title}</h3>
                <p className="newsText">{item.text}</p>
                <button className="textLink" onClick={() => go("contact")}>
                  {item.cta} <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsPageCta">
        <div className="newsPageCtaCopy">
          <p className="eyebrow light">À organiser ensemble</p>
          <h2>Un atelier ou un marché à imaginer ?</h2>
          <p>
            Parlez-nous de votre projet : nous revenons vers vous avec les
            dates possibles et un devis.
          </p>
          <button className="button pale" onClick={() => go("contact")}>
            Écrire à l’atelier <Arrow />
          </button>
        </div>
        <div className="newsPageCtaPhoto">
          <img
            src={photo("option 2 pour accueil ou à propos.JPG")}
            alt="Étude florale dans l’atelier"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </main>
  )
}
