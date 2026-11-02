// page À propos extraite de App.tsx
import type { Page } from "@/types"
import Arrow from "@/components/Arrow"
// MODIFIÉ : utilise la nouvelle photo optimisée via le résolveur d'images
import { photo } from "@/data/images"

const aboutImage = photo("Apropos.jpeg")

export default function About({ go }: { go: (p: Page) => void }) {
  return (
    <main className="interior aboutPage">
      <div className="aboutHero">
        <img src={aboutImage} alt="Fleuriste portant une composition" />
        <div>
          <p className="eyebrow light !text-[18px]">
            <span>Ifleur - Histoire</span>
          </p>
          <h1>
            <span>Un bonheur florissant</span>
          </h1>
        </div>
      </div>
      <section className="manifesto">
        <p className="eyebrow">Notre approche</p>
        <h2>
          Nous créons des compositions sensibles, guidées par la saison et
          l’allure singulière de chaque fleur.
        </h2>
        <div>
          <p>
            <span>
              Ifleur est un atelier floral contemporain. Chaque création se
              construit comme un paysage : avec du rythme, des respirations et
              une part d’imprévu.
            </span>
          </p>
          <p>
            Nous privilégions une sélection raisonnée, des contenants durables
            et des collaborations locales lorsque la saison le permet. Ce
            contenu est provisoire et sera affiné avec la marque.
          </p>
        </div>
      </section>
      <section className="values">
        <article>
          <span>01</span>
          <h3>Saisonnalité</h3>
          <p>
            Travailler avec les arrivages et célébrer ce qui est beau
            maintenant.
          </p>
        </article>
        <article>
          <span>02</span>
          <h3>Geste</h3>
          <p>
            Laisser chaque tige trouver sa place dans une composition libre.
          </p>
        </article>
        <article>
          <span>03</span>
          <h3>Attention</h3>
          <p>
            Créer avec soin, du premier échange jusqu’à la remise des fleurs.
          </p>
        </article>
      </section>
      <div className="aboutActions">
        <button className="button dark" onClick={() => go("home")}>
          Voir les créations
        </button>
        <button className="textLink" onClick={() => go("contact")}>
          Nous contacter <Arrow />
        </button>
      </div>
    </main>
  )
}
