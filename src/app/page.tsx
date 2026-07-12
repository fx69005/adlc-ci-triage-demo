"use client";

import { useMemo, useState } from "react";

import {
  calculatePortfolio,
  formatCurrency,
  type AccountKind,
  type Holding,
} from "@/lib/portfolio";

const holdings: Holding[] = [
  { name: "ETF Monde", ticker: "WLD", account: "PEA", value: 8_420, change: 6.8 },
  { name: "ETF Europe", ticker: "EUE", account: "PEA", value: 3_180, change: 2.1 },
  { name: "Bitcoin", ticker: "BTC", account: "CRYPTO", value: 4_960, change: 12.4 },
  { name: "Ethereum", ticker: "ETH", account: "CRYPTO", value: 2_140, change: -1.7 },
];

const filters: Array<{ label: string; value: "ALL" | AccountKind }> = [
  { label: "Tout le portefeuille", value: "ALL" },
  { label: "PEA", value: "PEA" },
  { label: "Crypto", value: "CRYPTO" },
];

export default function Home() {
  const [filter, setFilter] = useState<"ALL" | AccountKind>("ALL");
  const visibleHoldings = useMemo(
    () => (filter === "ALL" ? holdings : holdings.filter((holding) => holding.account === filter)),
    [filter],
  );
  const portfolio = useMemo(() => calculatePortfolio(visibleHoldings), [visibleHoldings]);

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-950">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:px-10">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Portfolio Lab <span className="text-slate-400">/</span> V1 demo
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Ton allocation, lisible en un coup d&apos;œil.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Une micro-application Next.js pour suivre un portefeuille PEA et crypto. Les données sont locales et fictives : elles servent de terrain de CI pour la démonstration ADLC.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
            <p className="font-semibold">Terrain de démonstration</p>
            <p className="mt-1 text-emerald-800">CI déterministe + triage agentique contrôlé</p>
          </div>
        </header>

        <section aria-label="Résumé du portefeuille" className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Valeur affichée" value={formatCurrency(portfolio.total)} detail="Données de démo" />
          <MetricCard label="PEA" value={formatCurrency(portfolio.byAccount.PEA)} detail={`${portfolio.percentByAccount.PEA}% de l’allocation`} />
          <MetricCard label="Crypto" value={formatCurrency(portfolio.byAccount.CRYPTO)} detail={`${portfolio.percentByAccount.CRYPTO}% de l’allocation`} />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] md:p-8">
          <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Positions</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Répartition par enveloppe</h2>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filtrer les positions">
              {filters.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === option.value ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  aria-pressed={filter === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-[0.14em] text-slate-400">
                  <th className="pb-4 font-semibold">Actif</th>
                  <th className="pb-4 font-semibold">Enveloppe</th>
                  <th className="pb-4 text-right font-semibold">Valeur</th>
                  <th className="pb-4 text-right font-semibold">Variation</th>
                  <th className="pb-4 text-right font-semibold">Poids</th>
                </tr>
              </thead>
              <tbody>
                {visibleHoldings.map((holding) => (
                  <tr key={holding.ticker} className="border-b border-slate-100 last:border-0">
                    <td className="py-5">
                      <div className="font-semibold">{holding.name}</div>
                      <div className="mt-1 text-sm text-slate-400">{holding.ticker}</div>
                    </td>
                    <td className="py-5">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${holding.account === "PEA" ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"}`}>
                        {holding.account === "PEA" ? "PEA" : "CRYPTO"}
                      </span>
                    </td>
                    <td className="py-5 text-right font-medium">{formatCurrency(holding.value)}</td>
                    <td className={`py-5 text-right font-medium ${holding.change >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {holding.change >= 0 ? "+" : ""}{holding.change.toFixed(1)}%
                    </td>
                    <td className="py-5 text-right text-slate-500">{portfolio.percentByHolding[holding.ticker]}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>V1 locale · aucune donnée personnelle · aucun conseil financier</p>
          <p className="font-mono text-xs text-slate-400">ADLC / CI TRIAGE / HUMAN REVIEW</p>
        </footer>
      </main>
    </div>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{detail}</p>
    </article>
  );
}
