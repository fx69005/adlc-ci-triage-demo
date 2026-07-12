import { describe, expect, it } from "vitest";

import { calculatePortfolio, formatCurrency, type Holding } from "./portfolio";

const holdings: Holding[] = [
  { name: "ETF Monde", ticker: "WLD", account: "PEA", value: 800, change: 2 },
  { name: "Bitcoin", ticker: "BTC", account: "CRYPTO", value: 200, change: -1 },
];

describe("calculatePortfolio", () => {
  it("calcule le total et la répartition par enveloppe", () => {
    const result = calculatePortfolio(holdings);

    expect(result.total).toBe(1_000);
    expect(result.byAccount).toEqual({ PEA: 800, CRYPTO: 200 });
    expect(result.percentByAccount).toEqual({ PEA: 80, CRYPTO: 20 });
  });

  it("retourne zéro quand le portefeuille est vide", () => {
    expect(calculatePortfolio([])).toEqual({
      total: 0,
      byAccount: { PEA: 0, CRYPTO: 0 },
      percentByAccount: { PEA: 0, CRYPTO: 0 },
      percentByHolding: {},
    });
  });
});

describe("formatCurrency", () => {
  it("formate une valeur en euros pour l'interface", () => {
    expect(formatCurrency(1_234)).toContain("1 234");
    expect(formatCurrency(1_234)).toContain("€");
  });
});
