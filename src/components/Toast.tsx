// notification d'ajout au panier extraite de App.tsx
export default function Toast({
  message,
  onCheckout,
}: {
  message: string
  onCheckout: () => void
}) {
  // MODIFIÉ : annonce de la notification aux lecteurs d'écran
  return (
    <div className="toast" role="status" aria-live="polite">
      <span>Ajout confirmé</span>
      {message}
      <button onClick={onCheckout}>Voir le panier</button>
    </div>
  )
}
