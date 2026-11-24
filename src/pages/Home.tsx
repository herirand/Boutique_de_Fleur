import { useEffect, useRef, useState } from "react"
import type { CartItem, Page, ProductDetailData } from "@/types"
import {
  activeSeason,
  bouquets,
  heroImage,
  homePreview,
  seasonLabels,
  seasonNotes,
  seasonalProducts,
} from "@/data/catalog"
import Arrow from "@/components/Arrow"
import FAQ from "@/components/FAQ"
import ProductCard from "@/components/ProductCard"
import SeasonStamp from "@/components/SeasonStamp"

// NOUVEAU : les cinq types de projet proposés dans le menu de la carte abonnement
const projectTypes = [
  "Mariage",
  "Anniversaire",
  "Réception",
  "Événement professionnel",
  "Autre",
] as const

// NOUVEAU : menu déroulant unique (clavier + fermeture au clic extérieur) à la place des deux boutons
function ProjectTypeSelect() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  return (
    <div className="projectSelect" ref={root}>
      {/* NOUVEAU : intitulé du champ, aligné sur les libellés existants de la carte */}
      <span className="projectSelectLabel">Type de projet</span>
      <button
        type="button"
        className={`projectSelectTrigger${open ? " open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={selected ? undefined : "projectSelectPlaceholder"}>
          {selected ?? "Choisir une option"}
        </span>
        <span className="projectSelectChevron" aria-hidden="true" />
      </button>
      {/* NOUVEAU : liste des options, l'option choisie reste visible à la réouverture */}
      {open && (
        <ul className="projectSelectMenu" role="listbox" aria-label="Type de projet">
          {projectTypes.map((type) => (
            <li key={type} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={selected === type}
                className={selected === type ? "selected" : undefined}
                onClick={() => {
                  setSelected(type)
                  setOpen(false)
                }}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Home({
  add,
  go,
  openDetail,
}: {
  add: (item: CartItem) => void
  go: (p: Page) => void
  //  : ouvre la page détail produit au clic sur une photo
  openDetail: (data: ProductDetailData) => void
}) {
  const logoRef = useRef<HTMLParagraphElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  //  : déplace le titre logo dans la barre de nav, à la place du logo actuel
  useEffect(() => {
    const logo = logoRef.current
    const wordmark = document.querySelector<HTMLElement>(".header .wordmark")
    if (!logo) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const header = document.querySelector(".header")
    const logoBaseSize = parseFloat(getComputedStyle(logo).fontSize) || 60
    const wordmarkSize = wordmark ? parseFloat(getComputedStyle(wordmark).fontSize) || 17 : 17

    //  : le logo de la navbar est masqué tant qu'on est sur l'écran logo
    if (wordmark) {
      wordmark.style.opacity = "0"
      wordmark.style.pointerEvents = "none"
    }

    let ticking = false
    const update = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        //  : progression plus lente (110vh au lieu de 60vh)
        const p = Math.min(Math.max(scrollY / (window.innerHeight * 1.1), 0), 1)
        // easing ease-in-out
        const ep = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
        //  : le grand logo s'estompe en s'approchant, le logo navbar apparaît à la fin du trajet
        const fadeStart = 0.55
        const arrived = ep > 0.9

        const startTop = window.innerHeight / 2
        const startLeft = window.innerWidth / 2

        let endTop = startTop
        let endLeft = startLeft
        if (wordmark) {
          const rect = wordmark.getBoundingClientRect()
          endTop = rect.top + rect.height / 2
          endLeft = rect.left + rect.width / 2
        } else if (header) {
          const rect = header.getBoundingClientRect()
          endTop = rect.top + rect.height / 2
          endLeft = rect.left + rect.width / 2
        } else {
          endTop = 116
          endLeft = window.innerWidth / 2
        }

        const top = startTop + (endTop - startTop) * ep
        const left = startLeft + (endLeft - startLeft) * ep
        //  : interpolation de la taille de police pour tomber exactement sur celle de la navbar
        const fontSize = logoBaseSize + (wordmarkSize - logoBaseSize) * ep

        logo.style.position = "fixed"
        logo.style.left = `${left}px`
        logo.style.top = `${top}px`
        logo.style.fontSize = `${fontSize}px`
        logo.style.transform = "translate(-50%, -50%)"
        logo.style.willChange = "transform"
        logo.style.pointerEvents = "none"
        logo.style.zIndex = ep > 0.4 ? "50" : "20"

        //  : fondu progressif du grand logo, sans jamais le poser dans la navbar
        const fade = Math.min(Math.max((ep - fadeStart) / (0.9 - fadeStart), 0), 1)
        logo.classList.toggle("logo-scrolled", ep > fadeStart)
        logo.style.opacity = String(1 - fade)
        logo.style.visibility = arrived ? "hidden" : "visible"
        if (wordmark) {
          wordmark.style.opacity = arrived ? "1" : "0"
          wordmark.style.pointerEvents = arrived ? "" : "none"
        }

        ticking = false
      })
    }

    if (reduced) {
      update()
      return
    }

    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      logo.classList.remove("logo-scrolled")
      logo.style.opacity = ""
      logo.style.visibility = ""
      if (wordmark) {
        wordmark.style.opacity = ""
        wordmark.style.pointerEvents = ""
      }
    }
  }, [])

  //  : apparition en fondu des titres d'accueil uniquement
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
    )
    const elements = rootRef.current?.querySelectorAll(".homeReveal")
    elements?.forEach((el) => {
      if (reduced) {
        el.classList.add("is-visible")
      } else {
        observer.observe(el)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="homePage" ref={rootRef}>
      {/*  : fond photo fixe partagé par l’écran logo et l’accueil */}
      <img
        src={heroImage}
        alt=""
        className="homeFixedBg"
        aria-hidden="true"
        decoding="async"
      />
      <div className="homeFixedShade" aria-hidden="true" />

      {/*  : section logo en tête de page d'accueil, rien d'autre ne change */}
      <section className="logoSection" aria-label="Logo Ifleur">
        <p ref={logoRef} className="logoSectionMark">
          IFLEUR
        </p>
      </section>

      <section className="hero" id="home">
        <div className="heroShade" />
        <div className="heroCopy">
          <p className="eyebrow light heroEyebrowEdited">
            Atelier floral · créations de saison
          </p>
          <h1 className="homeReveal">
            <span className="block">Des fleurs pour</span>
            <span className="block">les moments qui comptent.</span>
          </h1>
          <p className="heroDescriptionEdited">
            Des compositions singulières, sublimées par nosanthuriums.
          </p>
          <div className="actions">
            <a className="button pale" href="#boutique">
              Découvrir nos fleurs
            </a>
            <button className="button ghost" onClick={() => go("contact")}>
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      <main id="boutique">
        <section
          className="shopSection !bg-[#eee8dc] !px-[3.25vw] !pt-28 !pb-32"
          id="bouquets"
        >
          <div className="sectionIntro !mb-16">
            <p className="eyebrow">La boutique</p>
            <h2 className="homeReveal">Bouquets</h2>
            <p>
              Composés librement à partir des plus belles fleurs disponibles ce
              matin.
            </p>
          </div>
          {/*  : items-stretch pour que toutes les cartes bouquet aient la même hauteur (uniformité globale) */}
          <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-4">
            {bouquets.map((bouquet, index) => (
              <ProductCard
                item={bouquet}
                index={index}
                category="bouquet"
                add={add}
                onOpen={openDetail}
                key={bouquet.id}
              />
            ))}
          </div>
        </section>

        <section className="subscriptions" id="abonnements">
          <div className="sectionIntro inverse">
            <p className="eyebrow light">Fleurs récurrentes</p>
            <h2 className="homeReveal">Les abonnements</h2>
            <p>
              Un rendez-vous floral régulier, pensé pour votre intérieur ou
              votre lieu professionnel.
            </p>
          </div>
          <div className="subscriptionCards">
            <article>
              <span>Pour soi</span>
              <h3>La maison fleurie</h3>
              <p>
                Une composition de saison livrée ou retirée à l’atelier, chaque
                semaine ou chaque mois.
              </p>
              {/* MODIFIÉ : les deux boutons Mensuel / Hebdomadaire sont remplacés par un seul menu « Type de projet » */}
              <ProjectTypeSelect />
              <strong>Sur devis personnalisé</strong>
              <button className="button pale" onClick={() => go("contact")}>
                Demander un devis
              </button>
            </article>
            <article className="business">
              <span>Professionnels</span>
              <h3>Des fleurs pour vos espaces</h3>
              <p>
                Hôtels, bureaux et restaurants : une proposition sur mesure,
                ajustée à votre rythme et à votre identité.
              </p>
              <strong>Sur devis personnalisé</strong>
              <button className="button ghost" onClick={() => go("contact")}>
                Demander une offre <Arrow />
              </button>
            </article>
          </div>
        </section>

        {/* MODIFIÉ : bande Nouveautés — produits de saison, comme une section Produits, sans demande de contact */}
        <section className="news" id="nouveautes">
          <div className="sectionIntro newsIntro">
            {/* NOUVEAU : cachet de saison, signature propre aux Nouveautés */}
            <SeasonStamp season={activeSeason} />
            <p className="eyebrow">
              Nouveautés · {seasonLabels[activeSeason]}
            </p>
            <h2 className="homeReveal">Les fleurs de la saison</h2>
            <p>{seasonNotes[activeSeason]}</p>
            <button className="button dark" onClick={() => go("nouveautes")}>
              Voir toutes les nouveautés <Arrow />
            </button>
          </div>
          {/* MODIFIÉ : seulement deux cartes produit, traitées comme des planches encadrées */}
          <div className="newsProductGrid produitsPage">
            {seasonalProducts.slice(0, 2).map((entry, index) => (
              <ProductCard
                item={entry.item}
                index={index}
                category={entry.category}
                add={add}
                onOpen={openDetail}
                key={entry.item.id}
              />
            ))}
          </div>
        </section>

        <section className="preview">
          <div className="sectionIntro">
            <p className="eyebrow">Journal visuel</p>
            <h2 className="homeReveal">Quelques histoires en fleurs</h2>
          </div>
          <div className="masonry">
            {homePreview.map((p, i) => (
              <img
                key={p}
                src={p}
                alt={`Création florale, aperçu ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <button className="button dark" onClick={() => go("gallery")}>
            Voir toute la galerie
          </button>
        </section>
        <FAQ />
      </main>
    </div>
  )
}
