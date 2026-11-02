// page Galerie extraite de App.tsx
import type { Page } from "@/types"
import { galleryPhotos } from "@/data/catalog"

export default function Gallery({ go }: { go: (p: Page) => void }) {
  return (
    <main className="interior galleryPage">
      <div className="editorialHead">
        <p className="eyebrow">Galerie</p>
        <h1>
          <span className="block">Fleurs, espaces</span>
          <span className="block">et célébrations.</span>
        </h1>
        <p>
          Une sélection provisoire de créations de l’atelier, entre gestes
          spontanés et décors sur mesure.
        </p>
      </div>
      <div className="galleryGrid">
        {galleryPhotos.map((p, i) => (
          <figure key={p.src}>
            <img
              src={p.src}
              alt={`${p.caption}, composition florale ${i + 1}`}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      <section className="galleryCta">
        <h2>Imaginons votre décor floral.</h2>
        <button className="button pale" onClick={() => go("contact")}>
          Demander un devis
        </button>
      </section>
    </main>
  )
}
