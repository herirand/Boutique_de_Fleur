// page d'administration extraite de App.tsx
import { useState } from "react"
import type { Page } from "@/types"
import { bouquets } from "@/data/catalog"
// formatage des prix en Ariary
import { formatPrice } from "@/data/format"
import AdminTable from "@/components/AdminTable"

export default function Admin({ go }: { go: (p: Page) => void }) {
  const [tab, setTab] = useState("Tableau de bord")
  const adminProducts = bouquets
  return (
    <div className="admin">
      <aside>
        <button className="wordmark">MAISON FLORA</button>
        <small>Administration · Démo</small>
        {["Tableau de bord", "Produits", "Commandes", "Demandes de devis"].map(
          (t) => (
            <button
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
              key={t}
            >
              {t}
            </button>
          ),
        )}
        <button className="logout" onClick={() => go("home")}>
          Déconnexion
        </button>
      </aside>
      <main>
        <header>
          <div>
            <p className="eyebrow">Espace de gestion</p>
            <h1>{tab}</h1>
          </div>
          <div className="avatar">CM</div>
        </header>
        {tab === "Tableau de bord" && (
          <>
            <div className="stats">
              <article>
                <span>Produits</span>
                <strong>18</strong>
                <small>15 publiés</small>
              </article>
              <article>
                <span>Commandes</span>
                <strong>24</strong>
                <small>6 à préparer</small>
              </article>
              <article>
                <span>Ruptures</span>
                <strong>3</strong>
                <small>Action requise</small>
              </article>
              <article>
                <span>Devis</span>
                <strong>7</strong>
                <small>4 nouvelles demandes</small>
              </article>
            </div>
            <AdminTable
              title="Commandes récentes"
              rows={[
                ["MF-0248", "Camille Martin", "142 €", "En préparation"],
                ["MF-0247", "Léa Bernard", "85 €", "Confirmée"],
                ["MF-0246", "Hôtel Rivage", "260 €", "En attente"],
              ]}
            />
          </>
        )}
        {tab === "Produits" && (
          <>
            <div className="toolbar">
              <input placeholder="Rechercher un produit…" />
              <select>
                <option>Toutes les catégories</option>
              </select>
              <select>
                <option>Tous les statuts</option>
              </select>
              <button className="button dark">+ Nouveau produit</button>
            </div>
            <div className="adminList">
              {adminProducts.map((p) => (
                <article key={p.id}>
                  <img src={p.image} alt="" />
                  <div>
                    <strong>Bouquet {p.size}</strong>
                    <small>Bouquets</small>
                  </div>
                  <b>{formatPrice(p.price)}</b>
                  <span className="status">Publié</span>
                  <button>Modifier</button>
                  <button className="danger">Supprimer</button>
                </article>
              ))}
            </div>
          </>
        )}
        {tab === "Commandes" && (
          <AdminTable
            title="Toutes les commandes"
            rows={[
              ["MF-0248", "Camille Martin", "142 €", "En préparation"],
              ["MF-0247", "Léa Bernard", "85 €", "Confirmée"],
              ["MF-0246", "Hôtel Rivage", "260 €", "En attente"],
              ["MF-0245", "Sarah Noël", "72 €", "Terminée"],
            ]}
          />
        )}
        {tab === "Demandes de devis" && (
          <AdminTable
            title="Demandes récentes"
            rows={[
              [
                "DEV-018",
                "Mariage · 12 juin",
                "Château à confirmer",
                "Nouvelle",
              ],
              ["DEV-017", "Événement professionnel", "Paris", "En cours"],
              ["DEV-016", "Anniversaire", "Lieu à confirmer", "Traitée"],
            ]}
          />
        )}
      </main>
    </div>
  )
}
