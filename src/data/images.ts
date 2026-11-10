// résolution des photos locales de l'atelier
//  : accepte tous les fichiers de src/imports, sans limiter l'extension
const files = import.meta.glob("/src/imports/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

// NOUVEAU : compare les noms sans tenir compte de l'extension
const withoutExtension = (value: string) => value.replace(/\.[^./]+$/, "")

// NOUVEAU : en cas de doublon, privilégie les formats web récents
const extensionPriority = [
  ".avif",
  ".webp",
  ".jpeg",
  ".jpg",
  ".png",
  ".gif",
  ".bmp",
  ".tif",
  ".tiff",
  ".svg",
]

const extensionRank = (path: string) => {
  const index = path.lastIndexOf(".")
  const extension = index === -1 ? "" : path.slice(index).toLowerCase()
  const rank = extensionPriority.indexOf(extension)
  return rank === -1 ? extensionPriority.length : rank
}

// NOUVEAU : retrouve une photo par son nom, sans se soucier des accents ni de l'extension
export function photo(name: string): string {
  const target = normalize(withoutExtension(name))
  const matches = Object.entries(files)
    .filter(([path]) =>
      normalize(withoutExtension(path)).endsWith(`/imports/${target}`),
    )
    .sort(([a], [b]) => extensionRank(a) - extensionRank(b))

  if (matches.length === 0) {
    throw new Error(`Photo introuvable dans src/imports : ${name}`)
  }

  return matches[0][1]
}
