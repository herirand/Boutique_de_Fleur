// formatage des prix en Ariary depuis la configuration
export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(value)} Ar`
}
