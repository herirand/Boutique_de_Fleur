// tableau réutilisable de l'administration
export default function AdminTable({
  title,
  rows,
}: {
  title: string
  rows: string[][]
}) {
  return (
    <section className="adminTable">
      <div>
        <h2>{title}</h2>
        <button>Voir tout</button>
      </div>
      {rows.map((r, i) => (
        <article key={i}>
          {r.map((c, x) =>
            x === 3 ? (
              <span className="status" key={x}>
                {c}
              </span>
            ) : (
              <span key={x}>{c}</span>
            ),
          )}
          <button>Ouvrir</button>
        </article>
      ))}
    </section>
  )
}
