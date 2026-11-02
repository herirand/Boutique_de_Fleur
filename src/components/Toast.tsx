// notification d'ajout au panier extraite de App.tsx
export default function Toast({
  message,
  onCheckout,
}: {
  message: string
  onCheckout: () => void
}) {
  return (
    <div className="toast">
      <span>Ajout confirmé</span>
      {message}
      <button onClick={onCheckout}>Voir le panier</button>
    </div>
  )
}
