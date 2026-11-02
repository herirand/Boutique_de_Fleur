// composant FAQ extrait de App.tsx
import { useState } from "react"
import config from "@/config/config.json"

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const qs = config.faq
  return (
    <section className="faq" id="faq">
      <div>
        <p className="eyebrow">Questions fréquentes</p>
        <h2>Tout savoir avant de commander.</h2>
      </div>
      <div>
        {qs.map((item, i) => (
          <article key={item.q}>
            <button onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{item.q}</span>
              <b>{open === i ? "−" : "+"}</b>
            </button>
            {open === i && <p>{item.a}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
